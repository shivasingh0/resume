import { NextResponse } from "next/server";
import { generate } from "@/lib/chatbot";

export async function POST(req : Request) {
    console.log("req", req);
  try {
    const { message, threadId } = await req.json();
    console.log("message", message, "threadId", threadId);
    if (!message || !threadId) {
      return NextResponse.json(
        { message: "All fields are required!" },
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
