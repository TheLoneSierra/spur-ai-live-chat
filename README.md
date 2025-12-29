# Spur – AI Live Chat Support Agent

A minimal yet production-oriented AI customer support chat application that simulates a live chat widget backed by a real LLM.  
This project is built to closely reflect how a founding engineer at Spur would implement a real, extensible AI support feature.

---

## ✨ Overview

The application allows users to open a web page with a live chat panel where an AI agent answers customer questions such as shipping, returns, and support hours.  
Conversations are persisted, associated with a session, and responses are generated using a real LLM.

The focus of this project is **correctness, clean architecture, robustness, and product sense**, rather than overengineering.

---

## 🧩 Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- Vite

### Backend
- Node.js + TypeScript
- Express
- SQLite (simple SQL database for this exercise)

### LLM
- **Groq** (via OpenAI-compatible API)
- Model: `openai/gpt-oss-120b`

---

## 🚀 How to Run Locally (Step by Step)

### 1️⃣ Clone the repository

```bash
git clone <your-repo-url>
cd <repo-name>

```
### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Configure Environment Variables

```bash
DATABASE_URL=file:./dev.db
OPENAI_API_KEY=your_groq_api_key_here
OPENAI_BASE_URL=https://api.groq.com/openai/v1
```

### 🗄️ Database Setup

```bash
This project uses SQLite to keep the exercise simple and fast to run locally.
```

### 4️⃣ Start the Backend Server

```bash
npm run dev
```

🎨 Frontend Setup
### 5️⃣ Install Frontend Dependencies

```bash
cd ../frontend
npm install
npm run dev
```


### 🧪 Using the Application

```bash
1. Open the frontend URL in your browser

2. Start chatting with the AI agent

3. Try questions like:
“What is your return policy?”
“Do you ship internationally?”
“What are your support hours?”

4. You should observe:
Real AI-generated replies
Exact Time reflecting in the chat
Typing indicator for better UX
```
### 🏗️ Architecture Overview
```bash
Backend Structure:

backend/
 ├─ src/
 │  ├─ routes/        # HTTP route handlers
 │  ├─ services/      # Business logic & LLM integration
 │  ├─ db/            # SQLite connection & queries
 │  ├─ app.ts         # Express app configuration
 │  └─ server.ts      # Server entry point

Frontend Structure:

frontend/
 ├─ src/
 │  ├─ components/    # Chat UI components
 │  ├─ hooks/         # Chat state & API logic
 │  ├─ types/         # Shared TypeScript types
 │  └─ App.tsx
```

### 🛡️ Robustness & Error Handling

```bash
1. Empty messages are ignored
2. Send button disabled while request is in flight
3. Network or LLM failures return friendly fallback messages
4. Backend never crashes on malformed input
5. No secrets are hard-coded or committed
```

### 🎯 Product & UX Considerations

```bash
1. Clear distinction between user and AI messages
2. Typing indicator to reduce perceived latency
3. Markdown rendering for readable AI replies
4. Responsive layout for mobile and desktop
```

### ⚖️ Trade-offs & If I Had More Time…

```bash
Trade-offs:
1. Session ID is stored in memory instead of persistent client storage
2. Non-streaming LLM responses to reduce complexity

With More Time:
1. Add streaming responses for long AI outputs
2. Add admin-configurable FAQ content
```

### ✅ Final Notes

```bash
This project prioritizes:
1. Correctness over flash
2. Clean architecture over overengineering
3. Realistic UX over demo-only features

It is intentionally scoped to reflect how a real AI support feature would be shipped in production.
```
