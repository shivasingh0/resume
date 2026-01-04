"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, User, Bot, Sparkles } from "lucide-react";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi! I'm Shiv. What do you want to know about me?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const scrollRef = useRef<HTMLDivElement>(null);

  const threadIdRef = useRef(
    Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const threadId =
    Date.now().toString(36) + Math.random().toString(36).substring(2, 8);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          threadId: threadIdRef.current,
        }),
      });

      if (!response.ok) {
        throw new Error("API Error");
      }

      const result = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: result.message,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          role: "assistant",
          text: "Sorry, something went wrong. Please try again.",
        },
      ]);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          isOpen
            ? "scale-0 opacity-0 rotate-90"
            : "scale-100 opacity-100 rotate-0"
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-16 w-16 items-center justify-center rounded-2xl bg-primary
shadow-[0_8px_30px_rgba(0,0,0,0.25)]
dark:shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary via-accent to-primary bg-[length:200%_200%] animate-[gradient_3s_ease_infinite]" />

          {/* Floating sparkles */}
          <Sparkles className="absolute top-2 right-2 h-3 w-3 text-white/40 animate-pulse" />

          <MessageSquare className="relative h-7 w-7 text-white transition-transform duration-300 group-hover:rotate-12" />

          {/* Indicator dot */}
          <span className="absolute top-4 right-4 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </button>
      </div>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 z-50 flex w-[calc(100vw-3rem)] sm:w-[400px] flex-col overflow-hidden rounded-[2.5rem] bg-white/70 dark:bg-neutral-900/70
backdrop-blur-2xl
border border-white/40 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${
          isOpen
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-12 opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ height: "min(650px, calc(100vh - 5rem))" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between bg-gradient-to-r 
from-primary/10 to-accent/10
dark:from-primary/20 dark:to-accent/20 p-6 border-b border-white/20"
        >
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-accent p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-[calc(1rem-2px)] bg-white/90">
                <Bot className="h-6 w-6 text-black" />
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground dark:text-neutral-400">
                Assistant
              </p>
              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-xs font-medium text-muted-foreground">
                  Always active
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="
    flex h-10 w-10 items-center justify-center rounded-xl
    bg-white/50 dark:bg-neutral-800/60
    text-muted-foreground dark:text-neutral-400
    backdrop-blur-md
    transition-all duration-300
    hover:bg-neutral-300 dark:hover:bg-neutral-700
    hover:text-foreground dark:hover:text-neutral-100
    hover:rotate-90
    active:scale-90
  "
          >
            <X
              className="
      h-5 w-5
      text-primary
      transition-colors duration-300
      hover:text-primary
      dark:text-primary
    "
            />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-end gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500 ${
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl shadow-sm ${
                  msg.role === "assistant"
                    ? "bg-gradient-to-br from-primary/20 to-accent/20 text-primary border border-white/40"
                    : "bg-primary text-white"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-4 w-4" />
                ) : (
                  <User className="h-4 w-4" />
                )}
              </div>
              <div
                className={`group relative max-w-[80%] rounded-[1.5rem] px-5 py-3.5 text-sm shadow-sm transition-all hover:shadow-md ${
                  msg.role === "assistant"
                    ? "rounded-bl-none bg-white/80 dark:bg-neutral-800/80 border border-white/60 dark:border-white/10 text-foreground dark:text-neutral-100"
                    : "rounded-br-none bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 font-medium"
                }`}
              >
                {msg.text}
                <div
                  className={`absolute bottom-[-1.25rem] whitespace-nowrap text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 ${
                    msg.role === "user" ? "right-0" : "left-0"
                  }`}
                >
                  {mounted && (
                    <div
                      className="text-[10px] dark:text-neutral-400
 text-muted-foreground"
                    >
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-6 pt-2">
          <form
            onSubmit={handleSend}
            className="group relative flex items-center transition-all focus-within:scale-[1.01]"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 blur-xl transition-opacity group-focus-within:opacity-100" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Write a message..."
              className="relative w-full rounded-2xl border px-5 py-4 text-sm backdrop-blur-md outline-none transition-all focus:border-primary/100 bg-white/60 dark:bg-neutral-800/70
border-primary/50 dark:border-primary/40
focus:bg-white dark:focus:bg-neutral-800
text-foreground dark:text-neutral-100
placeholder:text-muted-foreground dark:placeholder:text-neutral-400"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="
    absolute right-2
    flex h-10 w-10 items-center justify-center rounded-xl

    /* Light mode */
    bg-primary text-white

    /* Dark mode – force contrast */
    dark:bg-white
    dark:text-primary

    /* Border to separate from input */
    border border-white/20 dark:border-neutral-300/40

    /* Shadows */
    shadow-[0_6px_18px_rgba(0,0,0,0.25)]
    dark:shadow-[0_0_18px_rgba(255,255,255,0.35)]

    transition-all duration-300
    hover:scale-105 active:scale-95

    disabled:opacity-50
    disabled:cursor-not-allowed
    disabled:hover:scale-100
  "
            >
              <Send
                className="
      h-4 w-4
      text-white
      dark:text-black
      transition-transform duration-300
    "
              />
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
