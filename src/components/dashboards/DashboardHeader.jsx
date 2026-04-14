import React, { useEffect, useState } from "react";
import { CalendarDays, Bell, Plus } from "lucide-react";
import { axiosInstance } from "../../api/axiosinstance";
import { useLocation, useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const [user, setUser] = useState(null);
  useEffect(()=>{
    let mounted = true;
    axiosInstance.get('/profile/token').then(res=>{ if(mounted) setUser(res.data.user) }).catch(()=>{ if(mounted) setUser(null) })
    return ()=> mounted=false;
  },[])

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <header className="w-full bg-gray-100 border-b px-8 py-2 flex items-center justify-between">
      {/* detect stats page to show Analytics header */}
      <HeaderLeft today={today} user={user} />

      <HeaderRight user={user} />
    </header>
  );
};

const HeaderLeft = ({ today, user }) => {
  const location = useLocation();
  const isBadges = location.pathname.startsWith("/dashboard/badges");
  const isStats = location.pathname.startsWith("/dashboard/stats");

  if (isBadges) {
    return (
      <div>
        <h1 className="text-3xl font-semibold text-indigo-700 mt-1">The Digital Sanctuary</h1>
      </div>
    );
  }

  if (isStats) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mt-1">Analytics &amp; Insights</h1>
      </div>
    );
  }

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold">{today}</p>
      <h1 className="text-3xl font-bold text-gray-800 mt-1">Good Morning{user? `, ${user.fullname}` : ''} 👋</h1>
    </div>
  );
};

const HeaderRight = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isStats = location.pathname.startsWith("/dashboard/stats");
  const isBadges = location.pathname.startsWith("/dashboard/badges");

  if (isStats || isBadges) {
    return (
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-gray-200 transition">
          <CalendarDays size={24} className="text-gray-600" />
        </button>

        <button className="relative p-2 rounded-lg hover:bg-gray-200 transition">
          <Bell size={24} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
        </button>

        <button className="px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold flex items-center gap-2" onClick={()=> navigate('/dashboard/habits')}>
          <Plus size={16} />
          Add Habit
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      <button className="p-2 rounded-lg hover:bg-gray-200 transition">
        <CalendarDays size={24} className="text-gray-600" />
      </button>

      <button className="relative p-2 rounded-lg hover:bg-gray-200 transition">
        <Bell size={24} className="text-gray-600" />
        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full"></span>
      </button>

      <img src={user?.avatar || "https://i.pravatar.cc/40?img=12"} alt="profile" className="w-10 h-10 rounded-full object-cover cursor-pointer" />
    </div>
  );
};

export default DashboardHeader;
