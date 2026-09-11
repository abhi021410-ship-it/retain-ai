import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load API key
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print("Available Models:")
# Loop through and print all models that support text generation
for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
        print(m.name)