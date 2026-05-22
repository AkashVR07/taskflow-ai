"use client";

import { useState } from "react";
import { Bell, Lock, Palette } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen app-bg p-6 lg:p-10">
      <div className="max-w-3xl mx-auto app-card rounded-3xl p-8 border border-white/10 shadow-xl">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <div className="space-y-5">
          <div className="app-soft p-5 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="text-cyan-400" />
              <div>
                <h2 className="font-semibold">Notifications</h2>
                <p className="app-muted text-sm">Enable task reminders</p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="accent-cyan-500"
            />
          </div>

          <div className="app-soft p-5 rounded-2xl flex items-center gap-3">
            <Lock className="text-cyan-400" />
            <div>
              <h2 className="font-semibold">Security</h2>
              <p className="app-muted text-sm">Password and account security</p>
            </div>
          </div>

          <div className="app-soft p-5 rounded-2xl flex items-center gap-3">
            <Palette className="text-cyan-400" />
            <div>
              <h2 className="font-semibold">Appearance</h2>
              <p className="app-muted text-sm">Theme and dashboard style</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}