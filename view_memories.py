from database import collection

print("==================================================")
print("🧠 Current AI Memories Stored in Database:")
print("==================================================")

# Fetch every document currently stored in ChromaDB
all_memories = collection.get()

# Check if the database is empty
if not all_memories['ids']:
    print("No memories found. Chat with the agent to teach it facts!")
else:
    # Print out each ID and the corresponding fact
    for doc_id, text in zip(all_memories['ids'], all_memories['documents']):
        print(f"ID: [{doc_id[:8]}...] | Fact: {text}")

print("==================================================")