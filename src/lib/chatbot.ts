import groq from "./groq";
import { RESUME_CONTEXT } from "./resumeContext";

export type ClientHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export const MAX_HISTORY_MSG_LENGTH = 1999;

type GroqMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

/**
 * Creates a streaming chat completion with authoritative system instructions,
 * bounded client-supplied history, and user input validation.
 */
export async function streamChatCompletion(
  userMessage: string,
  history: ClientHistoryMessage[] = []
) {
  const baseSystemMessage: GroqMessage = {
    role: "system",
    content: `${RESUME_CONTEXT}\n\nCurrent UTC Date: ${new Date().toUTCString()}`,
  };

  // Enforce server-side boundary: strictly limit to last 6 messages
  // and permit ONLY "user" and "assistant" roles.
  const rawHistory = Array.isArray(history) ? history : [];
  const candidateHistory = rawHistory.slice(-6);

  const sanitizedHistory: GroqMessage[] = [];
  for (const msg of candidateHistory) {
    if (
      !msg ||
      typeof msg !== "object" ||
      typeof msg.content !== "string" ||
      !msg.content.trim()
    ) {
      continue;
    }

    const role = msg.role;
    if (role !== "user" && role !== "assistant") {
      continue;
    }

    // Strip out prompt-injection tokens and special system delimiters
    const cleanContent = msg.content
      .replace(/<\|.*?\|>/g, "")
      .replace(/\[system\]/gi, "")
      .trim()
      .slice(0, MAX_HISTORY_MSG_LENGTH);

    if (!cleanContent) continue;

    // Normalization: Discard leading orphan assistant messages
    if (sanitizedHistory.length === 0 && role === "assistant") {
      continue;
    }

    // Enforce alternation: collapse consecutive identical roles to prevent assistant-stacking attacks
    if (
      sanitizedHistory.length > 0 &&
      sanitizedHistory[sanitizedHistory.length - 1].role === role
    ) {
      sanitizedHistory[sanitizedHistory.length - 1].content = (
        sanitizedHistory[sanitizedHistory.length - 1].content + "\n" + cleanContent
      ).slice(0, MAX_HISTORY_MSG_LENGTH);
      continue;
    }

    sanitizedHistory.push({ role, content: cleanContent });
  }

  // Deduplication check: if the last history entry is an identical user query, do not repeat it
  const lastHistoryEntry = sanitizedHistory[sanitizedHistory.length - 1];
  const isDuplicate =
    lastHistoryEntry &&
    lastHistoryEntry.role === "user" &&
    lastHistoryEntry.content === userMessage.trim();

  const effectiveHistory = isDuplicate
    ? sanitizedHistory.slice(0, -1)
    : sanitizedHistory;

  const messages: GroqMessage[] = [
    baseSystemMessage,
    ...effectiveHistory,
    {
      role: "user",
      content: userMessage.trim().slice(0, 2000),
    },
  ];

  const stream = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL ?? "llama-3.1-8b-instant",
    temperature: 0.2,
    messages,
    stream: true,
  });

  return stream;
}

/**
 * Legacy non-streaming fallback helper (kept for backwards compatibility).
 */
export async function generate(
  userMessage: string,
  threadId: string,
  history: ClientHistoryMessage[] = []
): Promise<string> {
  const stream = await streamChatCompletion(userMessage, history);
  let accumulated = "";
  for await (const chunk of stream) {
    accumulated += chunk.choices[0]?.delta?.content || "";
  }
  return accumulated;
}

