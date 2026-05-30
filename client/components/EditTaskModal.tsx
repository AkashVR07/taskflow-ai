"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  X,
  FileText,
  Flag,
  CalendarDays,
} from "lucide-react";

type Props = {
  task: {
    _id: string;
    title: string;
    description: string;
    priority?: string;
    dueDate?: string;
  };
  closeModal: () => void;
  fetchTasks: () => void;
};

export default function EditTaskModal({
  task,
  closeModal,
  fetchTasks,
}: Props) {
  const [mounted, setMounted] =
    useState(false);

  const [title, setTitle] =
    useState(task.title);

  const [description, setDescription] =
    useState(task.description);

  const [priority, setPriority] =
    useState(task.priority || "Medium");

  const [dueDate, setDueDate] =
    useState(task.dueDate || "");

  const [loading, setLoading] =
    useState(false);

  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(
          localStorage.getItem("userInfo") ||
            "{}"
        )
      : null;

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow =
      "hidden";

    return () => {
      document.body.style.overflow =
        "auto";
    };
  }, []);

  const updateTask = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${task._id}`,
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

      fetchTasks();

      toast.success(
        "Task updated successfully"
      );

      closeModal();
    } catch (error) {
      toast.error(
        "Failed to update task"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      onClick={closeModal}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
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
        className="relative overflow-hidden w-full max-w-3xl app-card rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(6,182,212,0.18)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 pointer-events-none" />

        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-black">
                Edit Task
              </h2>

              <p className="app-muted mt-2 text-sm">
                Update and manage your task details
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
            onSubmit={updateTask}
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
                  value={title}
                  onChange={(e) =>
                    setTitle(
                      e.target.value
                    )
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
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-2xl app-input min-h-[150px]"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    <option value="High">
                      High
                    </option>
                    <option value="Medium">
                      Medium
                    </option>
                    <option value="Low">
                      Low
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
                    className="absolute left-4 top-1/2 -translate-y-1/2 app-muted"
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

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Save Changes"
                )}
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="flex-1 app-soft py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>,
    document.body
  );
}