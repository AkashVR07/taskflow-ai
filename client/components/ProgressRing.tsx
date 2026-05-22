"use client";

type Props = {
  completed: number;
  total: number;
};

export default function ProgressRing({
  completed,
  total,
}: Props) {
  const progress =
    total > 0
      ? Math.round((completed / total) * 100)
      : 0;

  const radius = 70;
  const circumference =
    2 * Math.PI * radius;

  const strokeDashoffset =
    circumference -
    (progress / 100) * circumference;

  return (
    <div className="app-card rounded-3xl p-8 border border-white/10 shadow-xl flex flex-col items-center justify-center">

      <h2 className="text-2xl font-bold mb-8">
        Productivity
      </h2>

      <div className="relative w-44 h-44 flex items-center justify-center">

        <svg
          width="180"
          height="180"
          className="-rotate-90"
        >
          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="12"
            fill="transparent"
          />

          <circle
            cx="90"
            cy="90"
            r={radius}
            stroke="url(#gradient)"
            strokeWidth="12"
            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition:
                "stroke-dashoffset 1s ease",
            }}
          />

          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#06b6d4"
              />

              <stop
                offset="100%"
                stopColor="#3b82f6"
              />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute flex flex-col items-center">
          <h3 className="text-4xl font-extrabold">
            {progress}%
          </h3>

          <p className="app-muted text-sm mt-1">
            Completed
          </p>
        </div>

      </div>

      <div className="mt-8 text-center">
        <p className="app-muted">
          {completed} of {total} tasks completed
        </p>
      </div>
    </div>
  );
}