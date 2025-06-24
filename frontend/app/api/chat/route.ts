import { HfInference } from "@huggingface/inference";

export const runtime = "edge";

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  const { messages } = body;

  const prompt = messages.map((m: any) => `${m.role}: ${m.content}`).join("\n");

  const response = await hf.textGenerationStream({
    model: "mistral-7b-instruct",
    inputs: prompt,
    parameters: { return_full_text: false },
    stream: true,
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for await (const chunk of response) {
        controller.enqueue(encoder.encode(chunk.token.text));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
