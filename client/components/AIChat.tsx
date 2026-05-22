"use client";

import ReactMarkdown from "react-markdown";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import axios from "axios";
import {
  Bot,
  Send,
  User,
  Sparkles,
  Trash2,
} from "lucide-react";

type Props = {
  tasks: any[];
};

type Message = {
  role: "user" | "assistant";
  content: string;
};

const defaultMessages: Message[] = [
  {
    role: "assistant",
    content:
      "Hello 👋 I’m your AI productivity assistant. Ask me about priorities, overdue tasks, planning, or how to complete your work faster.",
  },
];

export default function AIChat({ tasks }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] =
    useState<Message[]>(defaultMessages);

  const chatEndRef =
    useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const savedMessages =
      localStorage.getItem(
        "taskflow_ai_chat"
      );

    if (savedMessages) {
      setMessages(
        JSON.parse(savedMessages)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "taskflow_ai_chat",
      JSON.stringify(messages)
    );
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const quickPrompts = [
    "What should I do first today?",
    "Summarize my pending tasks",
    "Which task is highest priority?",
    "Create a work plan for today",
  ];

  const sendMessage = async (
    customPrompt?: string
  ) => {
    const finalPrompt =
      customPrompt || prompt;

    if (!finalPrompt.trim() || loading)
      return;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: finalPrompt,
      },
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo") ||
          "{}"
      );

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/chat`,
        {
          prompt: finalPrompt,
          tasks,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data?.reply ||
            "I could not generate a response.",
        },
      ]);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        "AI backend error. Please check server terminal.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Chat cleared ✅ Ask me anything about your tasks.",
      },
    ]);

    localStorage.removeItem(
      "taskflow_ai_chat"
    );
  };

  return (
    <div className="app-card rounded-3xl border border-white/10 shadow-2xl overflow-hidden max-w-full">
      <div className="bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 border-b border-white/10 p-5 sm:p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <Bot size={26} />
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold">
                AI Productivity Assistant
              </h2>

              <p className="app-muted text-sm mt-1">
                Ask questions, plan your day, and get task-based productivity insights.
              </p>
            </div>
          </div>

          <button
            onClick={clearChat}
            className="app-soft px-4 py-3 rounded-2xl flex items-center gap-2 hover:scale-[1.02] transition-all duration-300 text-sm font-semibold"
          >
            <Trash2 size={17} />
            Clear Chat
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          {quickPrompts.map((item) => (
            <button
              key={item}
              onClick={() =>
                sendMessage(item)
              }
              disabled={loading}
              className="px-4 py-2 rounded-full app-soft text-sm hover:border-cyan-500/40 hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
            >
              <Sparkles
                size={14}
                className="inline mr-2 text-cyan-400"
              />
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="max-h-[420px] min-h-[320px] overflow-y-auto p-5 sm:p-6 space-y-5 scroll-smooth">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex gap-3 ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            {message.role ===
              "assistant" && (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shrink-0">
                <Bot size={18} />
              </div>
            )}

            <div
              className={`max-w-[80%] rounded-3xl px-5 py-4 shadow-lg leading-relaxed ${
                message.role === "user"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-br-md"
                  : "app-soft rounded-bl-md"
              }`}
            >
              <div className="max-w-none text-sm sm:text-base [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-bold [&_p]:mb-2">
                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>

            {message.role === "user" && (
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shrink-0">
                <User size={18} />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white shrink-0">
              <Bot size={18} />
            </div>

            <div className="app-soft rounded-3xl rounded-bl-md px-5 py-4">
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.3s]"></span>
              </div>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="border-t border-white/10 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Ask AI about your tasks, schedule, priorities..."
            value={prompt}
            onChange={(e) =>
              setPrompt(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-1 p-4 rounded-2xl app-input outline-none focus:outline-none focus:ring-0"
          />

          <button
            onClick={() => sendMessage()}
            disabled={loading}
            className="sm:w-16 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 text-white"
          >
            <Send size={21} />
          </button>
        </div>
      </div>
    </div>
  );
}