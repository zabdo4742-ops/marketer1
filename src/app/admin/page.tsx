"use client";

import React from "react";
import { 
  Search, 
  FileText, 
  FileSpreadsheet, 
  MoreHorizontal,
  ChevronLeft,
  Users,
  Building2,
  AlertCircle,
  CheckCircle2,
  Trash2,
  Edit,
  ExternalLink,
  Zap,
  Layout,
  Plus,
  Eye,
  Rocket,
  Calendar,
  BellRing
} from "lucide-react";
import { motion } from "framer-motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { cn } from "@/lib/utils";

const barData = [
  { month: "يناير", value: 35 },
  { month: "فبراير", value: 55 },
  { month: "مارس", value: 45 },
  { month: "أبريل", value: 75 },
  { month: "مايو", value: 60 },
  { month: "يونيو", value: 95, active: true },
];

const staffData = [
  { name: "سارة ميلر", role: "محلل رئیسی", status: "نشط", lastSeen: "منذ 5 دقائق" },
  { name: "جيسون كيث", role: "مشرف ميداني", status: "غير متواجد", lastSeen: "منذ 15 دقيقة" },
  { name: "إيما لو", role: "مصممة تجربة مستخدم", status: "قيد الاتصال", lastSeen: "منذ ساعين" },
];

