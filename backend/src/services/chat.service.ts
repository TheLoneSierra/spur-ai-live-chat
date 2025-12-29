import db from "../db/sqlite";
import { randomUUID } from "crypto";
import { generateReply } from "./llm.service";

type ChatInput = {
  message: string;
  sessionId?: string;
};

export async function processChatMessage({
  message,
  sessionId,
}: ChatInput) {
  let conversationId = sessionId;

  // 1. Create conversation if new
  if (!conversationId) {
    conversationId = randomUUID();
    db.prepare(
      "INSERT INTO conversations (id) VALUES (?)"
    ).run(conversationId);
  }

  // 2. Save user message
  db.prepare(
    "INSERT INTO messages (id, conversation_id, sender, text) VALUES (?, ?, ?, ?)"
  ).run(randomUUID(), conversationId, "user", message);

  // 3. Fetch conversation history
  const history = db
    .prepare(
      "SELECT sender, text FROM messages WHERE conversation_id = ? ORDER BY created_at ASC"
    )
    .all(conversationId) as { sender: "user" | "ai"; text: string }[];

  // 4. 🔥 CALL THE LLM HERE (this was missing)
  const aiReply = await generateReply(history, message);

  // 5. Save AI reply
  db.prepare(
    "INSERT INTO messages (id, conversation_id, sender, text) VALUES (?, ?, ?, ?)"
  ).run(randomUUID(), conversationId, "ai", aiReply);

  return {
    reply: aiReply,
    sessionId: conversationId,
  };
}
