import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/context/ThemeContext";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "TaskFlow AI",
  description:
    "Smart AI-powered productivity and task management SaaS platform.",
  keywords: [
    "TaskFlow AI",
    "AI productivity",
    "task manager",
    "project management",
    "kanban board",
    "AI assistant",
    "Next.js SaaS",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <Toaster
              position="top-right"
              toastOptions={{
              duration: 1800,
            }}
          />

          {children}
        </AuthProvider>
      </ThemeProvider>
      </body>
    </html>
  );
}