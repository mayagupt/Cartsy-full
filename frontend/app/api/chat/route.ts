import { streamText } from 'ai';
import { huggingface } from '@ai-sdk/huggingface';

export async function POST(req: Request) {
  const { messages } = await req.json();  // messages: AI SDK UIMessage[]
  const result = await streamText({
    model: huggingface('http://localhost:8000/chat'),  // your FastAPI endpoint
    messages,
  });
  return result.toDataStreamResponse();
}

