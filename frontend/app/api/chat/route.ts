import { HfInference } from "@huggingface/inference";

export const runtime = "edge";

export async function POST(req: Request) {
  const { message } = await req.json();
  const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

  const stream = hf.textGenerationStream({
    model: "mistralai/Mistral-7B-Instruct-v0.2",
    inputs: message,
    parameters: { max_new_tokens: 300, temperature: 0.7 }
  });

  // Return a streaming response
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
}

