"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  X,
  Send,
  User,
  Bot,
  Sparkles,
  Mic,
  MicOff,
  Square,
  Volume2,
} from "lucide-react";
import Markdown from "react-markdown";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
};

type SpeechRecognitionResultEvent = Event & {
  resultIndex?: number;
  results: {
    [index: number]: {
      [index: number]: { transcript: string };
      isFinal: boolean;
    };
    length: number;
  };
};

type SpeechRecognitionInstance = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance;

const STORAGE_KEY_THREAD = "shiv_chat_thread_id_v1";
const STORAGE_KEY_MESSAGES = "shiv_chat_messages_v1";
const MAX_HISTORY_MSG_LENGTH = 1999;

function cleanMarkdownForSpeech(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/[*_~`#]+/g, "")
    .replace(/^>\s+/gm, "")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Hi! I'm Shiv's AI digital representative. What would you like to know about his skills, projects, work experience, or background?",
};

export function FloatingChatbot() {
  return <FloatingChatbotContent />;
}

function FloatingChatbotContent() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<"text" | "voice">("text");
  const [voiceError, setVoiceError] = useState("");
  const [isCallActive, setIsCallActive] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<
    "idle" | "connecting" | "listening" | "thinking" | "speaking" | "unsupported"
  >("idle");
  const [interimTranscript, setInterimTranscript] = useState("");
  const [isVoiceOutputMuted, setIsVoiceOutputMuted] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [mounted, setMounted] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const voiceRequestRef = useRef(0);
  const voiceSessionRef = useRef(false);
  const voiceProcessingRef = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const threadIdRef = useRef<string>(
    Date.now().toString(36) + Math.random().toString(36).substring(2, 8)
  );

  useEffect(() => {
    setMounted(true);

    // Restore threadId and messages from sessionStorage if available
    try {
      const storedThread = sessionStorage.getItem(STORAGE_KEY_THREAD);
      if (storedThread && /^[a-z0-9_-]{8,80}$/i.test(storedThread)) {
        threadIdRef.current = storedThread;
      } else {
        sessionStorage.setItem(STORAGE_KEY_THREAD, threadIdRef.current);
      }

      const storedMessages = sessionStorage.getItem(STORAGE_KEY_MESSAGES);
      if (storedMessages) {
        const parsed = JSON.parse(storedMessages);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const validated = parsed
            .filter((m): m is ChatMessage => {
              if (!m || typeof m !== "object") return false;
              if (m.id === "welcome") return true;
              if (typeof m.id === "string" && m.id.startsWith("error-")) return false;
              const role = m.role;
              if (role !== "user" && role !== "assistant") return false;
              const text =
                typeof m.text === "string"
                  ? m.text
                  : typeof (m as any).content === "string"
                  ? (m as any).content
                  : "";
              return text.trim().length > 0;
            })
            .map((m): ChatMessage => {
              const text =
                typeof m.text === "string"
                  ? m.text
                  : typeof (m as any).content === "string"
                  ? (m as any).content
                  : "";
              return {
                id: m.id || `${m.role}-${Date.now()}`,
                role: m.role as "user" | "assistant",
                text: text.slice(0, MAX_HISTORY_MSG_LENGTH),
              };
            });
          if (validated.length > 0) {
            setMessages(validated);
          }
        }
      }
    } catch {
      // sessionStorage unavailable or restricted
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      sessionStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
    } catch {
      // ignore storage quota errors
    }
  }, [messages, mounted]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const startRecognition = (preserveStatus = false) => {
    const SpeechRecognition = (
      window as Window & {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      }
    ).SpeechRecognition ?? (
      window as Window & { webkitSpeechRecognition?: SpeechRecognitionConstructor }
    ).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceStatus("unsupported");
      setVoiceError("Speech recognition is not supported in this browser. Please use text chat.");
      return;
    }

    if (
      recognitionRef.current ||
      !voiceSessionRef.current ||
      (voiceProcessingRef.current && !preserveStatus)
    ) {
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      // Set listening state ONLY when speech recognition has actually started
      if (!preserveStatus && voiceSessionRef.current) {
        setVoiceStatus("listening");
      }
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interim = "";
      const startIndex = typeof event.resultIndex === "number" ? event.resultIndex : 0;
      for (let index = startIndex; index < event.results.length; index += 1) {
        const transcript = event.results[index][0].transcript;
        if (event.results[index].isFinal) finalTranscript += transcript;
        else interim += transcript;
      }
      setInterimTranscript(interim);

      if (finalTranscript.trim() && voiceSessionRef.current) {
        // Prevent duplicate processing
        if (voiceProcessingRef.current && !window.speechSynthesis.speaking) return;

        window.speechSynthesis.cancel();
        voiceProcessingRef.current = true;
        recognition.stop();
        setInterimTranscript("");
        voiceRequestRef.current += 1;
        setVoiceStatus("thinking");
        void sendChatMessage(finalTranscript, true);
      }
    };

    recognition.onerror = (event) => {
      const error = event as Event & { error?: string };
      const errType = error.error;

      if (errType === "aborted" || !voiceSessionRef.current) {
        return;
      }

      // 'no-speech' is a normal silence timeout in Chromium; do NOT treat as fatal
      if (errType === "no-speech") {
        return;
      }

      if (errType === "not-allowed") {
        setVoiceError("Microphone access was denied. Please allow microphone permissions in your browser.");
        setVoiceStatus("idle");
        voiceSessionRef.current = false;
        setIsCallActive(false);
        return;
      }

      if (errType === "audio-capture") {
        setVoiceError("No microphone detected. Please connect a microphone and try again.");
        setVoiceStatus("idle");
        voiceSessionRef.current = false;
        setIsCallActive(false);
        return;
      }

      setVoiceError("Speech recognition encountered an issue. You can continue with text chat.");
      setVoiceStatus("idle");
    };

    recognition.onend = () => {
      recognitionRef.current = null;
      if (
        voiceSessionRef.current &&
        (!voiceProcessingRef.current || window.speechSynthesis.speaking)
      ) {
        window.setTimeout(
          () => startRecognition(window.speechSynthesis.speaking),
          150
        );
      }
    };

    recognitionRef.current = recognition;
    if (!preserveStatus) {
      setVoiceStatus("connecting");
    }

    try {
      recognition.start();
    } catch {
      recognitionRef.current = null;
      setVoiceStatus("idle");
    }
  };

  const stopVoiceOutput = () => {
    abortControllerRef.current?.abort();
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    voiceProcessingRef.current = false;
    setVoiceStatus("idle");
    if (voiceSessionRef.current) startRecognition();
  };

  const playVoiceReply = (text: string, requestId: number) => {
    if (requestId !== voiceRequestRef.current || isVoiceOutputMuted) {
      return;
    }

    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      voiceProcessingRef.current = false;
      setVoiceStatus(voiceSessionRef.current ? "listening" : "idle");
      setVoiceError("Voice playback is unavailable in this browser. You can continue with text chat.");
      if (voiceSessionRef.current) startRecognition();
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = cleanMarkdownForSpeech(text);
    if (!cleanText) {
      voiceProcessingRef.current = false;
      setVoiceStatus(voiceSessionRef.current ? "listening" : "idle");
      if (voiceSessionRef.current) startRecognition();
      return;
    }

    let hasSpoken = false;
    const speak = () => {
      if (hasSpoken || requestId !== voiceRequestRef.current || isVoiceOutputMuted) return;
      hasSpoken = true;

      const voices = window.speechSynthesis.getVoices();
      const indianEnglishVoices = voices.filter(
        (voice) =>
          voice.lang.toLowerCase() === "en-in" ||
          /(^|[-_])in($|[-_])/i.test(voice.lang) ||
          /india|indian/i.test(voice.name)
      );
      const maleVoicePattern =
        /ravi|microsoft ravi|male|david|mark|guy|george|daniel|alex|james|tom/i;
      const maleIndianVoice = indianEnglishVoices.find((voice) =>
        maleVoicePattern.test(voice.name)
      );
      const maleEnglishVoice = voices.find(
        (voice) =>
          voice.lang.toLowerCase().startsWith("en") &&
          maleVoicePattern.test(voice.name)
      );
      const selectedVoice =
        maleIndianVoice ??
        maleEnglishVoice ??
        indianEnglishVoices[0] ??
        voices.find((voice) => voice.lang.toLowerCase().startsWith("en")) ??
        null;

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice?.lang || "en-US";
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.volume = 1;

      utterance.onstart = () => {
        setVoiceStatus("speaking");
        setVoiceError("");
      };

      utterance.onend = () => {
        voiceProcessingRef.current = false;
        if (voiceSessionRef.current) {
          setVoiceStatus("listening");
          startRecognition();
        } else {
          setVoiceStatus("idle");
        }
      };

      utterance.onerror = (event: SpeechSynthesisErrorEvent | Event) => {
        voiceProcessingRef.current = false;
        const errType = (event as { error?: string })?.error;

        // Normal cancellation or interruption should not be treated as a failure
        if (errType === "canceled" || errType === "interrupted") {
          return;
        }

        let friendlyError = "Voice playback is unavailable. You can continue with text chat.";
        if (errType === "not-allowed") {
          friendlyError = "Audio playback was blocked. Please check browser audio permissions.";
        } else if (errType === "audio-busy") {
          friendlyError = "Audio device is currently busy. Please try again.";
        } else if (errType === "voice-unavailable" || errType === "language-unavailable") {
          friendlyError = "Selected voice is unavailable on your system. Continuing with default voice.";
        } else if (errType === "network") {
          friendlyError = "Network error while loading speech synthesis voice.";
        }

        setVoiceStatus(voiceSessionRef.current ? "listening" : "idle");
        setVoiceError(friendlyError);
        if (voiceSessionRef.current) {
          startRecognition();
        }
      };

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      speak();
    } else {
      const handleVoicesChanged = () => {
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
        speak();
      };
      window.speechSynthesis.addEventListener("voiceschanged", handleVoicesChanged);
      window.setTimeout(() => {
        window.speechSynthesis.removeEventListener("voiceschanged", handleVoicesChanged);
        speak();
      }, 1000);
    }
    window.setTimeout(() => {
      if (voiceSessionRef.current && window.speechSynthesis.speaking) {
        startRecognition(true);
      }
    }, 150);
  };

  const sendChatMessage = async (message: string, speakReply = false) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    // Abort any ongoing stream
    abortControllerRef.current?.abort();
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const userMessageId = `user-${Date.now()}`;
    const assistantMessageId = `assistant-${Date.now() + 1}`;

    // Validate the current user message separately (up to 2000 characters)
    const currentQuery = trimmedMessage.slice(0, 2000);

    const userMessage: ChatMessage = {
      id: userMessageId,
      role: "user",
      text: currentQuery,
    };

    const initialAssistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      text: "",
    };

    // Calculate bounded, normalized client history:
    // 1. Exclude welcome placeholder, empty turns, and previous error turns
    // 2. Validate roles are strictly "user" or "assistant"
    // 3. Keep latest 6 valid historical messages in chronological order
    // 4. Truncate oversized historical messages to exactly 1,999 characters without touching currentQuery
    const validHistory = messages.filter(
      (m): m is ChatMessage =>
        Boolean(m) &&
        m.id !== "welcome" &&
        !m.id.startsWith("error-") &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.text === "string" &&
        m.text.trim().length > 0
    );

    const historyToSend = validHistory
      .slice(-6)
      .map((m) => ({
        role: m.role,
        content: m.text.trim().slice(0, MAX_HISTORY_MSG_LENGTH),
      }));

    // Append to UI messages state
    setMessages((prev) => [...prev, userMessage, initialAssistantMessage]);

    try {
      if (speakReply) {
        setVoiceStatus("thinking");
      }

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentQuery,
          threadId: threadIdRef.current,
          history: historyToSend,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        let errorMessage = "Chat request failed.";
        try {
          const errorData = await response.json();
          if (errorData?.message) errorMessage = errorData.message;
        } catch {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("No response body received from server.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        accumulatedText += chunkText;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, text: accumulatedText }
              : msg
          )
        );
      }

      // Voice output: speak only when complete answer has streamed
      if (speakReply && accumulatedText.trim()) {
        playVoiceReply(accumulatedText, voiceRequestRef.current);
      }
    } catch (error: unknown) {
      if ((error as { name?: string })?.name === "AbortError") {
        return;
      }
      voiceProcessingRef.current = false;
      setVoiceStatus("idle");

      const failureText =
        error instanceof Error
          ? error.message
          : "Sorry, something went wrong. Please try again.";

      // Prefix id with error- so it is never re-sent in history on subsequent turns
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { id: `error-${Date.now()}`, role: "assistant", text: failureText }
            : msg
        )
      );

      if (speakReply) {
        setVoiceError(failureText);
        if (voiceSessionRef.current) {
          startRecognition();
        }
      }
    }
  };

  const handleStartVoice = () => {
    setVoiceError("");
    const SpeechRecognition = (
      window as Window & { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor }
    ).SpeechRecognition ?? (
      window as Window & { webkitSpeechRecognition?: SpeechRecognitionConstructor }
    ).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceStatus("unsupported");
      setVoiceError("Speech recognition is not supported in this browser. Please use text chat.");
      return;
    }
    if (!window.isSecureContext && window.location.hostname !== "localhost") {
      setVoiceError("Voice chat requires a secure (HTTPS) connection.");
      return;
    }

    voiceSessionRef.current = true;
    setIsCallActive(true);
    voiceProcessingRef.current = false;
    recognitionRef.current?.stop();
    startRecognition();
  };

  const handleStopVoice = () => {
    voiceSessionRef.current = false;
    setIsCallActive(false);
    voiceProcessingRef.current = false;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    voiceRequestRef.current += 1;
    stopVoiceOutput();
    setInterimTranscript("");
    setVoiceError("");
  };

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      voiceSessionRef.current = false;
      voiceProcessingRef.current = false;
      recognitionRef.current?.stop();
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const message = inputValue;
    setInputValue("");
    await sendChatMessage(message);
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
            onClick={() => {
              handleStopVoice();
              setIsOpen(false);
            }}
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

        {!isCallActive && <div className="flex gap-2 border-b border-white/20 p-3">
          <button
            type="button"
            onClick={() => {
              handleStopVoice();
              setActiveMode("text");
            }}
            className={`flex-1 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
              activeMode === "text" ? "bg-primary text-primary-foreground" : "bg-white/40 dark:bg-neutral-800/60"
            }`}
          >
            <MessageSquare className="mr-2 inline h-4 w-4" />
            Text chat
          </button>
          <button
            type="button"
            onClick={() => setActiveMode("voice")}
            className={`flex-1 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${
              activeMode === "voice" ? "bg-primary text-primary-foreground" : "bg-white/40 dark:bg-neutral-800/60"
            }`}
          >
            <Mic className="mr-2 inline h-4 w-4" />
            Voice chat
          </button>
        </div>}

        {activeMode === "voice" && !isCallActive && (
          <div className="border-b border-white/20 px-6 py-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium">
                  {voiceStatus === "listening"
                    ? "Listening..."
                    : voiceStatus === "connecting"
                      ? "Connecting microphone..."
                      : voiceStatus === "thinking"
                        ? "Thinking..."
                        : voiceStatus === "speaking"
                          ? "Speaking..."
                          : voiceStatus === "unsupported"
                            ? "Voice input unavailable"
                            : "Voice chat"}
                </p>
                <p aria-live="polite" className="text-xs text-muted-foreground">
                  {voiceStatus === "unsupported"
                    ? "Use text chat in this browser."
                    : voiceStatus === "connecting"
                      ? "Requesting microphone..."
                      : interimTranscript || "Press start and speak naturally."}
                </p>
              </div>
              {voiceStatus === "listening" ? (
                <button
                  type="button"
                  aria-label="Stop listening"
                  onClick={handleStopVoice}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive text-destructive-foreground"
                >
                  <Square className="h-4 w-4" />
                </button>
              ) : voiceStatus === "speaking" ? (
                <button
                  type="button"
                  aria-label="Stop speaking"
                  onClick={handleStopVoice}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive text-destructive-foreground"
                >
                  <Square className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStartVoice}
                  disabled={voiceStatus === "thinking" || voiceStatus === "connecting"}
                  className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs text-primary-foreground disabled:opacity-50"
                >
                  <Mic className="h-4 w-4" />
                  Start
                </button>
              )}
            </div>
            {(voiceStatus === "speaking" || voiceStatus === "thinking") && (
              <label className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <Volume2 className="h-4 w-4" />
                <button
                  type="button"
                  aria-label={isVoiceOutputMuted ? "Unmute voice output" : "Mute voice output"}
                  onClick={() => {
                    const nextMuted = !isVoiceOutputMuted;
                    setIsVoiceOutputMuted(nextMuted);
                    if (nextMuted) stopVoiceOutput();
                  }}
                  className="rounded-lg bg-white/50 px-3 py-1 dark:bg-neutral-800/70"
                >
                  {isVoiceOutputMuted ? <MicOff className="h-4 w-4" /> : "Audio on"}
                </button>
              </label>
            )}
            {voiceError && <p className="mt-2 text-xs text-destructive">{voiceError}</p>}
          </div>
        )}

        {activeMode === "voice" && isCallActive ? (
          <div className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.18),transparent_58%)] px-8">
            <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(120,119,198,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(120,119,198,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
            <div className={`relative flex h-56 w-56 items-center justify-center rounded-full transition-all duration-700 ${
              voiceStatus === "listening"
                ? "scale-105 bg-cyan-400/20 shadow-[0_0_90px_rgba(34,211,238,0.45)]"
                : voiceStatus === "connecting"
                  ? "scale-100 bg-sky-400/20 animate-pulse"
                  : voiceStatus === "thinking"
                    ? "scale-95 bg-amber-400/20 shadow-[0_0_90px_rgba(251,191,36,0.35)]"
                    : voiceStatus === "speaking"
                      ? "scale-110 bg-violet-400/25 shadow-[0_0_110px_rgba(167,139,250,0.5)]"
                      : "bg-white/10"
            }`}>
              <div className={`absolute inset-5 rounded-full border border-white/30 ${
                voiceStatus === "speaking" ? "animate-[voice-orb_1.4s_ease-in-out_infinite]" : "animate-[voice-orb_2.6s_ease-in-out_infinite]"
              }`} />
              <div className="absolute inset-10 rounded-full border border-cyan-200/30 animate-[voice-orb-reverse_3.2s_linear_infinite]" />
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 via-violet-400 to-fuchsia-500 shadow-[inset_0_0_35px_rgba(255,255,255,0.4)]">
                <div className="h-16 w-16 rounded-full bg-white/20 blur-xl" />
              </div>
            </div>
            <p className="relative mt-10 text-sm font-medium tracking-wide">
              {voiceStatus === "listening"
                ? "Listening"
                : voiceStatus === "connecting"
                  ? "Connecting microphone..."
                  : voiceStatus === "thinking"
                    ? "Thinking"
                    : voiceStatus === "speaking"
                      ? "Shiv is speaking"
                      : "Call connected"}
            </p>
            <p aria-live="polite" className="relative mt-2 min-h-5 max-w-xs text-center text-xs text-muted-foreground">
              {interimTranscript || (voiceStatus === "speaking" ? "You can interrupt at any time" : voiceStatus === "connecting" ? "Requesting microphone permission..." : "Speak naturally")}
            </p>
            <button
              type="button"
              aria-label="End call"
              onClick={handleStopVoice}
              className="relative mt-10 flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              <Square className="h-5 w-5 fill-current" />
            </button>
            {voiceError && <p className="relative mt-4 text-center text-xs text-destructive">{voiceError}</p>}
          </div>
        ) : (
        <>

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
                {msg.role === "assistant" ? (
                  msg.text ? (
                    <Markdown
                      className="prose dark:prose-invert max-w-none text-sm break-words leading-relaxed"
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
                          />
                        ),
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        ul: ({ children }) => (
                          <ul className="mb-2 list-disc pl-4 space-y-1">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="mb-2 list-decimal pl-4 space-y-1">{children}</ol>
                        ),
                        li: ({ children }) => <li className="leading-snug">{children}</li>,
                        strong: ({ children }) => (
                          <strong className="font-semibold text-foreground dark:text-neutral-100">
                            {children}
                          </strong>
                        ),
                        code: ({ children }) => (
                          <code className="rounded bg-black/10 dark:bg-white/10 px-1 py-0.5 font-mono text-xs">
                            {children}
                          </code>
                        ),
                      }}
                    >
                      {msg.text}
                    </Markdown>
                  ) : (
                    <div className="flex items-center gap-1.5 py-1 text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
                      <span className="h-1.5 w-1.5 rounded-full bg-current animate-bounce" />
                    </div>
                  )
                ) : (
                  <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                )}
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

        {/* Quick Suggestion Chips */}
        {activeMode === "text" && messages.length <= 2 && (
          <div className="flex gap-2 overflow-x-auto px-6 py-1 scrollbar-hide">
            {[
              "Tell me about your AI background",
              "What did you build for Maidway?",
              "How can I download your resume?",
            ].map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => sendChatMessage(chip)}
                className="whitespace-nowrap rounded-lg border border-primary/20 bg-white/40 dark:bg-neutral-800/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

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
        </>
        )}
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
        @keyframes voice-orb {
          0%, 100% { transform: scale(0.94); opacity: 0.5; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes voice-orb-reverse {
          from { transform: rotate(0deg) scale(0.95); }
          to { transform: rotate(-360deg) scale(1.05); }
        }
      `}</style>
    </>
  );
}
