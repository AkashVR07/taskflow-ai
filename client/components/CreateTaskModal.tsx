"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { X } from "lucide-react";

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
      console.log(error);
      toast.error("Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">

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
        transition={{
          duration: 0.3,
        }}
        className="w-full max-w-2xl app-card rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">
            Create New Task
          </h2>

          <button
            onClick={closeModal}
            className="app-soft w-11 h-11 rounded-2xl flex items-center justify-center hover:scale-105 transition-all duration-300"
          >
            <X size={20} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={createTask}
          className="space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">
              Task Title
            </label>

            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="w-full p-4 rounded-2xl app-input outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              placeholder="Enter task description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              className="w-full p-4 rounded-2xl app-input outline-none min-h-[140px]"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-medium">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-2xl app-input outline-none"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Due Date
              </label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) =>
                  setDueDate(
                    e.target.value
                  )
                }
                className="w-full p-4 rounded-2xl app-input outline-none"
              />
            </div>

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-4 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
          >
            {loading
              ? "Creating..."
              : "Create Task"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}