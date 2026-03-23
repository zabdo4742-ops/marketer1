"use client";

import React from "react";
import { 
  Bell, 
  LayoutGrid 
} from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="sticky top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex items-center justify-between z-40">
      {/* App Icon / Menu */}
      <div className="p-2 bg-blue-50 text-[#256af4] rounded-lg">
        <LayoutGrid className="w-6 h-6" strokeWidth={2.5} />
      </div>

      {/* Page Title */}
      <h1 className="text-lg font-bold text-slate-900 tracking-tight">لوحة التحكم</h1>

      {/* Notifications */}
      <div className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
        <Bell className="w-6 h-6" />
        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full" />
      </div>
    </header>
  );
}
