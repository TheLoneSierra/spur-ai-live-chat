import { useChat } from "../hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { ChatInput } from "./ChatInput";

export function ChatWindow() {
  const {
    messages,
    input,
    setInput,
    sendMessage,
    loading,
    bottomRef,
  } = useChat();

  return (
<div className="h-screen max-w-5xl xl:max-w-6xl mx-auto bg-white shadow flex flex-col sm:rounded-xl">
      <header className="p-4 border-b flex items-center gap-3 bg-white">
  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
    S
  </div>

  <div className="flex flex-col">
    <span className="font-semibold leading-tight">Spur AI Support</span>
    <span className="text-xs text-green-600 flex items-center gap-1">
      <span className="h-2 w-2 bg-green-500 rounded-full" />
      Online
    </span>
  </div>
</header>


<div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50">
        {messages.map((m, i) => (
          <MessageBubble key={i} {...m} />
        ))}
        {loading && (
  <div className="text-sm text-gray-500 italic typing">
    Agent is typing
  </div>
)}

        <div ref={bottomRef} />
      </div>

      <ChatInput
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
}
