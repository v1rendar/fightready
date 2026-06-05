"use client";
import { useState } from "react";

const stages = [
  {
    week: "8 Weeks Out",
    title: "Base Building",
    color: "border-zinc-600",
    badge: "bg-zinc-700",
    tasks: [
      "Establish baseline weight and measurements",
      "Set up nutrition targets and meal plan",
      "Begin conditioning training 4x per week",
      "Start supplement protocol",
      "Hydration baseline — 3L water daily",
    ],
    tip: "Focus on building aerobic base and establishing healthy habits. No aggressive cutting yet.",
  },
  {
    week: "6 Weeks Out",
    title: "Weight Management",
    color: "border-blue-600",
    badge: "bg-blue-700",
    tasks: [
      "Begin gradual caloric deficit (200-300 kcal)",
      "Increase cardio sessions",
      "Track weight daily — aim for 0.5kg/week loss",
      "Adjust macros: higher protein, lower carbs",
      "Start fight-specific drills",
    ],
    tip: "Slow and steady weight loss preserves muscle. Avoid crash dieting at this stage.",
  },
  {
    week: "4 Weeks Out",
    title: "Performance Optimization",
    color: "border-yellow-600",
    badge: "bg-yellow-700",
    tasks: [
      "Peak training intensity this week",
      "Fine-tune weight — should be 3-4kg over",
      "Sparring sessions ramp up",
      "Mental preparation begins",
      "Review fight footage and game plan",
    ],
    tip: "Your hardest training weeks. Fuel well, sleep 8+ hours, and trust your preparation.",
  },
  {
    week: "2 Weeks Out",
    title: "Final Adjustments",
    color: "border-orange-600",
    badge: "bg-orange-700",
    tasks: [
      "Begin reducing training volume",
      "Weight should be 1-2kg over target",
      "Start water loading protocol",
      "Confirm weight cut strategy with coach",
      "Prepare fight week nutrition plan",
    ],
    tip: "Start tapering. Reduce sparring intensity to avoid injuries before fight day.",
  },
  {
    week: "Fight Week",
    title: "Competition Preparation",
    color: "border-red-600",
    badge: "bg-red-700",
    tasks: [
      "Day -7: Normal training, begin water manipulation",
      "Day -5: Reduce carbs, increase water intake",
      "Day -3: Light training, sauna if needed",
      "Day -2: Rest, begin final cut",
      "Day -1: Weigh-in prep, rehydration plan ready",
      "Weigh-In Day: Make weight, begin rehydration",
      "Fight Day: Perform at your best 🥊",
    ],
    tip: "Stay calm, trust your preparation. Your fight camp brought you here.",
  },
];

export default function FightCampPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [fightDate, setFightDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [savedDate, setSavedDate] = useState("");

  const daysUntilFight = savedDate
    ? Math.ceil((new Date(savedDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const handleSaveDate = () => {
    setSavedDate(fightDate);
    setShowDatePicker(false);
  };

  return (
    <main className="bg-black text-white min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <a href="/dashboard" className="text-red-500 font-black text-xl">FightReady</a>
        <a href="/dashboard" className="text-zinc-400 text-sm hover:text-white">← Dashboard</a>
      </nav>

      <div className="px-6 py-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Fight Camp Planner</h1>
        <p className="text-zinc-400 mb-8">Your structured 8-week preparation timeline</p>

        {/* Fight Date Banner */}
        <div className="bg-red-600/10 border border-red-600/30 rounded-xl p-4 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-xs font-bold mb-1">🥊 NEXT FIGHT</p>
              <p className="font-black text-lg">
                {savedDate
                  ? new Date(savedDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })
                  : "Fight Date: TBD"}
              </p>
              {daysUntilFight !== null && (
                <p className="text-red-400 text-sm mt-1">{daysUntilFight} days to fight day</p>
              )}
            </div>
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-bold transition"
            >
              {savedDate ? "Change Date" : "Set Fight Date"}
            </button>
          </div>

          {showDatePicker && (
            <div className="mt-4 flex gap-3">
              <input
                type="date"
                value={fightDate}
                onChange={(e) => setFightDate(e.target.value)}
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-red-500"
              />
              <button
                onClick={handleSaveDate}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold transition"
              >
                Save
              </button>
              <button
                onClick={() => setShowDatePicker(false)}
                className="px-4 py-2 border border-zinc-700 rounded-lg font-bold transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Timeline */}
        <div className="space-y-4">
          {stages.map((stage, i) => (
            <div key={i} className={`border ${stage.color} rounded-xl overflow-hidden`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-zinc-900/50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className={`${stage.badge} text-white text-xs px-3 py-1 rounded-full font-bold`}>
                    {stage.week}
                  </span>
                  <span className="font-black">{stage.title}</span>
                </div>
                <span className="text-zinc-400">{open === i ? "▲" : "▼"}</span>
              </button>

              {open === i && (
                <div className="px-5 pb-5 bg-zinc-900/30">
                  <ul className="space-y-2 mb-4">
                    {stage.tasks.map((task, j) => (
                      <li key={j} className="flex gap-2 text-sm text-zinc-300">
                        <span className="text-red-400 mt-0.5">✓</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-zinc-800 rounded-lg p-3">
                    <p className="text-xs text-red-400 font-bold mb-1">💡 COACH TIP</p>
                    <p className="text-zinc-300 text-sm">{stage.tip}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}