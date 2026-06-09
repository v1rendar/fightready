"use client";
import Link from "next/link";

const features = [
  { title: "Weight Cut Tracker", desc: "Track daily weight and predict weigh-in outcomes with AI insights.", icon: "⚖️" },
  { title: "AI Nutrition Coach", desc: "Generate personalized meal plans based on your diet and fight camp stage.", icon: "🥗" },
  { title: "Hydration Manager", desc: "Monitor water and electrolyte intake with smart daily goals.", icon: "💧" },
  { title: "Supplement Planner", desc: "Optimize supplement timing with a personalized daily schedule.", icon: "💊" },
  { title: "Fight Camp Planner", desc: "Structured 8-week camp timeline from base building to fight week.", icon: "🗓️" },
  { title: "Fight Week Assistant", desc: "Day-by-day guidance from 7 days out to fight day.", icon: "🥊" },
  { title: "AI Coach", desc: "Conversational AI that knows your weight, nutrition, and fight date.", icon: "🤖" },
  { title: "Performance Analytics", desc: "Weekly and monthly reports with trend analysis and insights.", icon: "📊" },
];

const testimonials = [
  { name: "Marcus Silva", sport: "MMA Fighter", text: "FightReady helped me cut 8kg safely for my last fight. The AI insights kept me on track the whole camp." },
  { name: "Priya Nair", sport: "Muay Thai", text: "The meal planner is incredible. It knows my vegetarian diet and gives me high-protein options every day." },
  { name: "Jake Thornton", sport: "Kickboxer", text: "I've tried every fitness app out there. Nothing comes close to FightReady for combat sports prep." },
];

const pricing = [
  { tier: "Free", price: "₹0", features: ["Weight Tracking", "Basic Analytics", "7-day history"] },
  { tier: "Pro", price: "₹799/mo", features: ["AI Coach", "Meal Planning", "Fight Camp Planning", "Hydration Tracking", "Supplement Planner", "Full Analytics"], highlight: true },
  { tier: "Coach", price: "₹1999/mo", features: ["Everything in Pro", "Multiple Athletes", "Team Dashboard", "Athlete Monitoring", "Performance Reports"] },
];

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 sticky top-0 bg-black/90 backdrop-blur z-50">
        <span className="text-xl font-bold text-red-500 tracking-tight">FightReady</span>
        <div className="flex gap-3">
          <Link href="/dashboard" className="px-4 py-2 text-sm text-zinc-300 hover:text-white transition">Sign In</Link>
          <Link href="/dashboard" className="px-4 py-2 text-sm bg-red-600 hover:bg-red-500 rounded-lg font-semibold transition">Start Free</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="text-center px-6 py-24 max-w-4xl mx-auto">
        <div className="inline-block px-3 py-1 bg-red-600/20 text-red-400 text-xs rounded-full mb-6 border border-red-600/30">Built for Combat Athletes</div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          Make Weight.<br />Fuel Performance.<br /><span className="text-red-500">Fight Ready.</span>
        </h1>
        <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
          The all-in-one fight camp platform for combat athletes. Track weight cuts, nutrition, hydration, supplements, and fight preparation with AI-powered insights.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/dashboard" className="px-8 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-bold text-lg transition">Start Free</Link>
          <button className="px-8 py-3 border border-zinc-700 hover:border-zinc-500 rounded-lg font-bold text-lg transition">Watch Demo</button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12">Everything You Need to <span className="text-red-500">Dominate Camp</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-red-600/50 transition">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-20 bg-zinc-950">
        <h2 className="text-3xl font-black text-center mb-12">Trusted by <span className="text-red-500">Combat Athletes</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <p className="text-zinc-300 mb-4 italic">"{t.text}"</p>
              <div>
                <p className="font-bold text-white">{t.name}</p>
                <p className="text-red-400 text-sm">{t.sport}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12">Simple <span className="text-red-500">Pricing</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricing.map((p) => (
            <div key={p.tier} className={`rounded-xl p-6 border ${p.highlight ? "border-red-600 bg-red-600/10" : "border-zinc-800 bg-zinc-900"}`}>
              <h3 className="font-black text-xl mb-1">{p.tier}</h3>
              <p className="text-3xl font-black text-red-400 mb-6">{p.price}</p>
              <ul className="space-y-2 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="text-zinc-300 text-sm flex gap-2"><span className="text-red-400">✓</span>{f}</li>
                ))}
              </ul>
              <Link href="/dashboard" className={`block text-center py-2 rounded-lg font-bold transition ${p.highlight ? "bg-red-600 hover:bg-red-500" : "border border-zinc-700 hover:border-zinc-500"}`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 px-6 py-8 text-center text-zinc-500 text-sm">
        <p className="text-red-500 font-bold text-lg mb-2">FightReady</p>
        <p>© 2024 FightReady. Built for combat athletes worldwide.</p>
      </footer>
    </main>
  );
}