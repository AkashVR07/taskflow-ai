"use client";

import { useState } from "react";
import axios from "axios";
import { Bot, Send, User } from "lucide-react";

type Props = {
  tasks: any[];
};

export default function AIChat({ tasks }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<any[]>([
    {
      role: "assistant",
      content:
        "Hello 👋 I am your AI productivity assistant. Ask me anything about your tasks.",
    },
  ]);

  const sendMessage = async () => {
    if (!prompt.trim() || loading) return;

    const currentPrompt = prompt;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentPrompt,
      },
    ]);

    setPrompt("");
    setLoading(true);

    try {
      const userInfo = JSON.parse(
        localStorage.getItem("userInfo") || "{}"
      );

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/ai/chat`,
        {
          prompt: currentPrompt,
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
      console.log(error);

      const errorMessage =
        error?.response?.data?.message ||
        "AI backend error. Check server terminal.";

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

  return (
    <div className="app-card rounded-3xl p-6 border border-white/10 shadow-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white">
          <Bot size={22} />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Assistant
          </h2>

          <p className="app-muted text-sm">
            Smart productivity companion
          </p>
        </div>
      </div>

      <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-5 py-4 shadow-lg ${
                message.role === "user"
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  : "app-soft"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {message.role === "user" ? (
                    <User size={18} />
                  ) : (
                    <Bot size={18} />
                  )}
                </div>

                <p className="text-sm leading-relaxed whitespace-pre-line">
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="app-soft rounded-2xl px-5 py-4">
              <p className="animate-pulse">
                AI is typing...
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-6">
        <input
          type="text"
          placeholder="Ask AI about your tasks..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          className="flex-1 p-4 rounded-2xl app-input outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 text-white"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}