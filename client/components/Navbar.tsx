"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  Moon,
  Sun,
  Search,
} from "lucide-react";

export default function Navbar() {
  const [dark, setDark] =
    useState(true);

  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("userInfo");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleTheme = () => {
    setDark(!dark);

    document.documentElement.classList.toggle(
      "dark"
    );
  };

  return (
    <header className="w-full mb-8">
      <div className="app-card rounded-3xl p-4 sm:p-5 border border-white/10 shadow-xl backdrop-blur-xl">

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

          {/* LEFT */}
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back 👋
            </h1>

            <p className="app-muted mt-1 text-sm">
              {user?.name ||
                "TaskFlow User"}
            </p>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">

            {/* SEARCH */}
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search..."
                className="w-full sm:w-64 pl-11 pr-4 py-3 rounded-2xl app-input outline-none"
              />
            </div>

            {/* ACTIONS */}
            <div className="flex items-center gap-3">

              {/* NOTIFICATION */}
              <button className="relative app-soft w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 transition-all duration-300">
                <Bell size={20} />

                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
              </button>

              {/* THEME */}
              <button
                onClick={toggleTheme}
                className="app-soft w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-105 transition-all duration-300"
              >
                {dark ? (
                  <Sun size={20} />
                ) : (
                  <Moon size={20} />
                )}
              </button>

              {/* USER */}
              <div className="flex items-center gap-3 app-soft px-4 py-2 rounded-2xl">

                <div className="w-11 h-11 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                  {user?.name
                    ?.charAt(0)
                    ?.toUpperCase() ||
                    "U"}
                </div>

                <div className="hidden sm:block">
                  <p className="font-semibold text-sm">
                    {user?.name ||
                      "User"}
                  </p>

                  <p className="text-xs app-muted">
                    Pro Member
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </header>
  );
}