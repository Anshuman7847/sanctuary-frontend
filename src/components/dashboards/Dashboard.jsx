import React from "react";
import { Link, useLocation, Outlet } from "react-router-dom";
import { LayoutDashboard, ClipboardList, BarChart3, Trophy, Settings, Plus } from "lucide-react";
import DashboardHeader from "./DashboardHeader";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "Habits", icon: ClipboardList, path: "/dashboard/habits" },
  { name: "Stats", icon: BarChart3, path: "/dashboard/stats" },
  { name: "Badges", icon: Trophy, path: "/dashboard/badges" },
  { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-[260px] bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col justify-between p-6 z-30">
      <div>
        <div className="px-4 mb-8">
          <h1 className="text-2xl font-bold text-indigo-600">Sanctuary</h1>
        </div>

        <nav className="space-y-3 px-2">
            {menuItems.map((item) => {
            const Icon = item.icon;
            // Dashboard should only be active on exact /dashboard path.
            const active = item.path === "/dashboard"
              ? location.pathname === item.path
              : location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  active ? "bg-white shadow text-indigo-600 font-semibold" : "text-gray-500 hover:bg-white/70"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-2 px-4">
        <button
          aria-label="Add Habit"
          onClick={() => { navigate('/dashboard/habits'); toast.info('Open Habits — add a new ritual'); }}
          className="w-full px-4 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold shadow-lg transform-gpu hover:scale-105 transition-transform flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          <span className="leading-none">Add Habit</span>
        </button>

        <div className="flex items-center gap-3 bg-white rounded-xl p-3 shadow">
          <img src="https://i.pravatar.cc/40" alt="profile" className="w-10 h-10 rounded-full" />
          <div>
            <p className="text-sm font-semibold text-gray-800">Alex</p>
            <p className="text-xs text-gray-500">Good Morning 👋</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Dashboard = () => {
  const location = useLocation();

  // hide header on Habits and Settings pages
  const hideHeader = location.pathname.startsWith("/dashboard/habits") || location.pathname.startsWith("/dashboard/settings");

  return (
    <div>
      <Sidebar />
      <main className="ml-[260px] h-screen flex flex-col dark:bg-slate-800">
        {!hideHeader && (
          <div className="sticky top-0 z-20">
            <DashboardHeader />
          </div>
        )}

        <div className="flex-1 overflow-y-auto no-scrollbar ">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

