"use client";
import { useState } from "react";

const mockWeightData = [
  { date: "May 20", weight: 80.5 },
  { date: "May 22", weight: 80.1 },
  { date: "May 24", weight: 79.6 },
  { date: "May 26", weight: 79.2 },
  { date: "May 28", weight: 78.8 },
  { date: "May 30", weight: 78.5 },
];

export default function WeightPage() {
  const [weight, setWeight] = useState("");
  const [logs, setLogs] = useState(mockWeightData);

  const handleAdd = () => {
    if (!weight) return;
    const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
    setLogs([...logs, { date: today, weight: parseFloat(weight) }]);
    setWeight("");
  };

  const target = 74.0;
  const current = logs[logs.length - 1]?.weight ?? 0;
  const remaining = (current - target).toFixed(1);

  return (
    <main className="bg-black text-white min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <a href="/dashboard" className="text-red-500 font-black text-xl">FightReady</a>
        <a href="/dashboard" className="text-zinc-400 text-sm hover:text-white">← Dashboard</a>
      </nav>

      <div className="px-6 py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Weight Tracker</h1>
        <p className="text-zinc-400 mb-8">Track your daily weight and monitor cut progress</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-xs mb-1">Current Weight</p>
            <p className="text-white font-black text-2xl">{current} kg</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-zinc-400 text-xs mb-1">Target Weight</p>
            <p className="text-white font-black text-2xl">{target} kg</p>
          </div>
          <div className="bg-zinc-900 border border-red-600/30 rounded-xl p-4">
            <p className="text-zinc-400 text-xs mb-1">Still to Cut</p>
            <p className="text-red-400 font-black text-2xl">{remaining} kg</p>
          </div>
        </div>

        {/* Log Weight */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-8">
          <h2 className="font-bold mb-4">Log Today's Weight</h2>
          <div className="flex gap-3">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Enter weight in kg"
              className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500"
            />
            <button
              onClick={handleAdd}
              className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold transition"
            >
              Log
            </button>
          </div>
        </div>

        {/* AI Insight */}
        <div className="bg-zinc-900 border border-red-600/20 rounded-xl p-5 mb-8">
          <p className="text-red-400 text-xs font-bold mb-1">🤖 AI INSIGHT</p>
          <p className="text-zinc-300">Current pace suggests you will reach target weight 2 days before weigh-in. Keep maintaining a 0.3–0.5 kg daily deficit.</p>
        </div>

        {/* Weight Log Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="font-bold mb-4">Weight History</h2>
          <div className="space-y-3">
            {[...logs].reverse().map((log, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
                <span className="text-zinc-400 text-sm">{log.date}</span>
                <span className="font-bold">{log.weight} kg</span>
                <span className={`text-xs ${log.weight <= target ? "text-green-400" : "text-red-400"}`}>
                  {log.weight <= target ? "✓ On target" : `${(log.weight - target).toFixed(1)} kg over`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}