"use client";
import { useState } from "react";

const meals = [
  {
    type: "Breakfast",
    time: "07:30 AM",
    items: ["4 egg whites + 1 whole egg scrambled", "1 cup oats with berries", "1 banana"],
    calories: 480,
    protein: 32,
    carbs: 68,
    fat: 8,
  },
  {
    type: "Lunch",
    time: "01:00 PM",
    items: ["200g grilled chicken breast", "1 cup brown rice", "Mixed salad with olive oil"],
    calories: 620,
    protein: 48,
    carbs: 55,
    fat: 12,
  },
  {
    type: "Snack",
    time: "04:00 PM",
    items: ["Whey protein shake", "1 apple", "10 almonds"],
    calories: 280,
    protein: 28,
    carbs: 24,
    fat: 8,
  },
  {
    type: "Dinner",
    time: "07:30 PM",
    items: ["200g salmon", "2 cups roasted vegetables", "1/2 cup quinoa"],
    calories: 520,
    protein: 42,
    carbs: 38,
    fat: 16,
  },
];

const targets = { calories: 2200, protein: 160, carbs: 220, fat: 60 };

export default function NutritionPage() {
  const [loggedMeals, setLoggedMeals] = useState<number[]>([]);

  const toggleMeal = (i: number) => {
    setLoggedMeals((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  };

  const logged = meals.filter((_, i) => loggedMeals.includes(i));
  const totals = logged.reduce(
    (acc, m) => ({
      calories: acc.calories + m.calories,
      protein: acc.protein + m.protein,
      carbs: acc.carbs + m.carbs,
      fat: acc.fat + m.fat,
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 }
  );

  const pct = (val: number, target: number) =>
    Math.min(Math.round((val / target) * 100), 100);

  return (
    <main className="bg-black text-white min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <a href="/dashboard" className="text-red-500 font-black text-xl">FightReady</a>
        <a href="/dashboard" className="text-zinc-400 text-sm hover:text-white">← Dashboard</a>
      </nav>

      <div className="px-6 py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-black mb-2">Nutrition</h1>
        <p className="text-zinc-400 mb-8">Track your daily calories and macros</p>

        {/* Macro Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Calories", val: totals.calories, target: targets.calories, unit: "kcal", color: "bg-red-500" },
            { label: "Protein", val: totals.protein, target: targets.protein, unit: "g", color: "bg-blue-500" },
            { label: "Carbs", val: totals.carbs, target: targets.carbs, unit: "g", color: "bg-yellow-500" },
            { label: "Fat", val: totals.fat, target: targets.fat, unit: "g", color: "bg-green-500" },
          ].map((m) => (
            <div key={m.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <p className="text-zinc-400 text-xs mb-1">{m.label}</p>
              <p className="font-black text-xl">{m.val}<span className="text-zinc-500 text-sm font-normal">/{m.target}{m.unit}</span></p>
              <div className="bg-zinc-800 rounded-full h-2 mt-2">
                <div className={`${m.color} h-2 rounded-full transition-all`} style={{ width: `${pct(m.val, m.target)}%` }} />
              </div>
              <p className="text-zinc-500 text-xs mt-1">{pct(m.val, m.target)}% of goal</p>
            </div>
          ))}
        </div>

        {/* AI Insight */}
        <div className="bg-zinc-900 border border-red-600/20 rounded-xl p-5 mb-8">
          <p className="text-red-400 text-xs font-bold mb-1">🤖 AI INSIGHT</p>
          <p className="text-zinc-300">
            {totals.protein < targets.protein * 0.5
              ? "Protein intake is low today. Add a protein shake or chicken to hit your targets."
              : totals.calories > targets.calories * 0.9
              ? "You're close to your calorie target. Keep portions controlled for dinner."
              : "Great progress! Stay consistent with your meal plan to support your weight cut."}
          </p>
        </div>

        {/* Meal Plan */}
        <h2 className="text-xl font-black mb-4">Today's Meal Plan</h2>
        <div className="space-y-4">
          {meals.map((meal, i) => (
            <div key={i} className={`bg-zinc-900 border rounded-xl p-5 transition ${loggedMeals.includes(i) ? "border-green-600/50 opacity-70" : "border-zinc-800"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div>
                    <h3 className="font-black">{meal.type}</h3>
                    <p className="text-zinc-500 text-xs">{meal.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-red-400 font-bold text-sm">{meal.calories} kcal</span>
                  <button
                    onClick={() => toggleMeal(i)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${loggedMeals.includes(i) ? "bg-green-600 text-white" : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"}`}
                  >
                    {loggedMeals.includes(i) ? "✓ Logged" : "Log Meal"}
                  </button>
                </div>
              </div>

              <ul className="space-y-1 mb-3">
                {meal.items.map((item, j) => (
                  <li key={j} className="text-zinc-400 text-sm flex gap-2">
                    <span className="text-zinc-600">•</span>{item}
                  </li>
                ))}
              </ul>

              <div className="flex gap-4 text-xs text-zinc-500">
                <span>Protein: <span className="text-white">{meal.protein}g</span></span>
                <span>Carbs: <span className="text-white">{meal.carbs}g</span></span>
                <span>Fat: <span className="text-white">{meal.fat}g</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}