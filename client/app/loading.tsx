export default function Loading() {
  return (
    <div className="min-h-screen app-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-cyan-500/20"></div>

          <div className="absolute inset-0 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"></div>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            TaskFlow AI
          </h1>

          <p className="app-muted mt-2">
            Loading your workspace...
          </p>
        </div>
      </div>
    </div>
  );
}