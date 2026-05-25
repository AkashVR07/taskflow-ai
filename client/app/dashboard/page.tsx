"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import AnalyticsChart from "@/components/AnalyticsChart";
import ActivityTimeline from "@/components/ActivityTimeline";
import ActivityFeed from "@/components/ActivityFeed";
import CalendarView from "@/components/CalendarView";
import UserProfileCard from "@/components/UserProfileCard";
import KanbanBoard from "@/components/KanbanBoard";
import NotificationCenter from "@/components/NotificationCenter";
import CreateTaskModal from "@/components/CreateTaskModal";
import ProgressRing from "@/components/ProgressRing";
import AIChat from "@/components/AIChat";
import FloatingAI from "@/components/FloatingAI";

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] =
    useState<any[]>([]);

  const [userInfo, setUserInfo] =
    useState<any>(null);

  const [
    showCreateModal,
    setShowCreateModal,
  ] = useState(false);

  const [search, setSearch] =
    useState("");

  const [
    filterPriority,
    setFilterPriority,
  ] = useState("All");

  const [sortBy, setSortBy] =
    useState("Newest");

  const fetchTasks = async () => {
    if (!userInfo?.token) return;

    try {
      const { data } =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/tasks`,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );

      setTasks(data);

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to fetch tasks"
      );
    }
  };

  const filteredTasks = [...tasks]
    .filter((task) => {
      const matchesSearch =
        task.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesPriority =
        filterPriority === "All"
          ? true
          : task.priority ===
            filterPriority;

      return (
        matchesSearch &&
        matchesPriority
      );
    })

    .sort((a, b) => {

      if (sortBy === "Newest") {
        return (
          new Date(
            b.createdAt
          ).getTime() -
          new Date(
            a.createdAt
          ).getTime()
        );
      }

      if (sortBy === "Oldest") {
        return (
          new Date(
            a.createdAt
          ).getTime() -
          new Date(
            b.createdAt
          ).getTime()
        );
      }

      if (sortBy === "Due Date") {
        return (
          new Date(
            a.dueDate || ""
          ).getTime() -
          new Date(
            b.dueDate || ""
          ).getTime()
        );
      }

      return 0;

    });

  useEffect(() => {

    const storedUser =
      localStorage.getItem(
        "userInfo"
      );

    if (!storedUser) {
      router.push("/login");
      return;
    }

    setUserInfo(
      JSON.parse(storedUser)
    );

  }, [router]);

  useEffect(() => {

    if (userInfo?.token) {
      fetchTasks();
    }

  }, [userInfo]);

  return (
    <div className="min-h-screen app-bg">

      <Sidebar />

      <motion.main
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="lg:ml-72 min-w-0 px-4 py-5 pb-24 md:px-7 lg:px-9 lg:pb-8 overflow-x-hidden"
      >

        <Navbar />

        {/* DASHBOARD */}
        <section
          id="dashboard"
          className="pt-4 scroll-mt-24"
        >

          <UserProfileCard
            user={userInfo}
            tasks={tasks}
          />

          {/* STATS */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-6">

            <DashboardCard
              title="Total Tasks"
              value={tasks.length.toString()}
              icon="📋"
              gradient="from-cyan-500 to-blue-500"
            />

            <DashboardCard
              title="Completed"
              value={tasks
                .filter(
                  (task) =>
                    task.status ===
                    "Completed"
                )
                .length.toString()}
              icon="✅"
              gradient="from-green-500 to-emerald-500"
            />

            <DashboardCard
              title="Pending"
              value={tasks
                .filter(
                  (task) =>
                    task.status ===
                    "Pending"
                )
                .length.toString()}
              icon="⏳"
              gradient="from-yellow-500 to-orange-500"
            />

            <DashboardCard
              title="High Priority"
              value={tasks
                .filter(
                  (task) =>
                    task.priority ===
                    "High"
                )
                .length.toString()}
              icon="🔥"
              gradient="from-pink-500 to-red-500"
            />

          </section>

          {/* NOTIFICATIONS */}
          <div className="mt-6">
            <NotificationCenter
              tasks={tasks}
            />
          </div>

          {/* ACTIVITY + PRODUCTIVITY */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 mt-7">

            <ActivityFeed
              tasks={tasks}
            />

            <ProgressRing
              completed={
                tasks.filter(
                  (task) =>
                    task.status ===
                    "Completed"
                ).length
              }
              total={tasks.length}
            />

          </section>

          {/* TIMELINE + CALENDAR */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-5 sm:gap-6 mt-7">

            <ActivityTimeline
              tasks={tasks}
            />

            <CalendarView
              tasks={tasks}
            />

          </section>

        </section>

        {/* ANALYTICS */}
        <section
          id="analytics"
          className="pt-14 scroll-mt-24"
        >

          <AnalyticsChart
            tasks={tasks}
          />

        </section>

        {/* TASKS */}
        <section
          id="tasks"
          className="pt-14 scroll-mt-24"
        >

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">

            <div>

              <h2 className="text-3xl font-extrabold tracking-tight">
                Your Tasks
              </h2>

              <p className="app-muted text-sm mt-1">
                {
                  filteredTasks.length
                }{" "}
                task(s) showing
              </p>

            </div>

            <div className="flex flex-col md:flex-row gap-4">

              <button
                onClick={() =>
                  setShowCreateModal(
                    true
                  )
                }
                className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-2xl font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-cyan-500/20"
              >
                + Create Task
              </button>

              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full md:w-auto p-3 sm:p-4 rounded-2xl app-input outline-none focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />

              <select
                className="w-full md:w-auto p-3 sm:p-4 rounded-2xl app-input outline-none focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                value={
                  filterPriority
                }
                onChange={(e) =>
                  setFilterPriority(
                    e.target.value
                  )
                }
              >

                <option value="All">
                  All Priorities
                </option>

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

              <select
                className="w-full md:w-auto p-3 sm:p-4 rounded-2xl app-input outline-none focus:border-blue-500 transition-all duration-300 text-sm sm:text-base"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(
                    e.target.value
                  )
                }
              >

                <option value="Newest">
                  Newest
                </option>

                <option value="Oldest">
                  Oldest
                </option>

                <option value="Due Date">
                  Due Date
                </option>

              </select>

            </div>

          </div>

          <KanbanBoard
            tasks={filteredTasks}
            fetchTasks={fetchTasks}
          />

        </section>

        {/* AI SECTION */}
        <section
          id="ai"
          className="pt-14 pb-14 scroll-mt-24"
        >

          <div className="max-w-6xl mx-auto">
            <AIChat tasks={tasks} />
          </div>

        </section>

        {/* CREATE TASK MODAL */}
        {showCreateModal && (
          <CreateTaskModal
            closeModal={() =>
              setShowCreateModal(
                false
              )
            }
            fetchTasks={fetchTasks}
          />
        )}

        {/* FLOATING AI */}
        <FloatingAI tasks={tasks} />

      </motion.main>
    </div>
  );
}