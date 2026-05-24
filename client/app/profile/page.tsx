"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Shield,
} from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] =
    useState<any>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("userInfo");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06121f] via-[#0b1f35] to-[#071018] p-6 lg:p-10 text-white">

      <div className="max-w-3xl mx-auto rounded-3xl p-8 border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>

            <h2 className="text-2xl font-bold">
              {user?.name || "User"}
            </h2>

            <p className="text-gray-300">
              {user?.email || "No email found"}
            </p>

          </div>

        </div>

        <div className="space-y-4">

          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
            <User className="text-cyan-400" />

            <span>{user?.name || "User"}</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
            <Mail className="text-cyan-400" />

            <span>{user?.email || "No email found"}</span>
          </div>

          <div className="bg-white/5 p-4 rounded-2xl flex items-center gap-3">
            <Shield className="text-cyan-400" />

            <span>Pro Member</span>
          </div>

        </div>

      </div>
    </div>
  );
}