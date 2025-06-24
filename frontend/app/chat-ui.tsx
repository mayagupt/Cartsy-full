'use client';
import { useChat } from "ai/react";

export default function ChatUI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          <strong>{m.role}:</strong>{" "}
          {m.parts.map((p, i) =>
            "text" in p ? p.text : JSON.stringify(p)
          ).join("")}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

