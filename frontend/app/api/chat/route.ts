import { HfInference } from '@huggingface/inference';
import { HuggingFaceStream, StreamingTextResponse } from 'ai';

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const stream = await hf.textGenerationStream({
    model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
    inputs: prompt,
    parameters: { max_new_tokens: 150 }
  });
  const aiStream = HuggingFaceStream(stream);
  return new StreamingTextResponse(aiStream);
}

