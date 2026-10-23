import { NextResponse } from "next/server";
import { streamChatCompletion, type ClientHistoryMessage } from "@/lib/chatbot";

// Sliding-window rate limit configuration: 20 requests per 10 minutes
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 20;
const MAX_HISTORY_MSG_LENGTH = 1999;
const ipRequestMap = new Map<string, number[]>();

function getClientIp(req: Request): string {
  // Use trusted platform headers (Vercel / standard proxies)
  const vercelForwarded = req.headers.get("x-vercel-forwarded-for");
  if (vercelForwarded) return vercelForwarded.split(",")[0].trim();

  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "127.0.0.1";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const timestamps = (ipRequestMap.get(ip) ?? []).filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = timestamps[0];
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000)
    );
    return { allowed: false, retryAfterSeconds };
  }

  timestamps.push(now);
  ipRequestMap.set(ip, timestamps);

  // Periodic memory cleanup if map grows
  if (ipRequestMap.size > 500) {
    ipRequestMap.forEach((times, trackedIp) => {
      const active = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) ipRequestMap.delete(trackedIp);
      else ipRequestMap.set(trackedIp, active);
    });
  }

  return { allowed: true, retryAfterSeconds: 0 };
}

export async function POST(req: Request) {
  try {
    // Basic payload size guard (max ~32KB)
    const rawBody = await req.text();
    if (rawBody.length > 32768) {
      return NextResponse.json(
        { message: "Payload exceeds size limit." },
        { status: 413 }
      );
    }

    let parsed: Record<string, unknown>;
    try {
      parsed = JSON.parse(rawBody);
    } catch {
      return NextResponse.json(
        { message: "Malformed JSON payload." },
        { status: 400 }
      );
    }

    const { message, threadId, history } = parsed;

    // Validate message
    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 2000
    ) {
      return NextResponse.json(
        { message: "Please provide a valid message (1-2000 characters)." },
        { status: 400 }
      );
    }

    // Validate threadId
    if (
      typeof threadId !== "string" ||
      !/^[a-z0-9_-]{8,80}$/i.test(threadId)
    ) {
      return NextResponse.json(
        { message: "Invalid or missing thread identifier." },
        { status: 400 }
      );
    }

    // Validate history if present
    const validatedHistory: ClientHistoryMessage[] = [];
    if (history !== undefined) {
      if (!Array.isArray(history)) {
        return NextResponse.json(
          { message: "History must be an array of messages." },
          { status: 400 }
        );
      }

      if (history.length > 10) {
        return NextResponse.json(
          { message: "History length exceeds maximum permitted threshold." },
          { status: 400 }
        );
      }

      for (const item of history) {
        if (!item || typeof item !== "object") {
          return NextResponse.json(
            { message: "Invalid history item format." },
            { status: 400 }
          );
        }

        const role = (item as { role?: unknown }).role;
        const content = (item as { content?: unknown }).content;

        // Strictly reject any attempt to supply privileged system roles
        if (role !== "user" && role !== "assistant") {
          return NextResponse.json(
            { message: "History messages must have role 'user' or 'assistant'." },
            { status: 400 }
          );
        }

        if (typeof content !== "string" || content.length > MAX_HISTORY_MSG_LENGTH) {
          return NextResponse.json(
            { message: "History message content must be a string under 2000 characters." },
            { status: 400 }
          );
        }

        if (content.trim()) {
          validatedHistory.push({ role, content: content.trim() });
        }
      }
    }

    // Keep the latest six valid entries in chronological order
    const normalizedHistory = validatedHistory.slice(-6);

    // Development diagnostic metadata logging (safe: no keys, no private message content)
    if (process.env.NODE_ENV === "development") {
      console.log("[Chat API Diagnostic]", {
        historyEntryCount: Array.isArray(history) ? history.length : 0,
        validatedCount: validatedHistory.length,
        normalizedCount: normalizedHistory.length,
        entries: normalizedHistory.map((h) => ({
          role: h.role,
          contentLength: h.content.length,
        })),
        isNormalized:
          normalizedHistory.length <= 6 &&
          normalizedHistory.every((h) => h.content.length <= MAX_HISTORY_MSG_LENGTH),
      });
    }

    // Rate Limiting Check
    const clientIp = getClientIp(req);
    const { allowed, retryAfterSeconds } = checkRateLimit(clientIp);
    if (!allowed) {
      return NextResponse.json(
        {
          message:
            "You have sent too many messages recently. Please wait a moment before trying again.",
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfterSeconds.toString(),
          },
        }
      );
    }

    // Call Groq streaming completion
    const stream = await streamChatCompletion(message.trim(), normalizedHistory);

    // Support non-streaming requests when explicitly requested via Accept header
    const acceptHeader = req.headers.get("accept") || "";
    if (acceptHeader.includes("application/json")) {
      let accumulated = "";
      for await (const chunk of stream) {
        accumulated += chunk.choices[0]?.delta?.content || "";
      }
      return NextResponse.json({ message: accumulated });
    }

    // Stream tokens as raw text/plain stream
    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const token = chunk.choices[0]?.delta?.content;
            if (token) {
              controller.enqueue(encoder.encode(token));
            }
          }
          controller.close();
        } catch (streamError) {
          controller.error(streamError);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    // Avoid logging sensitive client messages or keys
    console.error("Chat API Request Error");
    return NextResponse.json(
      { message: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({
    status: "healthy",
    representative: "Shiv Mangal Singh Rajawat (Shiv)",
    version: "1.0.0",
  });
}

