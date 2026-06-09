"use client";
import { useState } from "react";

const pastFights = [
  { opponent: "Sudhir Saxena", date: "Jul 18, 2025", result: "W", method: "Decision", round: 2, weightClass: "Heavyweight +94kg", event: "WAKO Kickboxing Nationals" },
  { opponent: "Arjun Mehta", date: "Mar 15, 2026", result: "W", method: "KO", round: 2, weightClass: "Welterweight", event: "Fight Night Mumbai" },
  { opponent: "Carlos Rivera", date: "Jan 8, 2026", result: "W", method: "Decision", round: 3, weightClass: "Welterweight", event: "Regional Championship" },
  { opponent: "David Kim", date: "Oct 20, 2025", result: "L", method: "Decision", round: 3, weightClass: "Welterweight", event: "Open Circuit" },
  { opponent: "Rahul Sharma", date: "Aug 5, 2025", result: "W", method: "TKO", round: 1, weightClass: "Welterweight", event: "Fight Night Delhi" },
];

export default function FightsPage() {
  const [showAdd, setShowAdd] = useState(false);
  const [fights, setFights] = useState(pastFights);
  const [newFight, setNewFight] = useState({ opponent: "", date: "", result: "W", method: "", weightClass: "Welterweight", event: "" });

  const wins = fights.filter((f) => f.result === "W").length;
  const losses = fights.filter((f) => f.result === "L").length;

  const handleAdd = () => {
    if (!newFight.opponent || !newFight.date) return;
    setFights([{ ...newFight, round: 3 }, ...fights]);
    setNewFight({ opponent: "", date: "", result: "W", method: "", weightClass: "Welterweight", event: "" });
    setShowAdd(false);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <a href="/dashboard" className="text-red-500 font-black text-xl">FightReady</a>
        <a href="/dashboard" className="text-zinc-400 text-sm hover:text-white">← Dashboard</a>
      </nav>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-black">Fight Record</h1>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-bold transition"
          >
            + Add Fight
          </button>
        </div>
        <p className="text-zinc-400 mb-8">Your competition history and career record</p>

        {/* Record */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
            <p className="text-4xl font-black text-green-400">{wins}</p>
            <p className="text-zinc-400 text-sm mt-1">Wins</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
            <p className="text-4xl font-black text-red-400">{losses}</p>
            <p className="text-zinc-400 text-sm mt-1">Losses</p>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-center">
            <p className="text-4xl font-black text-white">{fights.length}</p>
            <p className="text-zinc-400 text-sm mt-1">Total</p>
          </div>
        </div>

        {/* Win Rate */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-8">
          <div className="flex justify-between mb-2">
            <span className="font-bold">Win Rate</span>
            <span className="text-green-400 font-black">{Math.round((wins / fights.length) * 100)}%</span>
          </div>
          <div className="bg-zinc-800 rounded-full h-3">
            <div className="bg-green-500 h-3 rounded-full" style={{ width: `${(wins / fights.length) * 100}%` }} />
          </div>
        </div>

        {/* Add Fight Form */}
        {showAdd && (
          <div className="bg-zinc-900 border border-red-600/30 rounded-xl p-5 mb-6">
            <h3 className="font-bold mb-4">Add Fight</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                placeholder="Opponent name"
                value={newFight.opponent}
                onChange={(e) => setNewFight({ ...newFight, opponent: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 text-sm"
              />
              <input
                type="date"
                value={newFight.date}
                onChange={(e) => setNewFight({ ...newFight, date: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500 text-sm"
              />
              <select
                value={newFight.result}
                onChange={(e) => setNewFight({ ...newFight, result: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500 text-sm"
              >
                <option value="W">Win</option>
                <option value="L">Loss</option>
                <option value="D">Draw</option>
              </select>
              <input
                placeholder="Method (KO, Decision, TKO)"
                value={newFight.method}
                onChange={(e) => setNewFight({ ...newFight, method: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 text-sm"
              />
              <input
                placeholder="Event name"
                value={newFight.event}
                onChange={(e) => setNewFight({ ...newFight, event: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 text-sm col-span-2"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={handleAdd} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-bold transition">Save</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-zinc-700 rounded-lg text-sm font-bold transition">Cancel</button>
            </div>
          </div>
        )}

        {/* Fight List */}
        <div className="space-y-3">
          {fights.map((fight, i) => (
            <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-lg ${fight.result === "W" ? "bg-green-600" : fight.result === "L" ? "bg-red-600" : "bg-zinc-600"}`}>
                    {fight.result}
                  </span>
                  <div>
                    <p className="font-black text-lg">vs {fight.opponent}</p>
                    <p className="text-zinc-500 text-xs">{fight.event}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-zinc-400 text-sm">{fight.date}</p>
                  <p className="text-red-400 text-xs font-bold mt-1">{fight.method} · R{fight.round}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="text-xs px-2 py-1 bg-zinc-800 rounded-full text-zinc-400">{fight.weightClass}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}