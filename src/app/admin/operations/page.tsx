"use client";

import React, { useState } from "react";
import { 
  Settings2, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Layers, 
  Type, 
  Calendar, 
  Hash, 
  List, 
  Download,
  FileSpreadsheet,
  Save,
  ChevronRight,
  Sparkles,
  Zap,
  Globe,
  Tag,
  MapPin,
  Edit2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useStore, Interest, CustomField } from "@/lib/store";
import { cn } from "@/lib/utils";

export default function OperationsPage() {
  const { 
    interests, fields, clients,
    addInterest, updateInterest, deleteInterest, 
    toggleField, addField, updateField, deleteField,
    isLoaded 
  } = useStore();

  const [newInterest, setNewInterest] = useState({ label: "", category: "عام" });
  const [newField, setNewField] = useState({ label: "", type: "text" });
  const [activeTab, setActiveTab] = useState<"fields" | "interests">("fields");
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  if (!isLoaded) return null;

  const handleExportAllClients = () => {
    if (clients.length === 0) return;
    
    // Build HTML representation of the table so Excel parses it clearly into columns automatically
    const tableHtml = `
      <html xmlns:x="urn:schemas-microsoft-com:office:excel">
        <head>
          <meta charset="utf-8">
          <!--[if gte mso 9]>
          <xml>
              <x:ExcelWorkbook>
                  <x:ExcelWorksheets>
                      <x:ExcelWorksheet>
                          <x:Name>Sheet 1</x:Name>
                          <x:WorksheetOptions>
                              <x:DisplayRightToLeft/>
                          </x:WorksheetOptions>
                      </x:ExcelWorksheet>
                  </x:ExcelWorksheets>
              </x:ExcelWorkbook>
          </xml>
          <![endif]-->
        </head>
        <body dir="rtl">
          <table border="1">
            <thead>
              <tr>
                <th style="background-color: #256af4; color: white;">ID</th>
                <th style="background-color: #256af4; color: white;">الاسم</th>
                <th style="background-color: #256af4; color: white;">رقم الجوال</th>
                <th style="background-color: #256af4; color: white;">الواتساب</th>
                <th style="background-color: #256af4; color: white;">المنطقة/المدينة</th>
                <th style="background-color: #256af4; color: white;">الحي</th>
                <th style="background-color: #256af4; color: white;">العمر</th>
                <th style="background-color: #256af4; color: white;">الجنس</th>
                <th style="background-color: #256af4; color: white;">نوع السكن</th>
                <th style="background-color: #256af4; color: white;">الأبناء</th>
                <th style="background-color: #256af4; color: white;">المراحل الدراسية</th>
                <th style="background-color: #256af4; color: white;">الاهتمامات</th>
                <th style="background-color: #256af4; color: white;">تاريخ التسجيل</th>
                <th style="background-color: #256af4; color: white;">الملاحظات</th>
              </tr>
            </thead>
            <tbody>
              ${clients.map(c => `
                <tr>
                  <td>${c.id}</td>
                  <td>${c.name}</td>
                  <td style="mso-number-format:'\\@'">${c.phone}</td>
                  <td style="mso-number-format:'\\@'">${c.whatsapp || c.phone}</td>
                  <td>${c.location}</td>
                  <td>${c.district}</td>
                  <td>${c.age}</td>
                  <td>${c.gender === "male" ? "ذكر" : "أنثى"}</td>
                  <td>${c.housingStatus}</td>
                  <td>${c.children}</td>
                  <td>${c.grades}</td>
                  <td>${c.interests.join("، ")}</td>
                  <td>${new Date(c.createdAt).toLocaleDateString("ar-SA")}</td>
                  <td>${c.notes}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `تقرير_العملاء_الشامل_${new Date().toLocaleDateString("ar-SA")}.xls`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleEditClick = (item: any) => {
    setEditingItemId(item.id);
    if (activeTab === "fields") {
      setNewField({ label: item.label, type: item.type });
    } else {
      setNewInterest({ label: item.label, category: item.category });
    }
    // Scroll to top using native window API quietly
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingItemId(null);
    if (activeTab === "fields") {
      setNewField({ label: "", type: "text" });
    } else {
      setNewInterest({ label: "", category: "عام" });
    }
  };

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-tajawal">
      <AdminSidebar />
      
      <main className="flex-1 mr-72 p-10 pb-20 space-y-10">
        <section className="flex items-center justify-between bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
           <div className="space-y-1">
              <h1 className="text-3xl font-black text-slate-900">إدارة بوابة التسجيل</h1>
              <p className="text-slate-400 text-sm font-medium">تخصيص الحقول، فئات الاهتمامات، وتصدير البيانات الشاملة</p>
           </div>
           <button 
             onClick={handleExportAllClients}
             className="bg-emerald-500 text-white px-8 py-4 rounded-2xl text-sm font-bold shadow-xl shadow-emerald-100 flex items-center gap-3 hover:bg-emerald-600 active:scale-95 transition-all"
           >
             <FileSpreadsheet className="w-5 h-5" />
             <span>تصدير كافة العملاء (Excel)</span>
           </button>
        </section>

        <div className="flex gap-4 p-2 bg-slate-100/50 w-fit rounded-2xl border border-slate-100">
           <button 
             onClick={() => { setActiveTab("fields"); handleCancelEdit(); }}
             className={cn("px-8 py-3 rounded-xl text-sm font-black transition-all", activeTab === "fields" ? "bg-[#256af4] text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
           >تخصيص الحقول (الاسم، الجوال، إلخ)</button>
           <button 
             onClick={() => { setActiveTab("interests"); handleCancelEdit(); }}
             className={cn("px-8 py-3 rounded-xl text-sm font-black transition-all", activeTab === "interests" ? "bg-[#256af4] text-white shadow-lg" : "text-slate-400 hover:text-slate-600")}
           >تخصيص الاهتمامات (ملابس، وجبات، إلخ)</button>
        </div>

        {activeTab === "fields" && (
           <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center gap-3 pr-2">
                 <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                 <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">حقول النظام الثابتة (إلزامية)</h4>
              </div>
              <div className="grid grid-cols-4 gap-4">
                 {[
                    { label: "الاسم الكامل", type: "نص", icon: Type },
                    { label: "رقم الجوال", type: "هاتف", icon: Hash },
                    { label: "الواتساب", type: "هاتف", icon: Globe },
                    { label: "المنطقة / الحي", type: "نص", icon: MapPin }
                 ].map((sf, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-dotted border-slate-200 flex items-center gap-4 opacity-100">
                       <div className="p-3 bg-slate-50 rounded-xl text-slate-400"><sf.icon className="w-4 h-4" /></div>
                       <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-900">{sf.label}</span>
                          <span className="text-[10px] font-bold text-emerald-500">حقل نظام ثابت</span>
                       </div>
                    </div>
                 ))}
              </div>
           </motion.section>
        )}

        <div className="grid grid-cols-12 gap-10">
           <div className="col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6 sticky top-10">
                 <div className="flex items-center gap-3 text-[#256af4]">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="text-lg font-black text-slate-900">
                      {editingItemId ? (activeTab === "fields" ? "تعديل الحقل" : "تعديل الاهتمام") : (activeTab === "fields" ? "إضافة حقل جديد" : "إضافة اهتمام جديد")}
                    </h3>
                 </div>

                 {activeTab === "fields" ? (
                    <div className="space-y-4 text-right">
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 pr-2">اسم الحقل (مثلاً: رقم اللوحة)</label>
                          <input 
                            type="text" value={newField.label} onChange={e => setNewField({...newField, label: e.target.value})}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" 
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 pr-2">نوع الإدخال</label>
                          <select 
                            value={newField.type} onChange={e => setNewField({...newField, type: e.target.value as any})}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none appearance-none"
                          >
                             <option value="text">نص مخصص</option>
                             <option value="number">رقم</option>
                             <option value="date">تاريخ</option>
                             <option value="select">قائمة منسدلة</option>
                          </select>
                       </div>
                       <div className="flex gap-2 mt-2">
                           {editingItemId && (
                             <button onClick={handleCancelEdit} className="w-1/3 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl transition-all">إلغاء</button>
                           )}
                           <button 
                             onClick={() => { 
                               if (editingItemId) {
                                 updateField(editingItemId, newField.label, newField.type);
                                 setEditingItemId(null);
                               } else {
                                 addField(newField.label, newField.type); 
                               }
                               setNewField({ label: "", type: "text" }); 
                             }}
                             className="flex-1 py-4 bg-[#256af4] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                           >
                             {editingItemId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                             {editingItemId ? "حفظ التعديلات" : "تطبيق في بوابة التسجيل"}
                           </button>
                       </div>
                    </div>
                 ) : (
                    <div className="space-y-4 text-right">
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 pr-2">اسم الاهتمام</label>
                          <input 
                            type="text" value={newInterest.label} onChange={e => setNewInterest({...newInterest, label: e.target.value})}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none" 
                          />
                       </div>
                       <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 pr-2">الفئة الرئيسية</label>
                          <select 
                            value={newInterest.category} onChange={e => setNewInterest({...newInterest, category: e.target.value})}
                            className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none appearance-none"
                          >
                             <option>أزياء وملابس</option>
                             <option>وجبات ومطاعم</option>
                             <option>سيارات</option>
                             <option>عقارات</option>
                             <option>أثاث وديكور</option>
                             <option>عام</option>
                          </select>
                       </div>
                       <div className="flex gap-2 mt-2">
                           {editingItemId && (
                             <button onClick={handleCancelEdit} className="w-1/3 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl transition-all">إلغاء</button>
                           )}
                           <button 
                              onClick={() => { 
                                if (editingItemId) {
                                  updateInterest(editingItemId, newInterest.label, newInterest.category);
                                  setEditingItemId(null);
                                } else {
                                  addInterest(newInterest.label, newInterest.category); 
                                }
                                setNewInterest({ label: "", category: "عام" }); 
                              }}
                              className="flex-1 py-4 bg-[#256af4] text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
                           >
                             {editingItemId ? <Save className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                             {editingItemId ? "حفظ التعديلات" : "إضافة للقائمة"}
                           </button>
                       </div>
                    </div>
                 )}
              </div>
           </div>

           <div className="col-span-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                 <AnimatePresence>
                    {(activeTab === "fields" ? fields : interests).map((item: any) => (
                       <motion.div 
                         key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                         className={cn("bg-white p-6 rounded-[28px] border-2 shadow-sm flex items-center justify-between transition-all", editingItemId === item.id ? "border-[#256af4]" : "border-slate-100")}
                       >
                          <div className="flex items-center gap-4 text-right">
                             <div className={cn("p-4 bg-slate-50 rounded-2xl text-slate-400", activeTab === "fields" && item.active && "bg-blue-50 text-[#256af4]")}>
                                {activeTab === "fields" ? (
                                   item.type === "date" ? <Calendar className="w-5 h-5" /> : 
                                   item.type === "number" ? <Hash className="w-5 h-5" /> : <Type className="w-5 h-5" />
                                ) : <Tag className="w-5 h-5" />}
                             </div>
                             <div className="flex flex-col">
                                <span className="text-sm font-black text-slate-900">{item.label}</span>
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activeTab === "fields" ? `نوع: ${item.type}` : `فئة: ${item.category}`}</span>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-1 opacity-100">
                             {activeTab === "fields" && (
                               <button 
                                 onClick={() => toggleField(item.id)}
                                 title={item.active ? "عطّل الحقل" : "قم بتفعيل الحقل"}
                                 className={cn("p-2 rounded-xl text-xs font-bold transition-all", item.active ? "text-emerald-500 bg-emerald-50 hover:bg-emerald-100" : "text-slate-400 bg-slate-50 hover:bg-slate-100")}
                               >
                                  {item.active ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                               </button>
                             )}
                             <button 
                               onClick={() => handleEditClick(item)}
                               title="تعديل هذا العنصر"
                               className="p-2 text-indigo-500 bg-indigo-50 rounded-xl hover:bg-indigo-500 hover:text-white transition-all"
                             ><Edit2 className="w-5 h-5" /></button>
                             <button 
                               onClick={() => activeTab === "fields" ? deleteField(item.id) : deleteInterest(item.id)}
                               title="حذف نهائي"
                               className="p-2 text-red-500 bg-red-50 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                             ><Trash2 className="w-5 h-5" /></button>
                          </div>
                       </motion.div>
                    ))}
                 </AnimatePresence>
              </div>

              
              {((activeTab === "fields" ? fields.length : interests.length) === 0) && (
                 <div className="bg-slate-100/50 p-20 rounded-[40px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-4 text-slate-300">
                    <Layers className="w-16 h-16" />
                    <p className="font-bold">لا توجد عناصر مضافة بعد</p>
                 </div>
              )}
           </div>
        </div>
      </main>
    </div>
  );
}
