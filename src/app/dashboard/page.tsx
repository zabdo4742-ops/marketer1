"use client";

import React from "react";
import { 
  Plus, 
  Users, 
  Calendar, 
  ShoppingCart, 
  Image as ImageIcon,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import BottomNav from "@/components/dashboard/BottomNav";

const stats = [
  {
    label: "تسجيلات اليوم",
    value: "24",
    trend: "+12%",
    trendUp: true,
    icon: Users,
    color: "text-blue-500",
    bg: "bg-blue-50"
  },
  {
    label: "إجمالي الشهر",
    value: "582",
    trend: "-5%",
    trendUp: false,
    icon: Calendar,
    color: "text-indigo-500",
    bg: "bg-indigo-50"
  },
  {
    label: "عمليات البيع اليوم",
    value: "8",
    trend: "+5%",
    trendUp: true,
    icon: ShoppingCart,
    color: "text-emerald-500",
    bg: "bg-emerald-50"
  },
  {
    label: "إجمالي مبيعات الشهر",
    value: "142",
    trend: "+10%",
    trendUp: true,
    icon: ImageIcon,
    color: "text-orange-500",
    bg: "bg-orange-50"
  }
];

const weeklyData = [
  { day: "الأحد", value: 40 },
  { day: "الاثنين", value: 65 },
  { day: "الثلاثاء", value: 35 },
  { day: "الأربعاء", value: 90, active: true },
  { day: "الخميس", value: 45 },
  { day: "الجمعة", value: 75 },
  { day: "السبت", value: 30 },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24 bg-slate-50 font-tajawal">
      <DashboardHeader />
      
      <main className="flex-1 p-6 space-y-6">
        {/* User Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-slate-100"
        >
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold text-slate-900 leading-tight">أهلاً علي سالم حيدر</h2>
            <p className="text-slate-400 text-xs font-medium">أخصائي تسويق ميداني</p>
            <div className="mt-1 px-2 py-0.5 bg-blue-50 text-[#256af4] text-[10px] font-bold rounded-full w-fit border border-blue-100 uppercase tracking-tighter">
              رقم الموظف: #44921
            </div>
          </div>
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-slate-50 shadow-inner">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1000" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Primary Action Button */}
        <Link href="/dashboard/register" className="block w-full">
          <motion.button 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="w-full py-4.5 bg-[#256af4] text-white font-bold rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center gap-3 hover:bg-blue-600 active:scale-[0.98] transition-all"
          >
            <Plus className="w-6 h-6 p-0.5 bg-white/20 rounded-lg" strokeWidth={3} />
            <span className="text-lg">بدء إدخال جديد</span>
          </motion.button>
        </Link>

        {/* Section Title */}
        <div className="flex items-center justify-between pr-1">
          <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">إحصائيات الأداء الرئيسية</h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (i * 0.05) }}
              className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col gap-3 group hover:border-[#256af4]/30 transition-all active:scale-[0.98]"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${stat.trendUp ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
                  {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {stat.trend}
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{stat.label}</p>
                <p className="text-2xl font-black text-slate-800 tracking-tight">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Activity Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-800">الاتجاه الأسبوعي</h3>
            <button className="text-slate-300 hover:text-slate-600 transition-colors">
              <MoreHorizontal className="w-6 h-6" />
            </button>
          </div>
          
          <div className="flex items-end justify-between h-32 gap-2 pr-2">
            {weeklyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full relative flex items-end justify-center h-full">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${d.value}%` }}
                    transition={{ delay: 0.5 + (i * 0.05), type: "spring", stiffness: 100 }}
                    className={`w-full max-w-[24px] rounded-full transition-all duration-500 cursor-pointer ${d.active ? "bg-[#256af4] shadow-lg shadow-blue-200" : "bg-blue-100/60 group-hover:bg-blue-200"}`}
                  />
                </div>
                <span className={`text-[10px] font-bold transition-colors ${d.active ? "text-[#256af4]" : "text-slate-300 group-hover:text-slate-500"}`}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      <BottomNav />
    </div>
  );
}
