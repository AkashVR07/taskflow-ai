"use client";

import { Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const router = useRouter();
  const { darkMode, toggleTheme } = useTheme();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    router.push("/login");
  };

  return (
    <div className="relative z-30 mb-6">
      <div className="app-card backdrop-blur-xl px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-xl border border-white/5 transition-all duration-300">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT */}
          <div className="min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold truncate">
              Dashboard
            </h2>

            <p className="app-muted mt-1 text-sm sm:text-base">
              Welcome back 👋
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-8 flex items-center rounded-full p-1 transition-all duration-500 shadow-md ${
                darkMode
                  ? "bg-zinc-800"
                  : "bg-yellow-400"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transform transition-all duration-500 ${
                  darkMode
                    ? "translate-x-6"
                    : "translate-x-0"
                }`}
              >
                {darkMode ? (
                  <Moon
                    size={16}
                    className="text-zinc-800"
                  />
                ) : (
                  <Sun
                    size={16}
                    className="text-yellow-500"
                  />
                )}
              </div>
            </button>

            <button
              onClick={logoutHandler}
              className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition text-sm shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}