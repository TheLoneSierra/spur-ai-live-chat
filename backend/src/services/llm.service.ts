import OpenAI from "openai";

const SYSTEM_PROMPT = `
You are a helpful customer support agent for a small e-commerce store.
Answer clearly, politely, and concisely.

Store information:
- Shipping: We ship worldwide. Orders ship within 2–3 business days.
- Returns: 7-day return policy. Items must be unused and in original packaging.
- Support hours: Monday to Friday, 9 AM to 6 PM IST.
`;

type HistoryMessage = {
  sender: "user" | "ai";
  text: string;
};

// 🔥 Create client ONLY when needed (after env is loaded)
function getClient() {
  if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_BASE_URL) {
    return null;
  }

  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  });
}

export async function generateReply(
  history: HistoryMessage[],
  userMessage: string
): Promise<string> {
  const client = getClient();

  // Graceful fallback if env missing
  if (!client) {
    return "Thanks for your message! Our support team will get back to you shortly.";
  }

  try {
    const messages: OpenAI.ChatCompletionMessageParam[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history.map(
        (m) =>
          ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          }) as OpenAI.ChatCompletionMessageParam
      ),
      { role: "user", content: userMessage },
    ];

    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b", // Groq OSS model
      messages,
      temperature: 0.7,
      max_tokens: 512,
      top_p: 1,
    });

    return (
      response.choices[0]?.message?.content ??
      "Sorry, I couldn’t generate a response."
    );
  } catch (error) {
    console.error("LLM error:", error);
    return "Sorry, something went wrong. Please try again later.";
  }
}
