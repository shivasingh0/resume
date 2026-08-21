import { NextResponse } from "next/server";
import { generate } from "@/lib/chatbot";

export async function POST(req : Request) {
  try {
    const { message, threadId } = await req.json();
    if (
      typeof message !== "string" ||
      typeof threadId !== "string" ||
      !message.trim() ||
      !/^[a-z0-9_-]{8,80}$/i.test(threadId) ||
      message.length > 2000
    ) {
      return NextResponse.json(
        { message: "Please provide a valid message." },
        { status: 400 }
      );
    }

    const reply = await generate(message, threadId);

    return NextResponse.json({ message: reply });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({ message: "Welcome to ChatDPT!" });
}
