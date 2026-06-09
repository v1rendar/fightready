"use client";
import { useState } from "react";

const suggestions = [
  "I am 3kg over with 10 days remaining",
  "What should I eat after weigh-ins?",
  "How much protein do I need daily?",
  "What's the best way to cut water weight safely?",
  "How do I recover between training sessions?",
];

type Message = {
  role: "user" | "ai";
  text: string;
};

const aiResponses: Record<string, string> = {
  default: "As your AI Fight Coach, I recommend focusing on your nutrition and hydration targets today. Make sure you're hitting your protein goals and staying within your caloric deficit. Would you like specific advice on any area?",
  protein: "For combat athletes cutting weight, aim for 2.2-2.5g of protein per kg of bodyweight. With a target weight of 74kg, that's around 163-185g of protein daily. Prioritize lean sources like chicken breast, egg whites, and whey protein.",
  weight: "With 10 days remaining and 3kg to cut, you need a steady approach. Aim for 0.3kg per day through diet (500 kcal deficit) and light cardio. Avoid aggressive water cutting until the final 24-48 hours. Monitor your energy levels closely.",
  "weigh-in": "Post weigh-in rehydration is critical. In the first 2 hours: drink 500ml of electrolyte solution, eat easily digestible carbs (white rice, banana), and avoid high-fat foods. Over the next 4-6 hours gradually increase food and fluid intake to restore glycogen and muscle fullness.",
  water: "Safe water cutting in the final 24-48 hours: reduce water intake to 500ml, use a sauna or hot bath for 15-20 minute sessions, wear a sweat suit during light activity. Never cut more than 5% of bodyweight through dehydration. Rehydrate immediately after weigh-ins.",
  recover: "Recovery between sessions: prioritize 8+ hours of sleep, consume 30-40g protein within 30 minutes post-training, use contrast showers (hot/cold), and consider magnesium supplementation before bed. Active recovery like light walking or stretching on rest days helps too.",
};

function getAIResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("protein")) return aiResponses.protein;
  if (lower.includes("3kg") || lower.includes("over") || lower.includes("overweight")) return aiResponses.weight;
  if (lower.includes("weigh-in") || lower.includes("after weigh")) return aiResponses["weigh-in"];
  if (lower.includes("water") || lower.includes("cut")) return aiResponses.water;
  if (lower.includes("recover")) return aiResponses.recover;
  return aiResponses.default;
}

export default function AICoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "Hey! I'm your AI Fight Coach. I know your profile, weight targets, and fight schedule. Ask me anything about your camp preparation, nutrition, weight cutting, or recovery. 🥊",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    setTimeout(() => {
      const response = getAIResponse(userMessage);
      setMessages((prev) => [...prev, { role: "ai", text: response }]);
      setLoading(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
        <a href="/dashboard" className="text-red-500 font-black text-xl">FightReady</a>
        <a href="/dashboard" className="text-zinc-400 text-sm hover:text-white">← Dashboard</a>
      </nav>

      <div className="flex flex-col flex-1 max-w-3xl mx-auto w-full px-6 py-6">
        <h1 className="text-3xl font-black mb-1">AI Fight Coach</h1>
        <p className="text-zinc-400 mb-6">Personalized guidance for your fight camp</p>

        {/* Athlete Context */}
        <div className="bg-zinc-900 border border-red-600/20 rounded-xl p-4 mb-6">
          <p className="text-red-400 text-xs font-bold mb-2">🎯 YOUR PROFILE</p>
          <div className="flex gap-6 text-sm flex-wrap">
            <span className="text-zinc-400">Current: <span className="text-white font-bold">78.5 kg</span></span>
            <span className="text-zinc-400">Target: <span className="text-white font-bold">74.0 kg</span></span>
            <span className="text-zinc-400">To Cut: <span className="text-red-400 font-bold">4.5 kg</span></span>
            <span className="text-zinc-400">Days Left: <span className="text-white font-bold">18</span></span>
            <span className="text-zinc-400">Sport: <span className="text-white font-bold">Kickboxing</span></span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-4 mb-6 overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-red-600 text-white rounded-br-sm"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-bl-sm"
              }`}>
                {msg.role === "ai" && (
                  <p className="text-red-400 text-xs font-bold mb-1">🤖 AI COACH</p>
                )}
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3">
                <p className="text-red-400 text-xs font-bold mb-1">🤖 AI COACH</p>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        <div className="flex gap-2 flex-wrap mb-4">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setInput(s)}
              className="text-xs px-3 py-1.5 bg-zinc-900 border border-zinc-700 hover:border-red-500 rounded-full text-zinc-400 hover:text-white transition"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI coach anything..."
            rows={1}
            className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 resize-none"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-red-600 hover:bg-red-500 disabled:opacity-50 rounded-xl font-bold transition"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}