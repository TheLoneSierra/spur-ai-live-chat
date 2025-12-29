import type { Message } from "../types/chat";
import ReactMarkdown from "react-markdown";

export function MessageBubble({ sender, text, timestamp }: Message) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] sm:max-w-[70%]
 px-4 py-2 rounded-xl text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
        }`}
      >
        {isUser ? (
          <span>{text}</span>
        ) : (
          <ReactMarkdown
            components={{
              ul: ({ children }) => (
                <ul className="list-disc pl-5 space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal pl-5 space-y-1">{children}</ol>
              ),
              p: ({ children }) => (
                <p className="mb-2 last:mb-0">{children}</p>
              ),
            }}
          >
            {text}
          </ReactMarkdown>
        )}

        <div className="text-[10px] mt-1 opacity-60 text-right">
          {new Date(timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}
