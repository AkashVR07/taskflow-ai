"use client";

import { useState } from "react";
import { Bot, X } from "lucide-react";
import AIChat from "./AIChat";

type Props = {
  tasks: any[];
};

export default function FloatingAI({
  tasks,
}: Props) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      {/* FLOATING BUTTON */}
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="fixed bottom-6 right-6 z-[999] w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
      >
        {open ? (
          <X size={26} />
        ) : (
          <Bot size={28} />
        )}
      </button>

      {/* CHAT POPUP */}
      {open && (
        <div className="fixed bottom-28 right-6 z-[999] w-[95vw] sm:w-[420px] h-[75vh] max-h-[700px] shadow-2xl rounded-3xl overflow-hidden">
          <AIChat tasks={tasks} />
        </div>
      )}
    </>
  );
}