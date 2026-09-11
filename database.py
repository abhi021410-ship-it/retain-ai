import chromadb

# Initialize a persistent Chroma client. 
# This creates a folder named 'memory_db' in your directory to save data permanently.
client = chromadb.PersistentClient(path="./memory_db")

# Create a collection (think of this as a table) to store user facts
collection = client.get_or_create_collection(name="user_memories")

if __name__ == "__main__":
    print("Database initialized successfully!")
    print(f"Current facts stored: {collection.count()}")