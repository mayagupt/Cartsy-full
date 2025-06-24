// app/api/chat/route.ts (Edge API Route)

import { HfInference } from '@huggingface/inference';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

export async function POST(req: Request) {
  const body = await req.json();
  const prompt = body.messages?.[body.messages.length - 1]?.content || 'Hello!';

  const response = await hf.textGeneration({
    model: 'mistralai/Mistral-7B-Instruct-v0.2',
    inputs: prompt,
    parameters: {
      max_new_tokens: 200,
      temperature: 0.7,
      return_full_text: false,
    },
  });

  return NextResponse.json({ text: response.generated_text });
}

