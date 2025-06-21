'use client';

import React, { useState } from "react";

export default function CartsyPrototype() {
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hi 👋 What would you like to add to your list today?" },
  ]);
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const updatedList = [...list, input];
    const assistantMsg = {
      sender: "assistant",
      text: `Got it! I added "${input}" to your list. Would you like suggestions or best prices?`,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setList(updatedList);
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">🛒 Cartsy – MVP Chat</h1>

      <div className="h-[400px] overflow-y-auto p-4 bg-white border rounded space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-lg w-fit max-w-[80%] ${
              msg.sender === "assistant"
                ? "bg-gray-100 text-left"
                : "bg-blue-100 ml-auto text-right"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          className="border p-2 flex-1 rounded"
          placeholder="Type your item or ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-black text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mt-4">📝 Your List</h2>
        <ul className="list-disc pl-5">
          {list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
