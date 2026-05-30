"use client";

import { useState } from "react";
import { Bot, X, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import AIChat from "./AIChat";

type Props = {
  tasks: any[];
};

export default function FloatingAI({
  tasks,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed bottom-28 right-4 sm:right-6 z-[9998] w-[calc(100vw-2rem)] sm:w-[460px] lg:w-[520px] h-[75vh] max-h-[720px] rounded-3xl overflow-hidden shadow-[0_0_45px_rgba(6,182,212,0.35)] border border-cyan-500/20"
          >
            <AIChat tasks={tasks} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 shadow-[0_0_35px_rgba(6,182,212,0.5)] flex items-center justify-center text-white transition-all duration-300"
      >
        {open ? (
          <X size={27} />
        ) : (
          <div className="relative">
            <Bot size={29} />

            <Sparkles
              size={15}
              className="absolute -top-2 -right-2 text-yellow-300 animate-pulse"
            />
          </div>
        )}
      </motion.button>
    </>
  );
}