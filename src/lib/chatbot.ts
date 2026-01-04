import groq from "./groq";
import cache from "./cache";
import { RESUME_CONTEXT } from "./resumeContext";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: any;
};

export async function generate(userMessage : string, threadId : string)  {
  const baseMessages : ChatMessage[] = [
    {
      role: "system",
      content: `
${RESUME_CONTEXT}

How you should respond:
- Speak in first person ("I", "my")
- Sound confident, friendly, and human
- Keep answers natural and concise
- No robotic language
- No unnecessary dates unless asked

Current date: ${new Date().toUTCString()}
      `,
    },
  ];

  const messages = cache.get<ChatMessage[]>(threadId) ?? baseMessages;

  messages.push({
    role: "user",
    content: userMessage,
  });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    messages,
  });

  const reply = completion.choices[0].message.content;

  messages.push({
    role: "assistant",
    content: reply,
  });

  cache.set(threadId, messages);

  return reply;
}
