"use client";
import { useState } from "react";

const goal = 3000; // ml

const quickAdd = [250, 500, 750, 1000];

export default function HydrationPage() {
  const [intake, setIntake] = useState(0);
  const [custom, setCustom] = useState("");
  const [log, setLog] = useState<{ amount: number; time: string }[]>([]);

  const add = (amount: number) => {
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    setIntake((prev) => prev + amount);
    setLog((prev) => [{ amount, time }, ...prev]);
  };

  const handleCustom = () => {
    const val = parseInt(custom);
    if (!val || val <= 0) return;
    add(val);
    setCustom("");
  };

  const pct = Math.min(Math.round((intake / goal) * 100), 100);

  const getStatus = () => {
    if (pct >= 100) return { label: "Target Reached! 🎉", color: "text-green-400" };
    if (pct >= 75) return { label: "Almost there!", color: "text-yellow-400" };
    if (pct >= 50) return { label: "Halfway there", color: "text-orange-400" };
    return { label: "Increase fluid intake today", color: "text-red-400" };
  };

  const status = getStatus();

  return (
    <main className="bg-black text-white min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <a href="/dashboard" className="text-red-500 font-black text-xl">FightReady</a>
        <a href="/dashboard" className="text-zinc-400 text-sm hover:text-white">← Dashboard</a>
      </nav>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Hydration Manager</h1>
        <p className="text-zinc-400 mb-8">Track your daily water and electrolyte intake</p>

        {/* Big Progress Ring */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-48 h-48 mb-4">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#27272a" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="42" fill="none"
                stroke="#ef4444" strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - pct / 100)}`}
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black">{pct}%</span>
              <span className="text-zinc-400 text-sm">{intake}ml / {goal}ml</span>
            </div>
          </div>
          <p className={`font-bold text-lg ${status.color}`}>{status.label}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className="text-zinc-400 text-xs mb-1">Consumed</p>
            <p className="font-black text-xl text-blue-400">{intake}ml</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className="text-zinc-400 text-xs mb-1">Remaining</p>
            <p className="font-black text-xl text-red-400">{Math.max(goal - intake, 0)}ml</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 text-center">
            <p className="text-zinc-400 text-xs mb-1">Daily Goal</p>
            <p className="font-black text-xl text-zinc-300">{goal}ml</p>
          </div>
        </div>

        {/* Quick Add */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-6">
          <h2 className="font-bold mb-4">Quick Add</h2>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {quickAdd.map((amount) => (
              <button
                key={amount}
                onClick={() => add(amount)}
                className="py-3 bg-zinc-800 hover:bg-red-600 border border-zinc-700 hover:border-red-500 rounded-xl font-bold text-sm transition"
              >
                {amount}ml
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <input
              type="number"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Custom amount (ml)"
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
            />
            <button
              onClick={handleCustom}
              className="px-5 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-zinc-900 border border-red-600/20 rounded-xl p-5 mb-6">
          <p className="text-red-400 text-xs font-bold mb-1">🤖 AI INSIGHT</p>
          <p className="text-zinc-300">
            {pct >= 100
              ? "Excellent hydration today! Your performance and recovery will benefit greatly."
              : pct >= 50
              ? "Good progress. Keep sipping water consistently through the day."
              : "You're behind on hydration. Drink 500ml now and set reminders every hour."}
          </p>
        </div>

        {/* Log */}
        {log.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
            <h2 className="font-bold mb-4">Today's Log</h2>
            <div className="space-y-2">
              {log.map((entry, i) => (
                <div key={i} className="flex justify-between text-sm py-2 border-b border-zinc-800 last:border-0">
                  <span className="text-blue-400 font-bold">+{entry.amount}ml</span>
                  <span className="text-zinc-500">{entry.time}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}