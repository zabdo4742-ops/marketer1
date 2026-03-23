"use client";

import React, { useState } from "react";
import { 
  ArrowRight, 
  MoreVertical,
  Phone,
  MessageCircle,
  PlusCircle,
  Trash2,
  ShoppingCart,
  CheckCircle2,
  Edit3,
  ShoppingBag,
  ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import BottomNav from "@/components/dashboard/BottomNav";
import { cn } from "@/lib/utils";

const timelineData = [
  {
    title: "تعديل ملف العميل",
    description: "تم تغيير الحالة إلى قيد المراجعة بواسطة النظام",
    time: "12:30 م - اليوم",
    icon: Edit3,
    color: "text-blue-500",
    bg: "bg-blue-100/50"
  },
  {
    title: "عملية شراء ناجحة",
    description: "منتج: عصير فواكه طازج",
    time: "10:15 ص - اليوم",
    icon: ShoppingBag,
    color: "text-emerald-500",
    bg: "bg-emerald-100/50"
  }
];

export default function ClientDetailsPage() {
  const [activeChip, setActiveChip] = useState("ملابس");
  const [interestsList, setInterestsList] = useState([
    {
      id: 1,
      label: "ملابس",
      updated: "تم التحديث منذ يومين",
      status: "لم يتم الشراء بعد",
      isPurchased: false,
      color: "bg-blue-50 text-blue-500",
      icon: ShoppingBag
    },
    {
      id: 2,
      label: "عصير",
      updated: "تم التحديث: اليوم",
      status: "تمت العملية",
      date: "24 يناير 2024",
      isPurchased: true,
      color: "bg-orange-50 text-orange-500",
      icon: ShoppingBag
    }
  ]);

  const addInterest = (label: string) => {
    const newInterest = {
      id: Date.now(),
      label,
      updated: "أضيف حديثاً",
      status: "لم يتم الشراء بعد",
      isPurchased: false,
      color: "bg-indigo-50 text-indigo-500",
      icon: ShoppingBag
    };
    setInterestsList([newInterest, ...interestsList]);
  };

  const deleteInterest = (id: number) => {
    setInterestsList(interestsList.filter(item => item.id !== id));
  };

  const togglePurchase = (id: number) => {
    setInterestsList(interestsList.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isPurchased: !item.isPurchased,
          status: !item.isPurchased ? "تمت العملية" : "لم يتم الشراء بعد",
          date: !item.isPurchased ? new Date().toLocaleDateString('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' }) : undefined
        };
      }
      return item;
    }));
  };

  return (
    <div className="flex flex-col min-h-screen pb-24 bg-slate-50 font-tajawal">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/dashboard/log" className="p-2 -mr-2 text-slate-400 hover:text-slate-600">
          <ArrowRight className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold text-slate-900">تفاصيل العميل</h1>
        <button className="p-2 text-slate-400">
          <MoreVertical className="w-6 h-6" />
        </button>
      </header>

      <main className="p-6 space-y-8 flex-1">
        {/* Profile Card */}
        <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-16 bg-blue-50/50" />
          <div className="w-24 h-24 rounded-3xl overflow-hidden border-4 border-white shadow-xl relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=400" 
              alt="Client" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="text-center z-10">
            <h2 className="text-xl font-black text-slate-900 mb-1">أليكس تومسون</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">REG-88291#</p>
          </div>

          <div className="px-5 py-1.5 bg-blue-50 text-[#256af4] text-[10px] font-bold rounded-full border border-blue-100">
            قيد المراجعة
          </div>

          <div className="flex items-center gap-4">
            <button className="w-12 h-12 bg-[#256af4] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Phone className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 bg-white border border-slate-100 text-[#256af4] rounded-2xl flex items-center justify-center shadow-sm">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Interests & Follow-up */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-sm font-bold text-slate-600">الاهتمامات والمتابعة</h3>
            <button 
              onClick={() => addInterest(activeChip)}
              className="flex items-center gap-1.5 text-[10px] font-bold text-[#256af4] bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100 transition-all border border-blue-100 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              إضافة {activeChip}
            </button>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {["ملابس", "عصير", "طعام", "تلفاز", "إلكترونيات"].map((chip, i) => (
              <button 
                key={i} 
                onClick={() => setActiveChip(chip)}
                className={cn(
                  "px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm whitespace-nowrap transition-all border",
                  activeChip === chip 
                    ? "bg-[#256af4] text-white border-[#256af4] scale-105" 
                    : "bg-white text-slate-500 border-slate-100 hover:border-blue-200"
                )}
              >
                <ShoppingBag className={cn("w-4 h-4", activeChip === chip ? "text-white" : "text-blue-500")} />
                <span className="text-xs font-bold">{chip}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {interestsList.map((item, i) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, x: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white rounded-[24px] p-5 shadow-sm border border-slate-100 border-b-2 border-b-slate-100/50"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-colors", item.isPurchased ? "bg-emerald-50 text-emerald-500" : item.color)}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <h4 className="font-bold text-slate-900">{item.label}</h4>
                        <p className="text-[10px] text-slate-400 font-medium">{item.updated}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteInterest(item.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {item.isPurchased ? (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3.5 bg-emerald-50/50 rounded-[20px] border border-emerald-100 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-700">تمت العملية بنجاح</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-medium text-slate-400">{item.date}</span>
                        <button 
                          onClick={() => togglePurchase(item.id)}
                          className="text-[10px] font-bold text-slate-400 hover:text-slate-600 underline"
                        >تراجع</button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <button 
                        onClick={() => togglePurchase(item.id)}
                        className="flex-1 py-3.5 bg-[#256af4] text-white rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-2 font-bold text-sm hover:bg-blue-600 active:scale-95 transition-all"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        تم الشراء
                      </button>
                      <span className="text-[10px] font-black text-slate-300 px-4 uppercase tracking-tighter">لم يتم الشراء بعد</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {interestsList.length === 0 && (
              <div className="text-center py-10 text-slate-300">
                <p className="text-sm font-bold">لا يوجد اهتمامات حالياً</p>
              </div>
            )}
          </div>
        </section>

        {/* Activity Log */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-600 px-1 uppercase tracking-widest text-[10px]">سجل النشاط</h3>
          
          <div className="bg-white rounded-[28px] p-8 shadow-sm border border-slate-100 space-y-10 relative overflow-hidden">
            <div className="absolute right-[46px] top-12 bottom-12 w-0.5 bg-slate-100" />
            
            {timelineData.map((act, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="flex items-start gap-6 relative z-10"
              >
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-md outline outline-2 outline-slate-50", act.bg, act.color)}>
                  <act.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 pt-1 space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">{act.title}</h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{act.description}</p>
                  <p className="text-[10px] font-bold text-[#256af4] text-left">{act.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
