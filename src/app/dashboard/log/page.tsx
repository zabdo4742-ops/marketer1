"use client";

import React, { useState } from "react";
import { 
  ArrowRight, 
  Search, 
  Filter, 
  Plus, 
  ChevronLeft,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  RefreshCw,
  User
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import BottomNav from "@/components/dashboard/BottomNav";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

export default function LogPage() {
  const { clients, isLoaded } = useStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  if (!isLoaded) return null;

  const filteredClients = clients.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase());
    if (filter === "All") return matchesSearch;
    // For now, new clients from the form are 'Pending'
    if (filter === "Pending" && c.id.startsWith("REG")) return matchesSearch;
    return false;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-tajawal pb-24">
      {/* Header */}
      <header className="bg-white px-6 pt-6 pb-2 sticky top-0 z-40 border-b border-slate-100">
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard" className="p-2 -mr-2 text-slate-400">
            <ArrowRight className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-black text-slate-900 leading-none">سجل العمليات</h1>
          <button className="p-2 text-[#256af4] relative">
            <RefreshCw className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <input 
            type="text" 
            placeholder="البحث برقم السجل أو الاسم..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-3.5 pr-12 pl-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm outline-none focus:border-[#256af4] focus:ring-4 focus:ring-blue-50 transition-all text-right"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {["All", "Pending", "Accepted", "Rejected"].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border",
                filter === f 
                  ? "bg-[#256af4] text-white border-[#256af4] shadow-lg shadow-blue-100" 
                  : "bg-white text-slate-400 border-slate-100 hover:border-blue-200"
              )}
            >
              {f === "All" ? "الكل" : f === "Pending" ? "قيد المراجعة" : f === "Accepted" ? "مقبول" : "مرفوض"}
            </button>
          ))}
          <div className="mr-auto">
             <Filter className="w-5 h-5 text-slate-300" />
          </div>
        </div>
      </header>

      <main className="p-6 space-y-4">
        {filteredClients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-300 space-y-4">
            <div className="p-6 bg-white rounded-full shadow-sm border border-slate-100">
              <RefreshCw className="w-10 h-10 animate-spin-slow" />
            </div>
            <p className="text-sm font-bold">لا يوجد نتائج لعرضها</p>
          </div>
        ) : (
          filteredClients.map((log, i) => (
            <motion.div 
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link 
                href={`/dashboard/log/${log.id}`}
                className="block bg-white p-5 rounded-[28px] shadow-sm border border-slate-100 hover:border-[#256af4] transition-all group active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-[#256af4]">
                      <User className="w-7 h-7" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#256af4]" />
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">{log.id}</span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
                        <Clock className="w-3 h-3" />
                        <span>{formatDistanceToNow(new Date(log.createdAt), { addSuffix: true, locale: ar })}</span>
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-900 group-hover:text-[#256af4] transition-colors">{log.name}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] font-bold text-[#256af4]">تسجيل عائلة جديد</span>
                      <div className="flex items-center gap-1">
                         <span className="text-[10px] font-bold text-slate-400">التفاصيل</span>
                         <ChevronLeft className="w-3 h-3 text-slate-300" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </main>

      {/* Floating Action Button */}
      <Link 
        href="/dashboard/register"
        className="fixed bottom-28 left-6 w-14 h-14 bg-[#256af4] text-white rounded-2xl shadow-2xl shadow-blue-200 flex items-center justify-center z-50 hover:scale-110 active:scale-95 transition-all group border-2 border-white/20"
      >
        <Plus className="w-7 h-7 group-hover:rotate-90 transition-transform duration-300" />
      </Link>

      <BottomNav />
    </div>
  );
}
