"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  X,
  CalendarDays,
  Flag,
  FileText,
} from "lucide-react";

type Props = {
  closeModal: () => void;
  fetchTasks: () => void;
};

export default function CreateTaskModal({
  closeModal,
  fetchTasks,
}: Props) {
  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("userInfo") || "{}"
        )
      : null;

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  const [dueDate, setDueDate] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const createTask = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks`,
        {
          title,
          description,
          priority,
          dueDate,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      toast.success("Task created");

      fetchTasks();
      closeModal();
    } catch (error) {
      toast.error("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
    >
      <motion.div
        onClick={(e) =>
          e.stopPropagation()
        }
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
        transition={{
          duration: 0.3,
        }}
        className="relative overflow-hidden w-full max-w-2xl app-card rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(6,182,212,0.18)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black">
                Create New Task
              </h2>

              <p className="app-muted mt-2 text-sm">
                Organize your work efficiently
              </p>
            </div>

            <button
              onClick={closeModal}
              className="app-soft w-11 h-11 rounded-2xl flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              <X size={20} />
            </button>
          </div>

          <form
            onSubmit={createTask}
            className="space-y-5"
          >
            <div>
              <label className="block mb-2 font-semibold">
                Task Title
              </label>

              <div className="relative">
                <FileText
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 app-muted"
                />

                <input
                  type="text"
                  placeholder="Enter task title"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-4 rounded-2xl app-input"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 font-semibold">
                Description
              </label>

              <textarea
                placeholder="Describe your task..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-2xl app-input min-h-[140px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block mb-2 font-semibold">
                  Priority
                </label>

                <div className="relative">
                  <Flag
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 app-muted"
                  />

                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(
                        e.target.value
                      )
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl app-input"
                  >
                    <option>
                      Low
                    </option>
                    <option>
                      Medium
                    </option>
                    <option>
                      High
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-semibold">
                  Due Date
                </label>

                <div className="relative">
                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 app-muted pointer-events-none"
                  />

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) =>
                      setDueDate(
                        e.target.value
                      )
                    }
                    className="w-full pl-12 pr-4 py-4 rounded-2xl app-input"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-xl hover:shadow-cyan-500/30 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Task...
                </span>
              ) : (
                "Create Task"
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}