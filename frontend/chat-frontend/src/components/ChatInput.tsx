type Props = {
  input: string;
  setInput: (v: string) => void;
  sendMessage: () => void;
  loading: boolean;
};

export function ChatInput({ input, setInput, sendMessage, loading }: Props) {
  return (
    <div className="border-t bg-white p-3 flex gap-2">
      <input
        className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
      <button
        onClick={sendMessage}
        disabled={loading}
        className="bg-blue-600 text-white px-4 rounded-lg text-sm disabled:opacity-50"
      >
        Send
      </button>
    </div>
  );
}
