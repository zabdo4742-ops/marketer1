"use client";

import React from "react";
import { 
  User as UserIcon, 
  Settings, 
  Bell, 
  Shield, 
  LogOut, 
  ChevronLeft,
  ArrowRight,
  UserCheck,
  Smartphone,
  Globe,
  HelpCircle
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BottomNav from "@/components/dashboard/BottomNav";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear any local session if needed
    router.push("/");
  };

  const menuItems = [
    { label: "إعدادات الحساب", icon: Settings, color: "text-slate-400" },
    { label: "التنبيهات", icon: Bell, color: "text-blue-500" },
    { label: "الخصوصية والأمان", icon: Shield, color: "text-emerald-500" },
    { label: "اللغة والمنطقة", icon: Globe, color: "text-orange-500" },
    { label: "مركز المساعدة", icon: HelpCircle, color: "text-indigo-500" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-tajawal pb-24">
      {/* Header */}
      <header className="bg-white px-6 py-6 flex items-center justify-between shadow-sm border-b border-slate-100 sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 -mr-2 text-slate-400">
          <ArrowRight className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-black text-slate-900">الملف الشخصي</h1>
        <div className="w-10 h-10" /> {/* Spacer */}
      </header>

      <main className="p-6 space-y-6">
        {/* User Card */}
        <section className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col items-center gap-4 text-center">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-50 rounded-[32px] overflow-hidden border-4 border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-black text-slate-900">علي سالم حيدر</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">+966 50 000 0000</p>
          </div>

          <div className="flex items-center gap-3 mt-2">
             <Link href="/admin" className="px-5 py-2 bg-blue-50 text-[#256af4] text-xs font-bold rounded-full border border-blue-100 hover:bg-blue-100 transition-all">لوحة تحكم المدير</Link>
             <div className="w-1 h-1 bg-slate-200 rounded-full" />
             <span className="text-[10px] font-bold text-slate-400">كود الموظف: #44921</span>
          </div>
        </section>

        {/* Menu Items */}
        <section className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden divide-y divide-slate-50">
          {menuItems.map((item, i) => (
            <button key={i} className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition-all group">
               <ChevronLeft className="w-5 h-5 text-slate-300 group-hover:-translate-x-1 transition-transform" />
               <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-slate-700">{item.label}</span>
                  <div className={cn("p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm", item.color)}>
                     <item.icon className="w-5 h-5" />
                  </div>
               </div>
            </button>
          ))}
        </section>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full p-6 bg-red-50 text-red-500 rounded-[28px] border border-red-100 flex items-center justify-center gap-3 group hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
        >
          <LogOut className="w-6 h-6 rotate-180 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-black uppercase tracking-widest">تسجيل الخروج</span>
        </button>

        <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
          FieldPro Marketing v1.2.0 • 2024
        </p>
      </main>

      <BottomNav />
    </div>
  );
}
