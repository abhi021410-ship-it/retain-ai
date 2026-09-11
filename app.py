import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

from database import collection
from memory_manager import process_and_store_memory

# 1. Initialize Gemini
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('models/gemini-3.6-flash')
chat = model.start_chat(history=[])

# 2. Setup FastAPI Application
app = FastAPI(title="Stateful Memory Agent API")

# Enable CORS for Next.js (running on localhost:3000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    user_input = request.message
    
    # 1. Update memory in the background
    process_and_store_memory(user_input)
    
    # 2. Query relevant memories
    search_results = collection.query(
        query_texts=[user_input],
        n_results=min(5, max(collection.count(), 1))
    )
    
    retrieved_facts = []
    if search_results and search_results['documents'] and search_results['documents'][0]:
        retrieved_facts = search_results['documents'][0]
        
    facts_str = "\n".join([f"- {fact}" for fact in retrieved_facts])
    
    # 3. Dynamic RAG Prompt Augmentation
    if facts_str.strip():
        augmented_prompt = f"Relevant background information about the user:\n{facts_str}\n\nUser message: {user_input}"
    else:
        augmented_prompt = user_input
        
    # 4. Generate Response
    response = chat.send_message(augmented_prompt)
    return {
        "response": response.text,
        "memories_used": retrieved_facts
    }

@app.get("/memories")
async def get_memories():
    """Returns all current memories stored in ChromaDB."""
    all_memories = collection.get()
    memories_list = []
    if all_memories and all_memories['ids']:
        for doc_id, text in zip(all_memories['ids'], all_memories['documents']):
            memories_list.append({"id": doc_id, "fact": text})
    return {"memories": memories_list}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)