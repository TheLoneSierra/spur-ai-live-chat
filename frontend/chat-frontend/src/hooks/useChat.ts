import { useEffect, useRef, useState } from "react";
import type { Message } from "../types/chat";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";
  console.log("BACKEND_URL (frontend):", BACKEND_URL);

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hi 👋 How can I help you today?",
      timestamp: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      sender: "user",
      text: input,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BACKEND_URL}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          sessionId,
        }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        sender: "ai",
        text: data.reply,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMsg]);
      setSessionId(data.sessionId);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Something went wrong. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    input,
    setInput,
    sendMessage,
    loading,
    bottomRef,
  };
}
