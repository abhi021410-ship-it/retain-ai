<div align="center">

# 🧠 Retain.ai

### Your AI Memory Agent

**A full-stack, production-grade AI application featuring a persistent RAG pipeline that solves LLM statelessness using long-term vector embeddings.**

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-FF6B6B?style=flat-square&logo=databricks&logoColor=white)](https://www.trychroma.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Python](https://img.shields.io/badge/Python_3.10+-3776AB?style=flat-square&logo=python&logoColor=white)](https://www.python.org/)

![Status](https://img.shields.io/badge/status-production_ready-emerald?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)
![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)

[Overview](#-overview) · [Features](#-key-features) · [Architecture](#-architecture--tech-stack) · [Quick Start](#-quick-start-local-setup) · [API](#-api-reference) · [Roadmap](#-roadmap)

</div>

---

## 🌟 Overview

Large Language Models are inherently **stateless** — the moment a session ends, everything the model learned about you evaporates. Every new conversation starts from zero.

**retain.ai** bridges that gap by acting as an autonomous **memory layer** that sits between the user and the model. It:

1. **Extracts** high-value facts from ongoing conversations in real time.
2. **Embeds & indexes** them into a persistent vector store (**ChromaDB**).
3. **Retrieves** semantically relevant long-term memories on every future turn.
4. **Injects** that context into generations via **Google Gemini**.

The result: an assistant that *actually remembers you* — across restarts, across sessions, across time.

### The Problem → The Solution

| | Standard LLM Chat | **retain.ai** |
|---|---|---|
| **Memory scope** | Single session | Persistent, indefinite |
| **Storage** | In-context window only | ChromaDB vector store on disk |
| **Recall method** | Full transcript replay | Semantic (ANN) retrieval |
| **Scalability** | Degrades with context length | Constant-cost top-k retrieval |
| **Survives restart** | ❌ | ✅ |
| **Cost profile** | Grows linearly with history | Flat per-turn retrieval cost |

---

## 🚀 Key Features

<table>
<tr>
<td width="50%" valign="top">

### 🧬 Autonomous Memory Extraction
Dynamically parses user input, identifies durable facts worth remembering, and assigns each a unique cryptographic vector ID — no manual tagging required.

### 💾 Persistent RAG Pipeline
Powered by **FastAPI** + **ChromaDB** with on-disk persistence. Memories survive server restarts, redeployments, and session boundaries.

### 🎬 Cinematic Neural OS Interface
A dark-mode **Next.js (App Router)** + **Tailwind CSS** dashboard featuring live-syncing memory cards, timestamps, system telemetry, and custom animated neural core graphics.

</td>
<td width="50%" valign="top">

### 🔄 State Reconciliation
Handles memory updates, deduplication, and contextual lookups seamlessly — the memory bank stays coherent as facts evolve.

### ⚡ Real-Time Sync
Memory mutations propagate to the UI instantly, with live status indicators and per-fragment metadata.

### 🔍 Semantic Retrieval
Not keyword matching — true vector similarity search, so "I'm allergic to peanuts" surfaces when you ask about dinner plans.

</td>
</tr>
</table>

---

## 🛠️ Architecture & Tech Stack

```
┌──────────────────────────────────────────────────────────────┐
│                      CLIENT  (Browser)                       │
│                                                              │
│    Next.js · App Router · TypeScript · Tailwind CSS          │
│  ┌────────────┐  ┌─────────────┐  ┌──────────────────────┐   │
│  │ Neural Core│  │ Memory Bank │  │  Contextual Chat     │   │
│  └────────────┘  └─────────────┘  └──────────────────────┘   │
└───────────────────────────┬──────────────────────────────────┘
                            │  REST / JSON
┌───────────────────────────▼──────────────────────────────────┐
│                     FastAPI  (Uvicorn)                       │
│                                                              │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────┐   │
│  │ Memory       │  │ Retrieval /   │  │  Chat            │   │
│  │ Extractor    │  │ RAG Orchestr. │  │  Controller      │   │
│  └──────┬───────┘  └───────┬───────┘  └────────┬─────────┘   │
└─────────┼──────────────────┼───────────────────┼─────────────┘
          │                  │                   │
          ▼                  ▼                   ▼
   ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
   │  ChromaDB   │   │    Gemini    │   │  Embedding   │
   │ (persistent │   │   API        │   │   Model      │
   │  vectors)   │   │              │   │              │
   └─────────────┘   └──────────────┘   └──────────────┘
```

### Stack Breakdown

| Layer | Technology | Role |
|---|---|---|
| **Frontend** | Next.js (App Router), TypeScript, Tailwind CSS | Neural OS dashboard, live memory bank, chat UI |
| **Backend** | Python, FastAPI, Uvicorn | REST API, memory orchestration, RAG logic |
| **Vector DB** | ChromaDB | Persistent local vector storage & ANN search |
| **AI Engine** | Google Gemini API | Fact extraction, embedding, response generation |

---

## 🔬 How It Works

### The Memory Lifecycle

```
    ┌─────────────────────── INGEST ────────────────────────┐
    │                                                       │
 User message                                             │
    │                                                     │
    ├─► ①  EXTRACT   → LLM parses the turn for durable facts
    ├─► ②  EMBED     → facts converted to vector embeddings
    ├─► ③  UPSERT    → stored in ChromaDB under a unique ID
    └─► ④  RESPOND   → the current turn is answered
                                                          │
    └───────────────────────────────────────────────────────┘

    ┌─────────────────────── RECALL ────────────────────────┐
    │                                                       │
 Next user message                                         │
    │                                                     │
    ├─► ⑤  QUERY     → prompt embedded, ANN search on memory
    ├─► ⑥  INJECT    → top-k memories added to system context
    └─► ⑦  GENERATE  → Gemini answers with long-term recall
                                                          │
    └───────────────────────────────────────────────────────┘
```

> **Why this design?** Extraction happens at write-time (not read-time), so retrieval stays cheap and constant-cost no matter how large the memory bank grows.

---

## 🖼️ Interface Preview

### 1. Cinematic Dashboard & Neural Core
*The main workstation featuring the futuristic OS aesthetic, agent telemetry, and interactive neural core.*

![Dashboard Hero](https://github.com/user-attachments/assets/489bfa72-878a-4e00-a09e-4c01307a9bff)

### 2. Live Vector Memory Bank
*The persistent sidebar displaying extracted user fragments, custom cryptographic IDs, and real-time sync statuses.*

![Memory Bank](https://github.com/user-attachments/assets/59f18f57-4135-442b-8a64-b43dcf7765dd)

### 3. Interactive Contextual Chat
*Live interaction demonstrating real-time fact extraction and contextual RAG retrieval across conversation turns.*

![Chat Interface](https://github.com/user-attachments/assets/42dd99bb-51ba-4a76-9aa6-8ae1cdd6de23)

---

## ⚡ Quick Start (Local Setup)

### Prerequisites

| Requirement | Version | Notes |
|---|---|---|
| **Node.js** | `18.x` or higher | For the Next.js frontend |
| **Python** | `3.10` or higher | For the FastAPI backend |
| **Google Gemini API Key** | — | [Get one free →](https://aistudio.google.com/app/apikey) |

---

### 1. Clone the Repository

```bash
git clone https://github.com/abhi021410-ship-it/retain-ai.git
cd retain-ai
```

---

### 2. Backend Setup (FastAPI + ChromaDB)

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate        # macOS / Linux
# venv\Scripts\activate         # Windows

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file inside `backend/`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
CHROMA_PERSIST_DIR=./chroma_store
MEMORY_COLLECTION=retain_memory
```

Start the server:

```bash
uvicorn main:app --reload --port 8000
```

Backend is now live at **`http://localhost:8000`** — interactive docs at **`/docs`**.

---

### 3. Frontend Setup (Next.js)

Open a **new terminal**:

```bash
cd frontend
npm install
```

Create a `.env.local` file inside `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Run the dev server:

```bash
npm run dev
```

Frontend is now live at **`http://localhost:3000`** 🎉

---

### 4. One-Shot (Both Services)

From the repo root, if you have the optional root scripts configured:

```bash
npm run dev        # runs frontend + backend concurrently
```

---

## 🔐 Environment Variables

### Backend (`backend/.env`)

| Variable | Required | Default | Description |
|---|:---:|---|---|
| `GEMINI_API_KEY` | ✅ | — | Google Gemini API key for extraction & generation |
| `CHROMA_PERSIST_DIR` | ❌ | `./chroma_store` | On-disk path where vectors are persisted |
| `MEMORY_COLLECTION` | ❌ | `retain_memory` | ChromaDB collection name |
| `CORS_ORIGINS` | ❌ | `http://localhost:3000` | Allowed frontend origins |
| `TOP_K` | ❌ | `5` | Number of memories retrieved per turn |

### Frontend (`frontend/.env.local`)

| Variable | Required | Default | Description |
|---|:---:|---|---|
| `NEXT_PUBLIC_API_URL` | ✅ | — | Base URL of the FastAPI backend |

> ⚠️ **Never commit your `.env` files.** They're already covered by `.gitignore` — keep it that way.

---

## 📡 API Reference

Base URL: `http://localhost:8000`

| Method | Endpoint | Description |
|:---:|---|---|
| `POST` | `/api/chat` | Send a message; returns the reply + newly extracted memories |
| `GET` | `/api/memories` | List all stored memory fragments with metadata |
| `GET` | `/api/memories/{id}` | Fetch a single memory fragment by ID |
| `DELETE` | `/api/memories/{id}` | Permanently delete a memory fragment |
| `DELETE` | `/api/memories` | Flush the entire memory bank |
| `GET` | `/api/health` | Service health, Chroma connection, vector count |

<details>
<summary><b>Example — <code>POST /api/chat</code></b></summary>

**Request**
```json
{
  "session_id": "user-42",
  "message": "I'm allergic to peanuts and I live in Hyderabad."
}
```

**Response**
```json
{
  "reply": "Got it — I'll keep that in mind.",
  "extracted_memories": [
    { "id": "mem_a1f9c3", "text": "Allergic to peanuts", "created_at": "2026-09-11T11:29:22Z" },
    { "id": "mem_b7e210", "text": "Lives in Hyderabad",  "created_at": "2026-09-11T11:29:22Z" }
  ],
  "retrieved_memories": []
}
```

</details>

---

## 📁 Project Structure

```
retain-ai/
├── backend/
│   ├── main.py              # FastAPI app entrypoint & routes
│   ├── memory/
│   │   ├── extractor.py     # Fact extraction via Gemini
│   │   ├── store.py         # ChromaDB client & CRUD
│   │   └── retriever.py     # Semantic search / RAG orchestration
│   ├── models/              # Pydantic schemas
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── app/                 # Next.js App Router pages
│   ├── components/
│   │   ├── NeuralCore.tsx   # Animated core graphic
│   │   ├── MemoryBank.tsx   # Live memory sidebar
│   │   └── Chat.tsx         # Contextual chat interface
│   ├── lib/                 # API client & helpers
│   ├── package.json
│   └── .env.local.example
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🗺️ Roadmap

- [x] Persistent vector memory with ChromaDB
- [x] Autonomous fact extraction pipeline
- [x] Cinematic Neural OS dashboard
- [x] Real-time memory bank sync
- [ ] 🔜 Multi-user / multi-tenant memory namespaces
- [ ] 🔜 Memory decay & relevance scoring
- [ ] 🔜 Conflict resolution for contradictory facts
- [ ] 🔜 Docker Compose one-command deploy
- [ ] 🔜 Streaming responses (SSE)
- [ ] 🔜 Export / import memory bank as JSON

---

## 🤝 Contributing

Contributions are what make open source great — all are welcome.

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m "feat: add amazing feature"

# 4. Push and open a PR
git push origin feature/amazing-feature
```

Please follow [Conventional Commits](https://www.conventionalcommits.org/) and ensure the app runs locally before submitting a PR.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for details.

---

## 👨‍💻 Author

**M. Abhiram Reddy**

[![GitHub](https://img.shields.io/badge/GitHub-abhi021410--ship--it-181717?style=flat-square&logo=github)](https://github.com/abhi021410-ship-it)

---

<div align="center">

### ⭐ If retain.ai gave your AI a memory, give it a star.

*Built to prove that statelessness is a choice, not a constraint.*

</div>
