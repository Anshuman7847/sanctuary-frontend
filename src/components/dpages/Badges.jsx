import React from 'react';
import { 
  Flame, 
  User, 
  Sun, 
  Droplet, 
  Users, 
  Zap, 
  Moon, 
  Lock, 
  CheckCircle2, 
  Star 
} from 'lucide-react';

const BadgesView = () => {
  return (
    <div className="p-12 bg-[#FBFBFE] min-h-screen font-sans animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Header Card: Rank & XP Progress */}
        <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm relative overflow-hidden flex justify-between items-center">
          <div className="space-y-4 z-10 w-2/3">
            <div>
              <p className="text-[10px] font-black uppercase text-indigo-600 tracking-widest mb-1">Current Rank</p>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">Level 5 Habit Hero</h1>
              <p className="text-sm text-gray-400 font-medium mt-2 max-w-sm">
                You're in the top 2% of achievers this week. Keep the momentum going to reach Master status!
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-end">
                <span className="text-lg font-black text-indigo-600">2,450 / 3,000 XP</span>
                <span className="text-[10px] font-bold text-gray-300 uppercase">550 XP to Level 6</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-600 to-orange-400 rounded-full transition-all duration-1000" 
                  style={{ width: '81.6%' }}
                />
              </div>
            </div>
          </div>

          {/* Season Medal Box */}
          <div className="bg-white border border-gray-50 shadow-xl rounded-3xl p-6 flex flex-col items-center text-center space-y-3 z-10">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
              <Star size={40} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Season 4</p>
              <p className="text-xs font-black text-gray-900">Gold Medalist</p>
            </div>
          </div>

          {/* Background Decorative Gradient */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/30 to-transparent pointer-events-none" />
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <BadgeCard 
            icon={<Flame className="text-orange-500" />} 
            title="7 Day Streak" 
            desc="Consistency is key. You've been active for a full week!" 
            status="EARNED OCT 12"
            color="bg-orange-50"
            earned
          />
          <BadgeCard 
            icon={<User className="text-indigo-600" />} 
            title="Mindfulness Master" 
            desc="Completed 50 meditation sessions with deep focus." 
            status="EARNED SEP 28"
            color="bg-indigo-50"
            earned
          />
          <BadgeCard 
            icon={<Sun className="text-amber-500" />} 
            title="Early Riser" 
            desc="Wake up before 6 AM for 5 consecutive days." 
            status="EARNED OCT 05"
            color="bg-amber-50"
            earned
          />
          <BadgeCard 
            icon={<Droplet className="text-gray-400" />} 
            title="Hydration Hero" 
            desc="Drink 2L of water daily for 30 days straight." 
            progress={10}
            total={30}
            isLocked
          />
          
          {/* Social Card (Double Width) */}
          <div className="col-span-1 md:col-span-2 bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex items-center gap-8 relative overflow-hidden">
             <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center text-pink-500 shrink-0">
                <Users size={40} fill="currentColor" />
             </div>
             <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900">Social Butterfly</h3>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Connect with 10 friends and share your journey. You're inspiring others to live healthier!
                </p>
                <div className="flex -space-x-2 mt-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="friend" />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                    +7
                  </div>
                </div>
             </div>
             <div className="absolute top-4 right-4 opacity-10 rotate-12">
                <Zap size={60} />
             </div>
          </div>

          <BadgeCard 
            icon={<Zap className="text-gray-400" />} 
            title="Zen Warrior" 
            desc="Maintain a perfectly balanced mood for 14 days." 
            isLocked
          />
          <BadgeCard 
            icon={<Moon className="text-gray-400" />} 
            title="Night Owl" 
            desc="Complete a reflection session after midnight." 
            isLocked
          />
        </div>

        {/* Recent Milestones Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Recent Milestones</h2>
          
          <MilestoneItem 
            icon={<CheckCircle2 className="text-green-500" />} 
            title='500 XP Gained from "Hydration"' 
            time="Yesterday at 8:45 PM" 
            xp="+500"
            color="text-green-600"
            bg="bg-green-50"
          />
          
          <MilestoneItem 
            icon={<Star className="text-amber-500" fill="currentColor" />} 
            title='Unlocked "7 Day Streak" Badge' 
            time="Oct 12, 2023 at 10:00 AM" 
            xp="+1,000"
            color="text-amber-600"
            bg="bg-amber-50"
          />
        </div>

      </div>
    </div>
  );
};

// --- Sub-Components ---

const BadgeCard = ({ icon, title, desc, status, color, earned, isLocked, progress, total }) => (
  <div className={`bg-white rounded-[32px] p-8 border ${isLocked ? 'border-dashed border-gray-200' : 'border-gray-100 shadow-sm'} flex flex-col items-center text-center space-y-4 transition-all hover:scale-[1.02]`}>
    <div className={`relative w-16 h-16 rounded-full flex items-center justify-center ${isLocked ? 'bg-gray-100' : color}`}>
      {icon}
      {isLocked && (
        <div className="absolute -top-1 -right-1 bg-gray-500 text-white p-1 rounded-full border-2 border-white">
          <Lock size={10} />
        </div>
      )}
    </div>
    
    <div className="space-y-2">
      <h3 className={`font-bold text-sm ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>{title}</h3>
      <p className="text-[10px] text-gray-400 leading-normal">{desc}</p>
    </div>

    {earned && (
      <div className="bg-orange-50 text-orange-600 text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
        {status}
      </div>
    )}

    {isLocked && progress && (
      <div className="w-full space-y-2">
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gray-300" style={{ width: `${(progress/total)*100}%` }} />
        </div>
        <p className="text-[9px] font-bold text-gray-300 uppercase">{progress}/{total} DAYS</p>
      </div>
    )}

    {isLocked && !progress && (
      <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">LOCKED</p>
    )}
  </div>
);

const MilestoneItem = ({ icon, title, time, xp, color, bg }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-50 flex items-center justify-between shadow-sm">
    <div className="flex items-center gap-5">
      <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        <p className="text-[11px] font-medium text-gray-400">{time}</p>
      </div>
    </div>
    <span className={`text-lg font-black ${color}`}>{xp}</span>
  </div>
);

export default BadgesView;