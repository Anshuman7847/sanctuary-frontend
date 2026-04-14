import React, { useState } from 'react';
import { 
  LayoutDashboard, Calendar, BarChart2, Award, Settings, 
  Plus, Droplet, BrainCircuit, BookOpen, CheckCircle2, Bell, Search 
} from 'lucide-react';
import { CircularProgress, Switch, Tooltip } from '@mui/material';




// --- Main Application ---
export default function DashboardWelcome() {
  const [completed, setCompleted] = useState({ water: false, meditation: true, reading: false });

  return (
    <div className="pt-6 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-[1200px] mx-auto p-6">
        {/* Header */}
        

        <div className="grid grid-cols-12 gap-8">
          {/* Left Column: Rituals & Stats */}
          <div className="col-span-8 space-y-8">
            <section>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-bold text-gray-800">Daily Rituals</h3>
                <button className="text-sm font-bold text-indigo-600 hover:underline">See All</button>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {/* Habit Card: Water */}
                <HabitCard 
                  title="Drink Water" 
                  desc="2.5L target per day" 
                  streak={12} 
                  icon={<Droplet size={20} />} 
                  color="blue"
                  isDone={completed.water}
                  onToggle={() => setCompleted({...completed, water: !completed.water})}
                />
                {/* Habit Card: Meditation */}
                <HabitCard 
                  title="Meditation" 
                  desc="10 mins daily focus" 
                  streak={5} 
                  icon={<BrainCircuit size={20} />} 
                  color="orange"
                  isDone={completed.meditation}
                  onToggle={() => setCompleted({...completed, meditation: !completed.meditation})}
                />
                {/* Habit Card: Reading */}
                <HabitCard 
                  title="Read 20 Pages" 
                  desc="Evening wind-down" 
                  streak={21} 
                  icon={<BookOpen size={20} />} 
                  color="amber"
                  isDone={completed.reading}
                  onToggle={() => setCompleted({...completed, reading: !completed.reading})}
                />
              </div>
            </section>

            {/* Consistency Banner & Analytics */}
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-indigo-600 p-8 rounded-[32px] text-white flex flex-col justify-center relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-2">Consistency is Key</h4>
                  <p className="text-indigo-100 text-sm opacity-80 leading-relaxed">
                    You've completed 85% of your rituals this week. Keep the momentum!
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              </div>
              
              <div className="border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center p-8 text-gray-400 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Plus />
                </div>
                <span className="font-bold text-sm">Add New Ritual</span>
              </div>
            </div>
          </div>

          {/* Right Column: Mood & Completion */}
          <div className="col-span-4 space-y-8">
            {/* Mood Card */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-800 mb-6">How are you feeling?</h3>
              <div className="flex justify-between">
                {['😠', '😢', '😐', '😊', '🤩'].map((emoji, i) => (
                  <button key={i} className={`text-2xl p-2 rounded-2xl transition-all ${i === 3 ? 'bg-orange-100 scale-110 shadow-sm' : 'hover:bg-gray-50'}`}>
                    {emoji}
                  </button>
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 italic mt-6">"Feeling balanced and ready for the day."</p>
            </div>

            {/* Completion Ring */}
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm text-center">
              <h3 className="font-bold text-gray-800 mb-8 text-left">Daily Completion</h3>
              <div className="relative inline-flex items-center justify-center mb-8">
                <CircularProgress variant="determinate" value={65} size={180} thickness={5} sx={{ color: '#6366f1' }} />
                <div className="absolute flex flex-col">
                  <span className="text-4xl font-black text-gray-900">65%</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Complete</span>
                </div>
              </div>
              <div className="space-y-4 text-left">
                <ProgressRow label="Morning Rituals" val="3/3" percent={100} />
                <ProgressRow label="Work/Study" val="1/3" percent={33} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function HabitCard({ title, desc, streak, icon, color, isDone, onToggle }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    amber: 'bg-amber-50 text-amber-600'
  };

  return (
    <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl ${colors[color]}`}>{icon}</div>
        <span className="text-[10px] font-black text-gray-400 uppercase">Streak {streak} 🔥</span>
      </div>
      <h4 className="font-bold text-gray-900">{title}</h4>
      <p className="text-xs text-gray-400 mb-6">{desc}</p>
      
      {/* Mini Bar Chart Placeholder */}
      <div className="flex items-end gap-1 h-8 mb-6">
        {[40, 60, 45, 90, 100, 30, 20].map((h, i) => (
          <div key={i} className={`flex-1 rounded-t-sm ${i === 4 ? 'bg-indigo-500' : 'bg-indigo-100'}`} style={{ height: `${h}%` }}></div>
        ))}
      </div>

      <button 
        onClick={onToggle}
        className={`w-full py-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
          isDone ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-indigo-600 hover:bg-indigo-50'
        }`}
      >
        {isDone && <CheckCircle2 size={14} />}
        {isDone ? 'Completed' : 'Mark Complete'}
      </button>
    </div>
  );
}

function ProgressRow({ label, val, percent }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold">
        <span className="text-gray-400">{label}</span>
        <span className="text-indigo-600">{val}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${percent}%` }}></div>
      </div>
    </div>
  );
}