export default function AdminDashboard() {
  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-tajawal">
      <AdminSidebar />
      <main className="flex-1 mr-72 p-10 pb-20 space-y-10">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-96">
              <input 
                type="text" 
                placeholder="البحث عن البيانات أو الموظفين أو النماذج..."
                className="w-full py-2.5 pr-11 pl-4 bg-white border border-slate-100 rounded-xl text-sm outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-[#256af4] transition-all text-right shadow-sm"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 text-slate-900 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all">
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              <span>إكسل</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 text-slate-900 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-all">
              <FileText className="w-4 h-4 text-rose-500" />
              <span>بي دي إف</span>
            </button>
          </div>
        </div>

        {/* Hero Title */}
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900">نظرة عامة على العمليات</h1>
          <p className="text-slate-400 text-sm font-medium">مراقبة البنية التحتية والتوظيف والتواصل مع العملاء في الوقت الفعلي.</p>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-5 gap-8">
          {/* Main Bar Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-3 bg-white p-8 rounded-[32px] shadow-sm border border-slate-50 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">نمو الإسكان والبنية التحتية</h3>
                <p className="text-xs text-slate-400">معدلات الإشغال ونظام التطوير</p>
              </div>
              <button className="text-[10px] uppercase tracking-widest font-black text-[#256af4] bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">آخر 6 أشهر</button>
            </div>
            
            <div className="flex items-end justify-between h-56 gap-6 px-4">
              {barData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${d.value}%` }}
                    transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                    className={cn(
                      "w-full max-w-[48px] rounded-2xl transition-all duration-300 relative",
                      d.active ? "bg-[#256af4] shadow-xl shadow-blue-200" : "bg-blue-100/50 group-hover:bg-blue-200/60"
                    )}
                  />
                  <span className={cn("text-xs font-bold transition-all", d.active ? "text-[#256af4]" : "text-slate-300 group-hover:text-slate-500")}>
                    {d.month}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Donut Chart / Demographics */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-2 bg-white p-8 rounded-[32px] shadow-sm border border-slate-50 flex flex-col"
          >
            <h3 className="text-lg font-bold text-slate-900 mb-8 text-center uppercase tracking-widest text-slate-400 text-sm">الديموغرافيا</h3>
            <div className="relative flex-1 flex items-center justify-center">
              {/* Simple Donut Visualization with SVG */}
              <svg className="w-48 h-48 -rotate-90">
                <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="18" fill="transparent" className="text-blue-50" />
                <motion.circle 
                  cx="96" cy="96" r="80" 
                  stroke="currentColor" strokeWidth="18" 
                  strokeDasharray="502.6"
                  initial={{ strokeDashoffset: 502.6 }}
                  animate={{ strokeDashoffset: 502.6 * 0.25 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                  fill="transparent" className="text-[#256af4]" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-black text-slate-900 tracking-tight">75%</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">العائد المتوقع</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1 text-center">
                <span className="text-[10px] font-bold text-slate-400">الوحدات السكنية</span>
                <span className="text-lg font-black text-slate-900">12.4k</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-1 text-center">
                <span className="text-[10px] font-bold text-slate-400">الوحدات المستأجرة</span>
                <span className="text-lg font-black text-slate-900">8.2k</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Lower Grid: Staff and Form Manager */}
        <div className="grid grid-cols-5 gap-8">
          {/* Staff List Table */}
          <div className="col-span-3 bg-white px-8 pt-8 pb-4 rounded-[32px] shadow-sm border border-slate-50">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900">إدارة الموظفين</h3>
              <button className="text-xs font-bold text-[#256af4] hover:underline">عرض الكل</button>
            </div>
            <table className="w-full">
              <thead className="text-right border-b border-slate-50 text-slate-300 text-[10px] font-bold uppercase tracking-widest">
                <tr>
                  <th className="pb-4">الموظف</th>
                  <th className="pb-4">الدور</th>
                  <th className="pb-4">الحالة</th>
                  <th className="pb-4">آخر تواجد</th>
                  <th className="pb-4"></th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {staffData.map((staff, i) => (
                  <tr key={i} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
                           <img src={`https://i.pravatar.cc/150?u=${staff.name}`} alt={staff.name} />
                        </div>
                        <span className="font-bold text-slate-900">{staff.name}</span>
                      </div>
                    </td>
                    <td className="py-5"><span className="text-slate-500 font-medium">{staff.role}</span></td>
                    <td className="py-5">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold",
                        staff.status === "نشط" ? "bg-emerald-50 text-emerald-600" : 
                        staff.status === "غير متواجد" ? "bg-orange-50 text-orange-600" : "bg-blue-50 text-blue-600"
                      )}>
                        {staff.status}
                      </span>
                    </td>
                    <td className="py-5 font-bold text-[10px] text-slate-400">{staff.lastSeen}</td>
                    <td className="py-5 text-left">
                      <button className="p-2 text-slate-300 hover:text-slate-600 transition-colors">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Side Module: Alerts/Tasks */}
          <div className="col-span-2 space-y-8">
            <div className="bg-white p-4 rounded-[32px] shadow-sm border border-slate-50 space-y-4">
              <div className="flex items-center justify-between px-2">
                <h3 className="text-sm font-bold text-slate-900">تواصل اليوم</h3>
                <span className="text-[10px] font-bold bg-[#256af4] text-white px-2 py-0.5 rounded-full">١٢ مهمة</span>
              </div>
              
              <div className="space-y-3">
                <div className="p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-slate-900">روبرت فوكس</span>
                    <span className="text-[10px] text-slate-400 font-medium">تحديد موعد الإغلاق</span>
                  </div>
                  <button className="bg-[#256af4] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-md shadow-blue-200">اتصل الآن</button>
                </div>
                
                <div className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between opacity-60">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-slate-900">دين كوفر</span>
                    <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">إرسال ملفات المتابعة</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-300">قيد الانتظار</span>
                </div>
              </div>
              
              <button className="w-full py-3 border-2 border-dashed border-slate-100 rounded-2xl text-[10px] font-bold text-slate-400 hover:border-blue-200 hover:text-blue-500 transition-all">
                + إضافة مهمة جديدة
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Registration Portal Section */}
        <section className="bg-white rounded-[40px] shadow-lg shadow-slate-100 border border-slate-50 overflow-hidden">
          <div className="p-10 border-b border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-blue-50 rounded-[28px] text-[#256af4] border-2 border-white shadow-sm ring-1 ring-blue-50">
                <Layout className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-800">بوابة التسجيل الديناميكية</h2>
                <p className="text-sm text-slate-400">تخصيص الحقول، فئات الاهتمامات، وتنبيهات فريق الميدان برمجيا مع التطبيق.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-slate-50 hover:bg-slate-100 text-slate-900 px-6 py-3 rounded-2xl text-sm font-bold border border-slate-100 flex items-center gap-2 transition-all">
                <Eye className="w-4 h-4" />
                معاينة التطبيق (PWA)
              </button>
              <button className="bg-[#256af4] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-blue-200 border-2 border-white flex items-center gap-2 hover:bg-blue-600 active:scale-95 transition-all outline outline-2 outline-blue-50">
                <Rocket className="w-4 h-4" />
                نشر التعديلات للميدان
              </button>
            </div>
          </div>

          <div className="p-10 grid grid-cols-3 gap-12 bg-slate-50/30">
             {/* Field Group 1 */}
             <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <h4 className="text-xs font-black text-slate-300 uppercase tracking-[2px]">نماذج الميدان</h4>
                 <div className="h-px bg-slate-100 flex-1 mx-4" />
               </div>
               
               <div className="space-y-3">
                 <div className="p-1.5 pr-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                       <Layout className="w-4 h-4" />
                     </div>
                     <span className="text-xs font-bold text-slate-900">بيانات المسوقين</span>
                   </div>
                   <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-lg">
                      <button className="p-1 hover:text-blue-500"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1 hover:text-red-500"><Trash2 className="w-3.5 h-3.5" /></button>
                   </div>
                 </div>

                 <div className="p-1.5 pr-4 bg-white/50 rounded-2xl border border-dashed border-slate-200 flex items-center justify-center py-4 cursor-pointer hover:bg-white hover:border-blue-200 transition-all">
                   <span className="text-[10px] font-bold text-slate-400">+ إضافة نموذج إدخال</span>
                 </div>
               </div>
             </div>

             {/* Field Group 2 - Visual Toggles */}
             <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <h4 className="text-xs font-black text-slate-300 uppercase tracking-[2px]">إدارة الحقول المخصصة</h4>
                 <div className="h-px bg-slate-100 flex-1 mx-4" />
               </div>

               <div className="space-y-4">
                 <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
                       <Building2 className="w-5 h-5" />
                     </div>
                     <div className="flex flex-col">
                       <span className="text-xs font-bold text-slate-900">رقم لوحة السيارة</span>
                       <span className="text-[10px] text-slate-400">نوع الإدخال: نص (معدل)</span>
                     </div>
                   </div>
                   <motion.div whileTap={{ scale: 0.9 }} className="w-11 h-6 bg-emerald-500 rounded-full cursor-pointer relative p-1 shadow-inner">
                      <div className="w-4 h-4 bg-white rounded-full mr-auto shadow-sm" />
                   </motion.div>
                 </div>

                 <div className="p-4 bg-white/60 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between opacity-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900">تاريخ البدء المتوقع</span>
                        <span className="text-[10px] text-slate-400">نوع الإدخال: تاريخ</span>
                      </div>
                    </div>
                    <div className="w-11 h-6 bg-slate-200 rounded-full cursor-not-allowed p-1">
                      <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
               </div>
             </div>

             {/* Alerts Management */}
             <div className="space-y-6">
               <div className="flex items-center justify-between">
                 <h4 className="text-xs font-black text-slate-300 uppercase tracking-[2px]">التنبيهات والذكاء</h4>
                 <div className="h-px bg-slate-100 flex-1 mx-4" />
               </div>

               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center space-y-2">
                   <div className="w-10 h-10 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mx-auto">
                     <AlertCircle className="w-5 h-5" />
                   </div>
                   <p className="text-[10px] font-bold text-slate-900">حالات طارئة</p>
                 </div>
                 <div className="bg-[#256af4]/5 p-4 rounded-3xl border border-[#256af4]/10 shadow-sm text-center space-y-2 border-2 outline outline-2 outline-blue-50">
                   <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-blue-200">
                     <BellRing className="w-5 h-5" />
                   </div>
                   <p className="text-[10px] font-bold text-[#256af4]">تنبيهات البناء</p>
                 </div>
               </div>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
