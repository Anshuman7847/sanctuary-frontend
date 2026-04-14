import React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { CircularProgress, Button } from '@mui/material';
import { 
  TrendingUp, Calendar, Award, Zap, 
  Droplet, Tent, BookOpen, ChevronRight, FileText 
} from 'lucide-react';

const StatsView = () => {
  const days = Array.from({ length: 365 }, (_, i) => ({
    level: Math.floor(Math.random() * 5), 
  }));

  return (
    <div className="p-8 bg-[#FBFBFE] min-h-screen font-sans animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP ROW: Analytics & Mastery */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm relative">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Mood x Productivity</h3>
                <p className="text-sm text-gray-400 font-medium">Correlation over the last 14 days</p>
              </div>
              <div className="flex gap-6">
                <LegendItem color="bg-indigo-600" label="Mood" />
                <LegendItem color="bg-orange-400" label="Productivity" />
              </div>
            </div>

            <div className="h-[300px] w-full">
              <LineChart
                series={[
                  { data: [40, 32, 45, 30, 55, 48, 90, 60, 85, 40, 70, 65], color: '#6366f1', curve: "natural", area: false },
                  { data: [25, 30, 28, 45, 35, 50, 65, 55, 60, 80, 70, 92], color: '#fb923c', curve: "natural" },
                ]}
                xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], scaleType: 'point', hideTooltip: true }]}
                slotProps={{ legend: { hidden: true } }}
                margin={{ left: 30, right: 20, top: 20, bottom: 20 }}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-indigo-600 p-10 rounded-[40px] text-white flex flex-col items-center justify-between shadow-2xl shadow-indigo-200">
            <div className="w-full text-left">
              <h3 className="text-2xl font-bold">Weekly Mastery</h3>
              <p className="text-indigo-100/70 text-sm mt-1">You're in the top 5% of users</p>
            </div>
            <div className="relative flex items-center justify-center my-6">
              <CircularProgress variant="determinate" value={100} size={180} thickness={5} sx={{ color: 'rgba(255,255,255,0.1)' }} />
              <CircularProgress variant="determinate" value={85} size={180} thickness={5} sx={{ color: 'white', position: 'absolute', strokeLinecap: 'round' }} />
              <div className="absolute flex flex-col items-center">
                <span className="text-5xl font-black">85%</span>
                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Complete</span>
              </div>
            </div>
            <p className="text-[11px] text-center italic text-indigo-100 px-4 leading-relaxed">
              "The secret of your future is hidden in your daily routine."
            </p>
          </div>
        </div>

        {/* MIDDLE ROW: Yearly Consistency */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-gray-900">Yearly Consistency</h3>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase">Less</span>
              {[0, 1, 2, 3, 4].map(lvl => (
                <div key={lvl} className={`w-3 h-3 rounded-sm ${lvl === 0 ? 'bg-gray-100' : lvl === 1 ? 'bg-indigo-100' : lvl === 2 ? 'bg-indigo-300' : lvl === 3 ? 'bg-indigo-500' : 'bg-indigo-700'}`} />
              ))}
              <span className="text-[10px] font-bold text-gray-400 uppercase">More</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 justify-between">
            {days.map((day, i) => (
              <div key={i} className={`w-3.5 h-3.5 rounded-[3px] ${day.level === 0 ? 'bg-gray-50' : day.level === 1 ? 'bg-indigo-100' : day.level === 2 ? 'bg-indigo-200' : day.level === 3 ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-8 mt-10 pt-8 border-t border-gray-50">
            <StatSmall label="Total Habits" val="2,482" />
            <StatSmall label="Current Streak" val="14 Days" color="text-orange-500" />
            <StatSmall label="Longest Streak" val="42 Days" />
          </div>
        </div>

        {/* BOTTOM ROW: Breakdown & Power Habits */}
        <div className="grid grid-cols-12 gap-8">
          {/* Daily Habit Breakdown */}
          <div className="col-span-12 lg:col-span-7 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold">Daily Habit Breakdown</h3>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">This Week</span>
            </div>
            <div className="h-[250px] w-full">
              <BarChart
                series={[{ data: [4, 2, 5, 3, 4, 3, 2], color: '#6366f1' }]}
                xAxis={[{ data: ['M', 'T', 'W', 'T', 'F', 'S', 'S'], scaleType: 'band' }]}
                margin={{ top: 10, bottom: 30, left: 30, right: 10 }}
                borderRadius={10}
              />
            </div>
          </div>

          {/* Power Habits */}
          <div className="col-span-12 lg:col-span-5 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-8">Power Habits</h3>
            <div className="space-y-4">
              <PowerHabitItem icon={<Droplet size={18}/>} title="Stay Hydrated" streak="12 day streak" percent={98} color="text-blue-500" bg="bg-blue-50" />
              <PowerHabitItem icon={<Tent size={18}/>} title="Meditation" streak="8 day streak" percent={85} color="text-orange-500" bg="bg-orange-50" />
              <PowerHabitItem icon={<BookOpen size={18}/>} title="Reading" streak="5 day streak" percent={72} color="text-amber-600" bg="bg-amber-50" />
            </div>
          </div>
        </div>

        {/* FOOTER: Weekly Summary Ready */}
        <div className="bg-gray-50/50 p-8 rounded-[40px] border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
              <TrendingUp size={28} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900">Weekly Summary Ready</h4>
              <p className="text-sm text-gray-500 font-medium">Your habits have improved by 12% compared to last week.</p>
            </div>
          </div>
          <Button 
            variant="outlined" 
            startIcon={<FileText size={18} />}
            sx={{ 
              borderRadius: '16px', 
              textTransform: 'none', 
              fontWeight: 'bold', 
              px: 4, py: 1.5,
              color: '#6366f1',
              borderColor: '#e5e7eb',
              bgcolor: 'white',
              '&:hover': { bgcolor: '#f9fafb', borderColor: '#d1d5db' }
            }}
          >
            Generate PDF Report
          </Button>
        </div>
      </div>
    </div>
  );
};

// --- Sub-Components ---

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2">
    <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{label}</span>
  </div>
);

const StatSmall = ({ label, val, color = "text-indigo-600" }) => (
  <div>
    <p className="text-[10px] font-black uppercase text-gray-300 tracking-widest mb-1">{label}</p>
    <p className={`text-2xl font-black ${color}`}>{val}</p>
  </div>
);

const PowerHabitItem = ({ icon, title, streak, percent, color, bg }) => (
  <div className="flex items-center justify-between p-4 rounded-3xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 ${bg} ${color} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="font-bold text-gray-900 text-sm">{title}</p>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{streak}</p>
      </div>
    </div>
    <div className="text-right">
      <p className={`font-black text-lg ${color}`}>{percent}%</p>
      <p className="text-[8px] font-black uppercase text-gray-300 tracking-widest">Consistency</p>
    </div>
  </div>
);

export default StatsView;