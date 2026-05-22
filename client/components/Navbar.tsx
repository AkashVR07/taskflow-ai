"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");

    document.cookie =
      "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    router.push("/login");
  };

  return (
    <div className="w-full flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-lg">

      {/* Logo */}
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
        TaskFlow AI
      </h1>

      {/* Logout Button */}
      <button
        onClick={logoutHandler}
        className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-all duration-300"
      >
        <LogOut size={18} />
        Logout
      </button>
    </div>
  );
}