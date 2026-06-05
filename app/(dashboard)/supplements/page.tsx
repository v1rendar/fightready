"use client";
import { useState } from "react";

const defaultSupplements = [
  { id: 1, name: "Electrolytes", dosage: "1 scoop", timing: "07:00 AM", frequency: "Daily", category: "Hydration" },
  { id: 2, name: "Whey Protein", dosage: "30g", timing: "08:00 AM", frequency: "Post-workout", category: "Recovery" },
  { id: 3, name: "Creatine", dosage: "5g", timing: "01:00 PM", frequency: "Daily", category: "Performance" },
  { id: 4, name: "Vitamin D", dosage: "2000 IU", timing: "01:00 PM", frequency: "Daily", category: "Health" },
  { id: 5, name: "Fish Oil", dosage: "2 caps", timing: "06:00 PM", frequency: "Daily", category: "Health" },
  { id: 6, name: "Magnesium", dosage: "400mg", timing: "08:00 PM", frequency: "Daily", category: "Recovery" },
  { id: 7, name: "Zinc", dosage: "25mg", timing: "08:00 PM", frequency: "Daily", category: "Health" },
];

const categoryColors: Record<string, string> = {
  Hydration: "bg-blue-600/20 text-blue-400 border-blue-600/30",
  Recovery: "bg-green-600/20 text-green-400 border-green-600/30",
  Performance: "bg-red-600/20 text-red-400 border-red-600/30",
  Health: "bg-purple-600/20 text-purple-400 border-purple-600/30",
};

export default function SupplementsPage() {
  const [supplements, setSupplements] = useState(defaultSupplements);
  const [showAdd, setShowAdd] = useState(false);
  const [taken, setTaken] = useState<number[]>([]);
  const [newSupp, setNewSupp] = useState({ name: "", dosage: "", timing: "", category: "Health" });

  const toggleTaken = (id: number) => {
    setTaken((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const handleAdd = () => {
    if (!newSupp.name || !newSupp.dosage || !newSupp.timing) return;
    setSupplements([...supplements, { ...newSupp, id: Date.now(), frequency: "Daily" }]);
    setNewSupp({ name: "", dosage: "", timing: "", category: "Health" });
    setShowAdd(false);
  };

  const handleDelete = (id: number) => {
    setSupplements(supplements.filter((s) => s.id !== id));
  };

  const sorted = [...supplements].sort((a, b) => a.timing.localeCompare(b.timing));
  const takenCount = taken.length;
  const totalCount = supplements.length;

  return (
    <main className="bg-black text-white min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <a href="/dashboard" className="text-red-500 font-black text-xl">FightReady</a>
        <a href="/dashboard" className="text-zinc-400 text-sm hover:text-white">← Dashboard</a>
      </nav>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-black">Supplement Planner</h1>
          <button
            onClick={() => setShowAdd(!showAdd)}
            className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-bold transition"
          >
            + Add
          </button>
        </div>
        <p className="text-zinc-400 mb-8">Your daily supplement schedule</p>

        {/* Progress */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold">Today's Progress</span>
            <span className="text-red-400 font-black">{takenCount}/{totalCount} taken</span>
          </div>
          <div className="bg-zinc-800 rounded-full h-3">
            <div
              className="bg-red-500 h-3 rounded-full transition-all"
              style={{ width: `${totalCount ? (takenCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Add Form */}
        {showAdd && (
          <div className="bg-zinc-900 border border-red-600/30 rounded-xl p-5 mb-6">
            <h3 className="font-bold mb-4">Add Supplement</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                placeholder="Name (e.g. Creatine)"
                value={newSupp.name}
                onChange={(e) => setNewSupp({ ...newSupp, name: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 text-sm"
              />
              <input
                placeholder="Dosage (e.g. 5g)"
                value={newSupp.dosage}
                onChange={(e) => setNewSupp({ ...newSupp, dosage: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 text-sm"
              />
              <input
                placeholder="Time (e.g. 07:00 AM)"
                value={newSupp.timing}
                onChange={(e) => setNewSupp({ ...newSupp, timing: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 text-sm"
              />
              <select
                value={newSupp.category}
                onChange={(e) => setNewSupp({ ...newSupp, category: e.target.value })}
                className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-red-500 text-sm"
              >
                <option>Health</option>
                <option>Recovery</option>
                <option>Performance</option>
                <option>Hydration</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={handleAdd} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-bold transition">Save</button>
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-zinc-700 rounded-lg text-sm font-bold transition">Cancel</button>
            </div>
          </div>
        )}

        {/* Schedule */}
        <div className="space-y-3">
          {sorted.map((s) => (
            <div key={s.id} className={`bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex items-center gap-4 ${taken.includes(s.id) ? "opacity-50" : ""}`}>
              <button
                onClick={() => toggleTaken(s.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${taken.includes(s.id) ? "bg-green-500 border-green-500" : "border-zinc-600 hover:border-red-500"}`}
              >
                {taken.includes(s.id) && <span className="text-white text-xs">✓</span>}
              </button>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold">{s.name}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${categoryColors[s.category] || categoryColors.Health}`}>
                    {s.category}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm">{s.dosage} · {s.frequency}</p>
              </div>
              <div className="text-right">
                <p className="text-red-400 font-bold text-sm">{s.timing}</p>
                <button
                  onClick={() => handleDelete(s.id)}
                  className="text-zinc-600 hover:text-red-400 text-xs mt-1 transition"
                >
                  remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}