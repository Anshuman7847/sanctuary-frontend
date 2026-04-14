import React from "react";

const FullPageLoader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white z-50">

      {/* Logo / App Name */}
      <h1 className="text-3xl font-bold tracking-wide mb-6 animate-pulse">
        Habit Tracker
      </h1>

      {/* Spinner */}
      <div className="relative">
        <div className="w-20 h-20 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full blur-xl bg-purple-500 opacity-30 animate-ping"></div>
      </div>

      {/* Loading Text */}
      <p className="mt-6 text-lg text-gray-300 animate-pulse">
        Building your better self...
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-gray-700 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 animate-loadingBar"></div>
      </div>

    </div>
  );
};

export default FullPageLoader;