# 🧠 retain.ai

> **Your AI Memory Agent** — A full-stack, production-grade AI application featuring a persistent RAG pipeline that solves LLM statelessness using long-term vector embeddings.

![Tech Stack](https://img.shields.io/badge/stack-Next.js_%7C_FastAPI_%7C_ChromaDB_%7C_Gemini-blue?style=flat-square)
![Status](https://img.shields.io/badge/status-production_ready-emerald?style=flat-square)

---

## 🌟 Overview

Large Language Models are inherently stateless, forgetting context the moment a session ends. **retain.ai** bridges this gap by acting as an autonomous memory layer. It extracts key facts from ongoing conversations in real-time, embeds and indexes them using **ChromaDB**, and injects relevant long-term memory into future generations via **Google Gemini**.

---

## 🚀 Key Features

* **Autonomous Memory Extraction:** Dynamically parses user inputs, extracts high-value facts, and assigns unique vector IDs.
* **Persistent RAG Pipeline:** Built with **FastAPI** and **ChromaDB** to ensure memories persist safely across server restarts and sessions.
* **Cinematic Neural OS Interface:** A dark-mode **Next.js (App Router)** and **Tailwind CSS** dashboard featuring live-syncing memory cards, timestamps, system telemetry, and custom animated neural core graphics.
* **State Reconciliation:** Handles memory updates and contextual lookups seamlessly.

---

## 🛠️ Architecture & Tech Stack

* **Frontend:** Next.js, TypeScript, Tailwind CSS
* **Backend:** Python, FastAPI, Uvicorn
* **Vector Database:** ChromaDB (Persistent local vector storage)
* **AI Engine:** Google Gemini API

---

## 🖼️ Interface Preview

### 1. Cinematic Dashboard & Neural Core 
*The main workstation featuring the futuristic OS aesthetic, agent telemetry, and interactive neural core.*
> ![Dashboard Hero]<img width="1917" height="927" alt="Screenshot 2026-09-11 110113" src="https://github.com/user-attachments/assets/489bfa72-878a-4e00-a09e-4c01307a9bff" />


### 2. Live Vector Memory Bank 
*The persistent sidebar displaying extracted user fragments, custom cryptographic IDs, and real-time sync statuses.*
> ![Memory Bank]<img width="387" height="482" alt="Screenshot 2026-09-11 111819" src="https://github.com/user-attachments/assets/59f18f57-4135-442b-8a64-b43dcf7765dd" />

### 3. Interactive Contextual Chat 
*Live interaction demonstrating real-time fact extraction and contextual RAG retrieval across conversation turns.*
> ![Chat Interface]<img width="1843" height="927" alt="Screenshot 2026-09-11 112922" src="https://github.com/user-attachments/assets/42dd99bb-51ba-4a76-9aa6-8ae1cdd6de23" />


---

## ⚡ Quick Start (Local Setup)

### 1. Clone the Repository
```bash
git clone [https://github.com/abhi021410-ship-it/retain-ai.git](https://github.com/abhi021410-ship-it/retain-ai.git)
cd retain-ai

## 👨‍💻 Author

* **M. Abhiram Reddy**
