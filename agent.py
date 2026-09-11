import os
import google.generativeai as genai
from dotenv import load_dotenv
from database import collection
from memory_manager import process_and_store_memory

# 1. Configure the API
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Initialize the chat model
model = genai.GenerativeModel('models/gemini-3.6-flash')
chat = model.start_chat(history=[])

print("==================================================")
print("🧠 Stateful AI Agent Online!")
print("Type 'quit' to exit.")
print("==================================================")

while True:
    user_input = input("\nYou: ")
    if user_input.lower() in ['quit', 'exit']:
        print("Shutting down agent...")
        break

    # 1. Background Memory Process: Update DB with any new facts from the user
    # (Doing this first means the AI instantly "learns" it for this current turn!)
    process_and_store_memory(user_input)

    # 2. Retrieve relevant context for the current query
    # We query the DB for memories related to what the user just typed
    search_results = collection.query(
        query_texts=[user_input],
        n_results=min(5, max(collection.count(), 1))
    )
    
    retrieved_facts = []
    if search_results and search_results['documents'] and search_results['documents'][0]:
        retrieved_facts = search_results['documents'][0]
    
    # Format the facts into a bulleted list
    facts_str = "\n".join([f"- {fact}" for fact in retrieved_facts])
    
    # 3. Augment the prompt (This is the Dynamic RAG step)
    if facts_str.strip():
        # Inject the long-term memory silently behind the scenes
        augmented_prompt = f"Relevant background information about the user:\n{facts_str}\n\nUser message: {user_input}"
    else:
        augmented_prompt = user_input
        
    # 4. Generate AI Response
    try:
        response = chat.send_message(augmented_prompt)
        print(f"\nAI: {response.text}")
    except Exception as e:
        print(f"\n[Error generating response]: {e}")