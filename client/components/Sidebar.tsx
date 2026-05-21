"use client";

import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  CheckSquare,
  Bot,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "tasks", label: "Tasks", icon: CheckSquare },
  { id: "ai", label: "AI Assistant", icon: Bot },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (!section) return;

    const yOffset = -20;
    const y =
      section.getBoundingClientRect().top +
      window.scrollY +
      yOffset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });

    setActive(id);
    setOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (const item of menuItems) {
        const section = document.getElementById(item.id);

        if (!section) continue;

        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActive(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-[1000] w-9 h-9 rounded-lg bg-white/90 text-black border border-zinc-200 shadow-md flex items-center justify-center backdrop-blur-md"
        >
          <Menu size={18} />
        </button>
      )}

      {/* MOBILE OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 min-h-screen h-full w-72 app-card p-6 z-[999] shadow-2xl transition-transform duration-300 shrink-0 ${
          open
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              TaskFlow AI
            </h1>

            <p className="app-muted mt-2 text-sm">
              Smart Productivity SaaS
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="lg:hidden app-soft w-10 h-10 rounded-xl flex items-center justify-center"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-12 space-y-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg"
                    : "app-soft hover:scale-[1.02]"
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-purple-500/15 border border-cyan-500/20 p-5 rounded-2xl shadow-lg">
            <p className="font-semibold text-lg">
              Productivity Boost
            </p>

            <p className="app-muted text-sm mt-2 leading-relaxed">
              Organize smarter with AI-driven task insights.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}