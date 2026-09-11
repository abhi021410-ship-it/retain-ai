import os
import json
import uuid
import google.generativeai as genai
from dotenv import load_dotenv
from database import collection

# 1. Configure Gemini
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('models/gemini-3.6-flash')


def extract_facts(user_input: str) -> list:
    """Extracts atomic user facts from conversational input."""
    prompt = f"""
    You are a strict memory extraction engine.
    Extract any concrete facts, preferences, or personal details about the user from their message.
    Return the result strictly as a valid JSON list of strings.
    If no personal facts exist, return [].

    User message: "{user_input}"
    """
    response = model.generate_content(prompt)
    try:
        cleaned_text = response.text.strip().strip('```json').strip('```').strip()
        return json.loads(cleaned_text)
    except Exception:
        return []


def decide_memory_action(new_fact: str, existing_memories: list) -> dict:
    """
    Compares a new fact against existing related memories and decides the CRUD operation:
    - ADD: Completely new information.
    - UPDATE: Overwrites an older/outdated fact.
    - DELETE: User explicitly negated or revoked a prior fact.
    - NONE: Duplicate or redundant information.
    """
    if not existing_memories:
        return {"action": "ADD", "fact": new_fact, "target_id": None}

    memories_context = "\n".join([f"ID: {m['id']} | Fact: {m['fact']}" for m in existing_memories])

    prompt = f"""
    You are a database memory reconciliation engine.
    
    Existing Memories:
    {memories_context}

    New Fact to Evaluate:
    "{new_fact}"

    Decide what operation to perform. Return strictly a JSON object with this structure:
    {{
        "action": "ADD" | "UPDATE" | "DELETE" | "NONE",
        "fact": "<fact text to store if ADD or UPDATE, else empty string>",
        "target_id": "<ID of existing memory to update/delete, or null if ADD/NONE>"
    }}
    """
    response = model.generate_content(prompt)
    try:
        cleaned_text = response.text.strip().strip('```json').strip('```').strip()
        return json.loads(cleaned_text)
    except Exception:
        return {"action": "ADD", "fact": new_fact, "target_id": None}


def process_and_store_memory(user_input: str):
    """Full pipeline: extracts facts, checks ChromaDB, and applies CRUD operations."""
    new_facts = extract_facts(user_input)
    if not new_facts:
        return

    for fact in new_facts:
        # 1. Query ChromaDB for top 3 semantically close memories
        search_results = collection.query(
            query_texts=[fact],
            n_results=min(3, max(collection.count(), 1))
        )

        existing_memories = []
        if search_results and search_results['ids'] and search_results['ids'][0]:
            for mem_id, doc in zip(search_results['ids'][0], search_results['documents'][0]):
                existing_memories.append({"id": mem_id, "fact": doc})

        # 2. Decide action
        decision = decide_memory_action(fact, existing_memories)
        action = decision.get("action")
        target_id = decision.get("target_id")
        final_fact = decision.get("fact", fact)

        # 3. Execute action on ChromaDB
        if action == "ADD":
            new_id = str(uuid.uuid4())
            collection.add(
                documents=[final_fact],
                ids=[new_id]
            )
            print(f"[MEMORY ADDED] -> {final_fact}")

        elif action == "UPDATE" and target_id:
            collection.update(
                ids=[target_id],
                documents=[final_fact]
            )
            print(f"[MEMORY UPDATED] ID {target_id} -> {final_fact}")

        elif action == "DELETE" and target_id:
            collection.delete(ids=[target_id])
            print(f"[MEMORY DELETED] ID {target_id}")

        elif action == "NONE":
            print(f"[MEMORY REDUNDANT] Skipped: {fact}")


# Test adding and updating memories
if __name__ == "__main__":
    print("--- Test 1: Adding initial facts ---")
    process_and_store_memory("I'm an AI student and I love riding motorcycles.")

    print("\n--- Test 2: Adding contradicting/updated fact ---")
    process_and_store_memory("Actually, I sold my motorcycle, I only drive BMWs now.")

    print("\n--- Current Stored Memories in DB ---")
    all_memories = collection.get()
    for doc_id, text in zip(all_memories['ids'], all_memories['documents']):
        print(f"[{doc_id[:8]}...] {text}")