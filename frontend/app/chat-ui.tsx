'use client';
import { useChat } from 'ai/react';

export default function ChatUI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  });

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}><strong>{m.role}:</strong> {m.content}</div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} placeholder="Say hi…" />
      </form>
    </div>
  );
}

