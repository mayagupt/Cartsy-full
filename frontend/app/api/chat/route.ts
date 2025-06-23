// app/api/chat/route.ts (Next.js Edge Runtime)
import { HfInference } from '@huggingface/inference';
import { streamText } from 'ai'; // updated import

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

  const hfgStream = await hf.textGenerationStream({
    model: 'openassistant/oasst-sft-4-pythia-12b-epoch-3.5',
    inputs: prompt,
    parameters: { max_new_tokens: 200 },
  });

  const textStream = streamText(hfgStream); // wrap the stream

  return textStream.toDataStreamResponse(); // streaming-ready response
}

