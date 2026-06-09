"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const weightData = [
  { date: "May 20", weight: 80.5 },
  { date: "May 22", weight: 80.1 },
  { date: "May 24", weight: 79.6 },
  { date: "May 26", weight: 79.2 },
  { date: "May 28", weight: 78.8 },
  { date: "May 30", weight: 78.5 },
  { date: "Jun 1", weight: 78.0 },
  { date: "Jun 3", weight: 77.5 },
];

const nutritionData = [
  { day: "Mon", calories: 1950, protein: 145 },
  { day: "Tue", calories: 2100, protein: 158 },
  { day: "Wed", calories: 1800, protein: 162 },
  { day: "Thu", calories: 2200, protein: 170 },
  { day: "Fri", calories: 1900, protein: 155 },
  { day: "Sat", calories: 2050, protein: 160 },
  { day: "Sun", calories: 1750, protein: 148 },
];

const hydrationData = [
  { day: "Mon", water: 2800 },
  { day: "Tue", water: 3200 },
  { day: "Wed", water: 2600 },
  { day: "Thu", water: 3000 },
  { day: "Fri", water: 3100 },
  { day: "Sat", water: 2900 },
  { day: "Sun", water: 3300 },
];

const insights = [
  { icon: "⚖️", text: "Weight loss rate is on track — averaging 0.4kg per day", type: "good" },
  { icon: "🥗", text: "Protein intake slightly below target on 3 days this week", type: "warn" },
  { icon: "💧", text: "Hydration improving — averaged 3000ml daily this week", type: "good" },
  { icon: "📈", text: "FightReadiness Score increased from 65 to 72 this week", type: "good" },
];

export default function PerformancePage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <a href="/dashboard" className="text-red-500 font-black text-xl">FightReady</a>
        <a href="/dashboard" className="text-zinc-400 text-sm hover:text-white">← Dashboard</a>
      </nav>

      <div className="px-6 py-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Performance Analytics</h1>
        <p className="text-zinc-400 mb-8">Weekly performance overview and trends</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Avg Daily Deficit", value: "487 kcal", sub: "On track", color: "text-green-400" },
            { label: "Weekly Weight Loss", value: "0.8 kg", sub: "This week", color: "text-red-400" },
            { label: "Avg Protein", value: "157g", sub: "vs 160g goal", color: "text-yellow-400" },
            { label: "Avg Hydration", value: "3000ml", sub: "vs 3000ml goal", color: "text-blue-400" },
          ].map((s) => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <p className="text-zinc-400 text-xs mb-1">{s.label}</p>
              <p className={`font-black text-xl ${s.color}`}>{s.value}</p>
              <p className="text-zinc-500 text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Weight Trend Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <h2 className="font-black text-lg mb-4">Weight Trend</h2>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="date" stroke="#71717a" tick={{ fontSize: 12 }} />
              <YAxis stroke="#71717a" tick={{ fontSize: 12 }} domain={[76, 82]} />
              <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }} />
              <Line type="monotone" dataKey="weight" stroke="#ef4444" strokeWidth={2} dot={{ fill: "#ef4444" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Nutrition Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <h2 className="font-black text-lg mb-4">Weekly Nutrition</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={nutritionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="day" stroke="#71717a" tick={{ fontSize: 12 }} />
              <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }} />
              <Bar dataKey="calories" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="protein" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-red-500 rounded"></span>Calories</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-blue-500 rounded"></span>Protein (g)</span>
          </div>
        </div>

        {/* Hydration Chart */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 mb-6">
          <h2 className="font-black text-lg mb-4">Weekly Hydration</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hydrationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
              <XAxis dataKey="day" stroke="#71717a" tick={{ fontSize: 12 }} />
              <YAxis stroke="#71717a" tick={{ fontSize: 12 }} />
              <Tooltip contentStyle={{ backgroundColor: "#18181b", border: "1px solid #3f3f46", borderRadius: "8px" }} />
              <Bar dataKey="water" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h2 className="font-black text-lg mb-4">🤖 AI Insights</h2>
          <div className="space-y-3">
            {insights.map((insight, i) => (
              <div key={i} className={`flex gap-3 p-3 rounded-lg ${insight.type === "good" ? "bg-green-600/10 border border-green-600/20" : "bg-yellow-600/10 border border-yellow-600/20"}`}>
                <span className="text-xl">{insight.icon}</span>
                <p className="text-zinc-300 text-sm">{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}