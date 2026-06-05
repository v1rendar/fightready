import Link from "next/link";

const stats = [
  { label: "Current Weight", value: "78.5 kg", sub: "Logged today" },
  { label: "Target Weight", value: "74.0 kg", sub: "Weigh-in goal" },
  { label: "Weight to Cut", value: "4.5 kg", sub: "Remaining" },
  { label: "Days to Weigh-In", value: "18", sub: "Stay on track" },
  { label: "Predicted Weight", value: "74.2 kg", sub: "AI prediction" },
  { label: "FightReadiness™", value: "72/100", sub: "Good" },
];

const modules = [
  { label: "Weight Tracker", href: "/weight", icon: "⚖️", desc: "Log and track daily weight" },
  { label: "Nutrition", href: "/nutrition", icon: "🥗", desc: "Calories and macros" },
  { label: "Hydration", href: "/hydration", icon: "💧", desc: "Water and electrolytes" },
  { label: "Supplements", href: "/supplements", icon: "💊", desc: "Daily supplement schedule" },
  { label: "Fight Camp", href: "/fight-camp", icon: "🗓️", desc: "8-week camp timeline" },
  { label: "AI Coach", href: "/ai-coach", icon: "🤖", desc: "Ask your AI coach" },
  { label: "Analytics", href: "/performance", icon: "📊", desc: "Performance reports" },
  { label: "Fights", href: "/fights", icon: "🥊", desc: "Competition history" },
];

export default function DashboardPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <span className="text-xl font-black text-red-500">FightReady</span>
        <span className="text-zinc-400 text-sm">Welcome back, Athlete 👊</span>
      </nav>

      <div className="px-6 py-8 max-w-6xl mx-auto">
        {/* Page Title */}
        <h1 className="text-3xl font-black mb-2">Dashboard</h1>
        <p className="text-zinc-400 mb-8">Here's your fight camp overview</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {stats.map((s) => (
            <div key={s.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <p className="text-zinc-400 text-xs mb-1">{s.label}</p>
              <p className="text-white font-black text-xl">{s.value}</p>
              <p className="text-red-400 text-xs mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* FightReadiness Score */}
        <div className="bg-zinc-900 border border-red-600/30 rounded-xl p-6 mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl font-black mb-1">FightReadiness Score™</h2>
              <p className="text-zinc-400 text-sm">Based on weight, nutrition, hydration, sleep and training</p>
            </div>
            <div className="text-center">
              <div className="text-6xl font-black text-red-500">72</div>
              <div className="text-green-400 font-bold text-sm mt-1">GOOD</div>
            </div>
          </div>
          <div className="mt-4 bg-zinc-800 rounded-full h-3">
            <div className="bg-red-500 h-3 rounded-full" style={{ width: "72%" }}></div>
          </div>
          <div className="flex justify-between text-xs text-zinc-500 mt-1">
            <span>Needs Improvement</span>
            <span>Moderate</span>
            <span>Good</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Modules Grid */}
        <h2 className="text-xl font-black mb-4">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modules.map((m) => (
            <Link key={m.label} href={m.href} className="bg-zinc-900 border border-zinc-800 hover:border-red-600/50 rounded-xl p-5 transition group">
              <div className="text-3xl mb-3">{m.icon}</div>
              <h3 className="font-bold text-white group-hover:text-red-400 transition">{m.label}</h3>
              <p className="text-zinc-500 text-xs mt-1">{m.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}