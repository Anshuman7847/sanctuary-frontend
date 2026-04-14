import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Flame, Smile } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
     
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Build Better Habits, Track Your Mood
          </h2>
          <p className="text-gray-600 mb-6">
            Stay consistent, improve your mental health, and become your best version with smart tracking.
          </p>
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-2xl shadow-lg hover:scale-105 transition">
            Get Started
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-xl p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Today's Progress</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Workout</span>
              <CheckCircle className="text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Meditation</span>
              <CheckCircle className="text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span>Reading</span>
              <span className="text-gray-400">Pending</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-16">
        <FeatureCard
          icon={<Flame className="text-orange-500" />}
          title="Streak Tracking"
          desc="Maintain daily streaks and stay motivated."
        />
        <FeatureCard
          icon={<Smile className="text-yellow-500" />}
          title="Mood Analysis"
          desc="Track your mood and understand patterns."
        />
        <FeatureCard
          icon={<CheckCircle className="text-green-500" />}
          title="Habit Goals"
          desc="Set and achieve your daily goals easily."
        />
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Start Your Journey Today 🚀
        </h2>
        <button className="px-8 py-3 bg-purple-600 text-white rounded-2xl shadow-lg hover:scale-105 transition">
          Join Now
        </button>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white p-6 rounded-2xl shadow-md"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-500">{desc}</p>
    </motion.div>
  );
}
