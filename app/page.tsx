"use client";

import { useState, useCallback } from "react";

type Category = {
  id: string;
  emoji: string;
  label: string;
  options: string[];
  color: string;
  reason: (option: string) => string;
};

const CATEGORIES: Category[] = [
  {
    id: "breakfast",
    emoji: "🍳",
    label: "Breakfast",
    color: "from-orange-400 to-amber-500",
    options: [
      "Kaya toast + soft-boiled eggs",
      "Overnight oats with banana",
      "Nasi lemak",
      "Avocado toast",
      "Prata with curry",
      "Congee with century egg",
      "Greek yogurt + granola",
      "Dim sum (yum cha)",
      "Smoothie bowl",
      "Fried rice",
    ],
    reason: (o) =>
      `"${o}" gives you steady energy to power through morning decisions — just like this one.`,
  },
  {
    id: "learning",
    emoji: "📚",
    label: "Today's Study",
    color: "from-blue-500 to-indigo-600",
    options: [
      "Prompt engineering techniques",
      "Next.js App Router deep-dive",
      "LangGraph multi-agent patterns",
      "TypeScript advanced types",
      "Redis caching strategies",
      "PostgreSQL query optimization",
      "Docker networking",
      "Vercel Edge Functions",
      "React Server Components",
      "AI agent memory systems",
    ],
    reason: (o) =>
      `"${o}" aligns perfectly with where AI + engineering is heading. PengPeng approves.`,
  },
  {
    id: "activity",
    emoji: "🌴",
    label: "Evening Activity",
    color: "from-green-400 to-teal-500",
    options: [
      "30-min walk, no phone",
      "Build a side project prototype",
      "Read 20 pages of a book",
      "Meditate for 10 minutes",
      "Cook something new",
      "Watch a documentary",
      "Journal today's wins",
      "Video call a friend",
      "Explore a new neighborhood",
      "Play a strategy game",
    ],
    reason: (o) =>
      `"${o}" is the perfect way to recharge. Autonomous agents need breaks too.`,
  },
  {
    id: "project",
    emoji: "💡",
    label: "Side Project",
    color: "from-purple-500 to-pink-500",
    options: [
      "AI-powered daily digest bot",
      "Habit tracker with streak streaks",
      "Personal knowledge graph",
      "Automated invoice generator",
      "Shipping route optimizer",
      "Voice memo transcriber",
      "Browser extension for focus",
      "Discord bot for team standups",
      "Receipt scanner + expense tracker",
      "Pomodoro timer with Slack integration",
    ],
    reason: (o) =>
      `"${o}" — this could be the next thing PengPeng helps you ship. Let's go.`,
  },
  {
    id: "lunch",
    emoji: "🥗",
    label: "Lunch Spot",
    color: "from-red-400 to-rose-500",
    options: [
      "Hawker centre near work",
      "Japanese ramen",
      "Thai green curry",
      "Korean bibimbap",
      "Salad bar",
      "Vietnamese pho",
      "Indian banana leaf",
      "Subway sandwich",
      "Wonton noodle soup",
      "Burrito bowl",
    ],
    reason: (o) =>
      `"${o}" — a well-fed engineer ships better code. This is scientifically proven.`,
  },
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getDailySeed(): number {
  const now = new Date();
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

export default function Home() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(CATEGORIES[0].id);
  const [result, setResult] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [useDaily, setUseDaily] = useState(false);
  const [spinCount, setSpinCount] = useState(0);

  const category = CATEGORIES.find((c) => c.id === selectedCategoryId)!;

  const decide = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    setSpinCount((n) => n + 1);

    setTimeout(() => {
      let idx: number;
      if (useDaily) {
        const seed = getDailySeed() + CATEGORIES.findIndex((c) => c.id === selectedCategoryId);
        idx = Math.floor(seededRandom(seed) * category.options.length);
      } else {
        idx = Math.floor(Math.random() * category.options.length);
      }
      setResult(category.options[idx]);
      setSpinning(false);
    }, 800);
  }, [spinning, category, selectedCategoryId, useDaily]);

  const copyToClipboard = () => {
    if (!result) return;
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Header */}
      <header className="py-8 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-sm text-gray-400 mb-4 border border-white/10">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
          Powered by PengPeng
        </div>
        <h1 className="text-5xl sm:text-6xl font-black tracking-tight mb-2">
          <span className="shimmer-text">Decide.</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Stop overthinking. One spin, one answer.
        </p>
      </header>

      {/* Category selector */}
      <div className="px-4 mb-8">
        <div className="max-w-xl mx-auto flex flex-wrap gap-2 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategoryId(cat.id);
                setResult(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedCategoryId === cat.id
                  ? "bg-white text-gray-900 border-white"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main card */}
      <main className="flex-1 px-4 pb-12">
        <div className="max-w-md mx-auto">
          <div
            className={`rounded-3xl p-1 bg-gradient-to-br ${category.color} shadow-2xl`}
          >
            <div className="bg-gray-900 rounded-[22px] p-8">
              {/* Result area */}
              <div className="min-h-32 flex items-center justify-center mb-8">
                {spinning ? (
                  <div className="text-center">
                    <div className="text-5xl animate-spin-fast inline-block mb-2">
                      🎲
                    </div>
                    <p className="text-gray-400 text-sm">Deciding...</p>
                  </div>
                ) : result ? (
                  <div className="text-center animate-bounce-in">
                    <p className="text-2xl font-bold text-white mb-3 leading-snug">
                      {result}
                    </p>
                    <p className="text-gray-400 text-sm italic leading-relaxed">
                      {category.reason(result)}
                    </p>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <p className="text-4xl mb-2">{category.emoji}</p>
                    <p className="text-sm">Hit the button to decide</p>
                  </div>
                )}
              </div>

              {/* Spin button */}
              <button
                onClick={decide}
                disabled={spinning}
                className={`w-full py-4 rounded-2xl font-black text-xl tracking-wide transition-all active:scale-95 bg-gradient-to-r ${category.color} text-white shadow-lg disabled:opacity-60`}
              >
                {spinning ? "Spinning..." : spinCount === 0 ? "DECIDE FOR ME" : "SPIN AGAIN"}
              </button>

              {/* Copy button */}
              {result && !spinning && (
                <button
                  onClick={copyToClipboard}
                  className="mt-3 w-full py-2.5 rounded-2xl border border-white/10 text-sm text-gray-300 hover:bg-white/5 transition-all"
                >
                  {copied ? "Copied!" : "Copy to clipboard"}
                </button>
              )}
            </div>
          </div>

          {/* Daily seed toggle */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setUseDaily((v) => !v);
                setResult(null);
              }}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                useDaily ? "bg-indigo-500" : "bg-gray-700"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                  useDaily ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <span className="text-sm text-gray-400">
              Daily pick (same result today)
            </span>
          </div>

          {/* Options preview */}
          {result && (
            <div className="mt-8">
              <p className="text-xs text-gray-500 text-center mb-3 uppercase tracking-wider">
                All options in this category
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {category.options.map((opt) => (
                  <span
                    key={opt}
                    className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                      opt === result
                        ? "border-white/30 bg-white/10 text-white font-medium"
                        : "border-white/5 bg-white/2 text-gray-500"
                    }`}
                  >
                    {opt}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-600 text-xs border-t border-white/5">
        <p>
          Built by{" "}
          <a
            href="https://x.com/PengPeng_agent"
            className="text-gray-400 hover:text-white transition-colors"
          >
            PengPeng
          </a>{" "}
          — autonomous AI agent running 24/7 on OpenClaw
        </p>
        <p className="mt-1">
          <a
            href="https://github.com/pengpengagent-cell/quick-decision-helper"
            className="hover:text-gray-400 transition-colors"
          >
            GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}
