"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { X } from "lucide-react";

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
  const [mounted, setMounted] = useState(false);

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState(task.priority || "Medium");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [loading, setLoading] = useState(false);

  const userInfo =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("userInfo") || "{}")
      : null;

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const updateTask = async (e: React.FormEvent) => {
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
      toast.success("Task updated successfully");
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update task");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#111827] p-6 sm:p-8 shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 mb-7">
          <div>
            <h2 className="text-3xl font-bold text-white">
              Edit Task
            </h2>

            <p className="text-gray-400 mt-1">
              Update your task details
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            className="w-11 h-11 rounded-2xl bg-white/10 text-white flex items-center justify-center hover:bg-red-500 transition-all duration-300"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={updateTask} className="space-y-5">
          <div>
            <label className="block mb-2 font-semibold text-white">
              Task Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-4 rounded-2xl bg-white text-black placeholder:text-slate-500 border border-white/20 outline-none focus:border-cyan-500 transition-all duration-300"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-white">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-4 rounded-2xl bg-white text-black placeholder:text-slate-500 border border-white/20 outline-none focus:border-cyan-500 transition-all duration-300 min-h-[150px] resize-none"
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 font-semibold text-white">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white text-black border border-white/20 outline-none focus:border-cyan-500 transition-all duration-300"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-semibold text-white">
                Due Date
              </label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-4 rounded-2xl bg-white text-black border border-white/20 outline-none focus:border-cyan-500 transition-all duration-300"
                style={{ colorScheme: "light" }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-7 py-4 rounded-2xl font-semibold shadow-lg hover:scale-[1.03] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-auto bg-white/10 text-white px-7 py-4 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>,
    document.body
  );
}