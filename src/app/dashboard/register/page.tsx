"use client";

import React, { useState } from "react";
import { 
  ArrowRight, 
  User as UserIcon, 
  Smartphone, 
  MapPin, 
  Users2, 
  Baby, 
  Star, 
  PlusCircle, 
  FileText,
  MessageCircle,
  Calendar,
  CheckCircle2,
  Tag,
  Hash,
  Type
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const { addClient, interests, fields, isLoaded } = useStore();
  const [gender, setGender] = useState<"male" | "female">("male");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customFieldValues, setCustomFieldValues] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    district: "الوسط",
    location: "",
    age: 25,
    housingStatus: "ملك",
    children: 0,
    grades: "",
    notes: ""
  });

  if (!isLoaded) return null;

  const toggleInterest = (label: string) => {
    if (selectedInterests.includes(label)) {
      setSelectedInterests(selectedInterests.filter(i => i !== label));
    } else {
      setSelectedInterests([...selectedInterests, label]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Combine notes with custom fields for now to preserve all data
    let finalNotes = formData.notes;
    Object.entries(customFieldValues).forEach(([label, value]) => {
        finalNotes += `\n[${label}: ${value}]`;
    });

    addClient({
      ...formData,
      gender,
      interests: selectedInterests,
      notes: finalNotes
    });
    router.push("/dashboard/log");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-tajawal pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/dashboard" className="p-2 -mr-2 text-slate-400 hover:text-slate-600">
          <ArrowRight className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold text-slate-900">تسجيل عميل جديد</h1>
        <div className="w-10" />
      </header>

      <main className="p-6 space-y-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Section: Basic Info */}
          <section className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center gap-2 text-[#256af4]">
              <Smartphone className="w-5 h-5" />
              <h3 className="font-black text-sm">بيانات التواصل الأساسية</h3>
            </div>
            
            <div className="space-y-4">
               <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 pr-1">الاسم الكامل للعميل</label>
                  <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required className="w-full py-4 px-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#256af4] text-right" />
               </div>
               <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-400 pr-1">رقم الجوال</label>
                     <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} required className="w-full py-4 px-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-left" dir="ltr" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-400 pr-1">الواتساب</label>
                     <input type="tel" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="نفس الرقم" className="w-full py-4 px-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-right" />
                  </div>
               </div>
            </div>
          </section>

          {/* Section: Dynamic Fields */}
          {fields.filter(f => f.active).length > 0 && (
            <section className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-50 space-y-6">
              <div className="flex items-center gap-2 text-[#256af4]">
                <PlusCircle className="w-5 h-5" />
                <h3 className="font-black text-sm">بيانات إضافية مطلوبة</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                 {fields.filter(f => f.active).map(field => (
                   <div key={field.id} className="space-y-1">
                      <div className="flex items-center justify-between px-1">
                         <span className="text-[10px] font-bold text-slate-400">{field.label}</span>
                         {field.type === "date" ? <Calendar className="w-3.5 h-3.5 text-slate-300" /> : <Type className="w-3.5 h-3.5 text-slate-300" />}
                      </div>
                      <input 
                        type={field.type} 
                        value={customFieldValues[field.label] || ""}
                        onChange={e => setCustomFieldValues({...customFieldValues, [field.label]: e.target.value})}
                        className="w-full py-4 px-4 bg-slate-50 border border-slate-50 rounded-2xl outline-none focus:border-[#256af4] text-right"
                      />
                   </div>
                 ))}
              </div>
            </section>
          )}

          {/* Section: Interests (Dynamic) */}
          <section className="space-y-4">
             <div className="flex items-center gap-2 text-[#256af4]">
                <Tag className="w-5 h-5" />
                <h3 className="font-black text-sm">اهتمامات العميل (اختر ما ينطبق)</h3>
             </div>
             <div className="flex flex-wrap gap-2">
                {interests.map(interest => (
                  <button 
                    key={interest.id} type="button" onClick={() => toggleInterest(interest.label)}
                    className={cn(
                      "px-5 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-2",
                      selectedInterests.includes(interest.label) ? "bg-[#256af4] text-white border-[#256af4] shadow-lg shadow-blue-100" : "bg-white text-slate-500 border-slate-100 hover:border-blue-200"
                    )}
                  >
                    {selectedInterests.includes(interest.label) && <CheckCircle2 className="w-4 h-4" />}
                    {interest.label}
                  </button>
                ))}
             </div>
          </section>

          {/* Section: Demographics */}
          <section className="space-y-4">
             <div className="flex items-center gap-2 text-[#256af4]">
                <MapPin className="w-5 h-5" />
                <h3 className="font-black text-sm">الموقع والديموغرافيا</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-400">الحي / المنطقة</label>
                   <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full py-4 px-4 bg-white border border-slate-100 rounded-2xl outline-none" />
                </div>
                <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-400">العمر التقديري</label>
                   <input type="number" value={formData.age} onChange={e => setFormData({...formData, age: parseInt(e.target.value)})} className="w-full py-4 px-4 bg-white border border-slate-100 rounded-2xl outline-none" />
                </div>
             </div>
          </section>

          {/* Section: Housing & Family */}
          <section className="grid grid-cols-2 gap-6">
             <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 pr-1">نوع السكن</label>
                <div className="flex flex-col gap-2">
                   {["إيجار", "ملك", "غير محدد"].map(s => (
                     <button key={s} type="button" onClick={() => setFormData({...formData, housingStatus: s})} className={cn("py-3 px-4 border rounded-xl text-xs font-bold transition-all", formData.housingStatus === s ? "bg-[#256af4] text-white border-[#256af4]" : "bg-white text-slate-500 border-slate-100")}>{s}</button>
                   ))}
                </div>
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-bold text-slate-400 pr-1">عدد الأبناء</label>
                <input type="number" value={formData.children} onChange={e => setFormData({...formData, children: parseInt(e.target.value)})} className="w-full py-4 px-4 bg-white border border-slate-100 rounded-2xl outline-none h-full max-h-[141px]" />
             </div>
          </section>

          {/* Section: Notes */}
          <section className="space-y-3 pt-4">
             <div className="flex items-center gap-2 text-[#256af4] mb-1">
                <MessageCircle className="w-5 h-5" />
                <h3 className="font-black text-sm">ملاحظات المسوق</h3>
             </div>
             <textarea value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} rows={4} placeholder="أدخل أي ملاحظات إضافية هنا..." className="w-full p-5 bg-white border border-slate-100 rounded-[28px] outline-none focus:border-[#256af4] transition-all resize-none text-sm" />
          </section>

          <motion.button type="submit" whileTap={{ scale: 0.98 }} className="w-full py-5 bg-[#256af4] text-white font-black rounded-[28px] shadow-2xl shadow-blue-200 mt-6 flex items-center justify-center gap-3">
             <PlusCircle className="w-6 h-6" />
             <span className="text-lg">إتمام التسجيل وحفظ الاستمارة</span>
          </motion.button>
        </form>
      </main>
    </div>
  );
}
