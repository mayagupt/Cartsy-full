'use client';
import { useChat } from 'ai/react';

export default function Page() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  });

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="border p-2 h-64 overflow-auto">
        {messages.map(m => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="mt-2 flex">
        <input
          className="flex-grow border p-2"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
        />
        <button className="ml-2 p-2 bg-blue-600 text-white" type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
}

