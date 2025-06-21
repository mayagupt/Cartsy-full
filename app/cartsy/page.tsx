'use client';
import { useState } from 'react';

const MOCK_IMAGES = {
  "eggs": "/images/eggs.jpg",
  "banana": "/images/banana.jpg",
  "milk": "/images/milk.jpg"
};

export default function CartsyPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'assistant', text: 'Hi 👋 What would you like to add to your list today?' }
  ]);
  const [list, setList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = input.trim().toLowerCase();
    let response = "";
    const updatedMessages = [...messages, { sender: "user", text: input }];

    if (trimmed.includes("suggest")) {
      response = "🥚 Organic Eggs\n🍌 Chiquita Bananas\n🥛 2% Milk from Horizon";
    } else if (trimmed.includes("price") || trimmed.includes("cheapest")) {
      response = "🛍️ Best prices:\nEggs - $2.49 at Walmart\nMilk - $3.29 at Target\nBananas - $0.59/lb at Safeway";
    } else {
      const items = trimmed.split(",").map(s => s.trim()).filter(Boolean);
      setList([...list, ...items]);
      response = `Got it! I added "${items.join(', ')}" to your list. Would you like suggestions or best prices?`;
    }

    setMessages([...updatedMessages, { sender: "assistant", text: response }]);
    setInput("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">🛒 Cartsy – MVP Chat</h1>

      <div className="h-[400px] overflow-y-auto p-4 bg-white border rounded space-y-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === 'assistant' ? 'text-gray-700' : 'text-blue-600'}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          className="flex-1 border p-2 rounded"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your item or ask a question..."
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
      </form>

      <div>
        <h2 className="font-semibold mt-6">📝 Your List</h2>
        <ul className="list-disc pl-5 space-y-1">
          {list.map((item, idx) => (
            <li key={idx}>
              {item}
              {MOCK_IMAGES[item] && <img src={MOCK_IMAGES[item]} alt={item} className="w-16 inline ml-2" />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
