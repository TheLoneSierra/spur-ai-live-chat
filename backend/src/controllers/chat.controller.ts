import { Request, Response } from "express";
import { processChatMessage } from "../services/chat.service";

export async function handleChatMessage(req: Request, res: Response) {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await processChatMessage({
      message: message.trim(),
      sessionId,
    });

    res.json(result);
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
}
