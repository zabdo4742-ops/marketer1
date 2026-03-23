"use client";

import React, { useState } from "react";
import { 
  Users, 
  TrendingUp, 
  CalendarCheck, 
  Search, 
  Printer, 
  FileText, 
  FileSpreadsheet,
  Star,
  MoreVertical,
  ChevronRight,
  ChevronLeft,
  UserPlus,
  X,
  CheckCircle2,
  Calendar,
  Layers,
  ShoppingBag,
  ExternalLink,
  ShoppingCart,
  Phone,
  ArrowRight,
  MapPin,
  Home,
  MessageSquare,
  Baby,
  GraduationCap,
  Globe,
  User as UserIcon,
  History as HistoryIcon,
  Lock,
  PauseCircle,
  PlayCircle,
  Trash2,
  Edit2,
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useStore, Staff } from "@/lib/store";
import { cn } from "@/lib/utils";

const stats = [
  { label: "إجمالي الموظفين", value: "124", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "متوسط الأداء اليومي", value: "92%", icon: TrendingUp, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "تسجيلات اليوم", value: "842", icon: CalendarCheck, color: "text-indigo-500", bg: "bg-indigo-50" },
];

export default function StaffManagementPage() {
  const { staff, isLoaded, addStaff, updateStaff, deleteStaff, clients } = useStore();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [modalType, setModalType] = useState<"performance" | "log" | "clientDetail" | null>(null);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  
  // Form state for staff
  const [formData, setFormData] = useState({
    name: "",
    role: "مندوب ميداني",
    phone: "",
    password: "",
    image: `https://i.pravatar.cc/150?u=${Math.random()}`
  });

  if (!isLoaded) return null;

  const handleOpenAdd = () => {
    setFormData({
      name: "",
      role: "مندوب ميداني",
      phone: "",
      password: "",
      image: `https://i.pravatar.cc/150?u=${Math.random()}`
    });
    setEditingStaff(null);
    setShowAddModal(true);
  };

  const handleOpenEdit = (member: Staff) => {
    setFormData({
      name: member.name,
      role: member.role,
      phone: member.phone,
      password: member.password || "",
      image: member.image
    });
    setEditingStaff(member);
    setShowAddModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStaff) {
      updateStaff(editingStaff.id, formData);
    } else {
      addStaff({
        ...formData,
        tasksDone: 0,
        monthlyTasks: 0,
        rating: 5.0,
        status: "Active",
        active: true
      });
    }
    setShowAddModal(false);
  };

  const toggleStaffStatus = (member: Staff) => {
    const newActive = !member.active;
    updateStaff(member.id, { 
      active: newActive,
      status: newActive ? "Active" : "Suspended"
    });
  };

  const openDetails = (member: any, type: "performance" | "log") => {
    setSelectedStaff(member);
    setModalType(type);
  };

  const openClientDetail = (client: any) => {
    setSelectedClient(client);
    setModalType("clientDetail");
  };

  const goBackToLog = () => {
    setModalType("log");
    setSelectedClient(null);
  };

  const exportToPDF = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const exportToExcel = () => {
    if (!selectedClient) return;

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
                <th style="background-color: #256af4; color: white;">الاسم</th>
                <th style="background-color: #256af4; color: white;">رقم الجوال</th>
                <th style="background-color: #256af4; color: white;">الواتساب</th>
                <th style="background-color: #256af4; color: white;">المنطقة/المدينة</th>
                <th style="background-color: #256af4; color: white;">الحي</th>
                <th style="background-color: #256af4; color: white;">العمر</th>
                <th style="background-color: #256af4; color: white;">الجنس</th>
                <th style="background-color: #256af4; color: white;">نوع السكن</th>
                <th style="background-color: #256af4; color: white;">الأبناء</th>
                <th style="background-color: #256af4; color: white;">المراحل والملاحظات</th>
                <th style="background-color: #256af4; color: white;">الاهتمامات</th>
                <th style="background-color: #256af4; color: white;">تاريخ التسجيل</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${selectedClient.name || "-"}</td>
                <td style="mso-number-format:'\\@'">${selectedClient.phone || "-"}</td>
                <td style="mso-number-format:'\\@'">${selectedClient.whatsapp || selectedClient.phone || "-"}</td>
                <td>${selectedClient.location || "-"}</td>
                <td>${selectedClient.district || "-"}</td>
                <td>${selectedClient.age || "-"}</td>
                <td>${selectedClient.gender === "male" ? "ذكر" : selectedClient.gender === "female" ? "أنثى" : "-"}</td>
                <td>${selectedClient.housingStatus || "-"}</td>
                <td>${selectedClient.children || "0"}</td>
                <td>${selectedClient.grades || selectedClient.notes || "-"}</td>
                <td>${selectedClient.interests && Array.isArray(selectedClient.interests) ? selectedClient.interests.join("، ") : "-"}</td>
                <td>${new Date(selectedClient.createdAt || Date.now()).toLocaleDateString('ar-SA')}</td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    `;

    const blob = new Blob([tableHtml], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `تقرير_عميل_${selectedClient.name}.xls`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-tajawal print:bg-white">
      <div className="print:hidden">
        <AdminSidebar />
      </div>
      
      <main className="flex-1 mr-72 p-10 pb-20 space-y-10 print:mr-0 print:p-0">
        <div className="flex items-center justify-between print:hidden">
          <div className="flex items-center gap-6">
            <div className="relative w-80">
              <input 
                type="text" 
                placeholder="البحث عن موظف..."
                className="w-full py-2.5 pr-11 pl-4 bg-white border border-slate-100 rounded-xl text-sm outline-none focus:ring-4 focus:ring-blue-100/50 focus:border-[#256af4] transition-all text-right shadow-sm"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="bg-[#256af4] text-white px-6 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-blue-200 flex items-center gap-2 hover:bg-blue-600 active:scale-95 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>إضافة موظف جديد</span>
          </button>
        </div>

        <div className="space-y-1 print:hidden">
          <h1 className="text-3xl font-black text-slate-900">إدارة الموظفين</h1>
          <p className="text-slate-400 text-sm font-medium">متابعة الأداء وتعديل بيانات تسجيل الدخول وتغيير الحالات</p>
        </div>

        <div className="grid grid-cols-3 gap-6 print:hidden">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-50 flex items-center justify-between group hover:border-blue-100"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</span>
                <span className="text-3xl font-black text-slate-900">{stat.value}</span>
              </div>
              <div className={`p-4 rounded-3xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}><stat.icon className="w-7 h-7" /></div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white px-8 pt-8 pb-4 rounded-[32px] shadow-sm border border-slate-50 print:hidden overflow-hidden">
          <table className="w-full text-right">
            <thead className="border-b border-slate-50 text-slate-300 text-[10px] font-bold uppercase tracking-widest">
              <tr>
                <th className="pb-4">الموظف</th>
                <th className="pb-4 text-center">الحالة</th>
                <th className="pb-4 text-center">التسجيلات</th>
                <th className="pb-4 text-left pr-4">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((member) => (
                <tr key={member.id} className={cn("group hover:bg-slate-50/50 transition-all", !member.active && "opacity-60")}>
                  <td className="py-6 flex items-center gap-4">
                    <img src={member.image} className="w-12 h-12 rounded-full object-cover shadow-sm ring-1 ring-slate-100" alt="" />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900">{member.name}</span>
                      <span className="text-[10px] text-slate-400 font-bold">{member.phone}</span>
                    </div>
                  </td>
                  <td className="py-6 text-center">
                    <span className={cn(
                        "px-3 py-1 text-[10px] font-bold rounded-lg border",
                        member.active ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-500 border-red-100"
                    )}>
                      {member.active ? "نشط" : "موقوف"}
                    </span>
                  </td>
                  <td className="py-6 text-center font-black text-slate-800 text-sm">{clients.filter(c => c.staffId === member.id).length}</td>
                  <td className="py-6 text-left">
                     <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openDetails(member, "performance")} className="p-2 bg-blue-50 text-[#256af4] rounded-xl hover:bg-blue-100 transition-all" title="تفاصيل الأداء"><TrendingUp className="w-4.5 h-4.5" /></button>
                        <button onClick={() => openDetails(member, "log")} className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all" title="سجل العملاء"><HistoryIcon className="w-4.5 h-4.5" /></button>
                        <div className="w-px h-6 bg-slate-100 mx-1" />
                        <button onClick={() => handleOpenEdit(member)} className="p-2 bg-indigo-50 text-indigo-500 rounded-xl hover:bg-indigo-100 transition-all" title="تعديل"><Edit2 className="w-4.5 h-4.5" /></button>
                        <button onClick={() => toggleStaffStatus(member)} className={cn("p-2 rounded-xl transition-all", member.active ? "bg-orange-50 text-orange-500 hover:bg-orange-100" : "bg-emerald-50 text-emerald-500 hover:bg-emerald-100")} title={member.active ? "إيقاف" : "تنشيط"}>
                            {member.active ? <PauseCircle className="w-4.5 h-4.5" /> : <PlayCircle className="w-4.5 h-4.5" />}
                        </button>
                        <button onClick={() => deleteStaff(member.id)} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all" title="حذف"><Trash2 className="w-4.5 h-4.5" /></button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      <AnimatePresence mode="wait">
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-[40px] w-full max-w-lg shadow-2xl p-10 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-black text-slate-900">{editingStaff ? "تعديل بيانات الموظف" : "إضافة موظف جديد"}</h3>
                  <button onClick={() => setShowAddModal(false)} className="p-2 bg-slate-50 rounded-xl"><X className="text-slate-400" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6 text-right">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 pr-2">الاسم الكامل</label>
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#256af4]" required />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 pr-2">رقم الجوال</label>
                        <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+966..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none text-left" dir="ltr" required />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 pr-2">الدور الوظيفي</label>
                    <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none appearance-none">
                       <option>مندوب ميداني</option>
                       <option>مدير مبيعات</option>
                       <option>خدمة عملاء</option>
                    </select>
                  </div>
                  <div className="space-y-1 relative">
                    <label className="text-[10px] font-bold text-slate-400 pr-2">كلمة المرور (للموظف)</label>
                    <input type="text" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="أدخل كلمة مرور قوية..." className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-[#256af4] pl-12" required />
                    <Lock className="absolute left-4 bottom-4 w-4 h-4 text-slate-300" />
                  </div>
                  <button type="submit" className="w-full py-4.5 bg-[#256af4] text-white font-bold rounded-2xl shadow-xl shadow-blue-100 active:scale-[0.98] transition-all">
                    {editingStaff ? "تحديث البيانات" : "حفظ بيانات الموظف وتفعيل الحساب"}
                  </button>
                </form>
            </motion.div>
          </div>
        )}

        {(selectedStaff && modalType) && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-end p-6 print:p-0 print:inset-0 print:bg-white print:backdrop-blur-none">
             <motion.div 
               key={modalType} initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
               className="bg-white h-full w-full max-w-xl rounded-[40px] shadow-2xl flex flex-col overflow-hidden print:m-0 print:rounded-none"
             >
               <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/30 print:hidden">
                 {modalType === "clientDetail" ? (
                   <button onClick={goBackToLog} className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl text-[#256af4] hover:bg-slate-50"><ArrowRight className="w-6 h-6" /></button>
                 ) : (
                   <button onClick={() => { setSelectedStaff(null); setModalType(null); }} className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl text-slate-400 hover:bg-slate-50"><X className="w-6 h-6" /></button>
                 )}
                 <h3 className="text-xl font-black text-slate-900">{modalType === "performance" ? "تفاصيل الأداء التحليلي" : modalType === "log" ? "سجل استمارات الموظف" : "معلومات العميل الكاملة"}</h3>
               </div>
               
               <div className="flex-1 overflow-y-auto p-10 space-y-8 text-right print:p-0">
                  {modalType !== "clientDetail" && (
                    <div className="flex items-center gap-6 bg-slate-50 p-6 rounded-[32px] border border-slate-100 print:bg-white print:border-none">
                        <img src={selectedStaff.image} className="w-20 h-20 rounded-3xl object-cover border-4 border-white shadow-lg print:shadow-none" alt="" />
                        <div className="space-y-1">
                          <h4 className="text-2xl font-black text-slate-900">{selectedStaff.name}</h4>
                          <span className="px-3 py-1 bg-white rounded-full text-[#256af4] border border-blue-50 text-[10px] font-bold">{selectedStaff.role}</span>
                        </div>
                    </div>
                  )}

                  {modalType === "performance" && (
                    <div className="space-y-8">
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white border border-slate-100 p-6 rounded-[28px] shadow-sm text-right space-y-1">
                             <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center mb-2 mr-auto"><CheckCircle2 className="w-6 h-6" /></div>
                             <p className="text-[10px] font-bold text-slate-400">نسبة الإنجاز</p>
                             <p className="text-3xl font-black text-slate-900">98%</p>
                          </div>
                          <div className="bg-white border border-slate-100 p-6 rounded-[28px] shadow-sm text-right space-y-1">
                             <div className="w-10 h-10 bg-blue-50 text-[#256af4] rounded-xl flex items-center justify-center mb-2 mr-auto"><ShoppingCart className="w-6 h-6" /></div>
                             <p className="text-[10px] font-bold text-slate-400">عمليات البيع</p>
                             <p className="text-3xl font-black text-slate-900">142</p>
                          </div>
                       </div>
                    </div>
                  )}

                  {modalType === "log" && (
                    <div className="space-y-4">
                       <h5 className="text-sm font-bold text-slate-800 px-1">سجل استمارات العمل ({clients.filter(c => c.staffId === selectedStaff.id).length} استمارة)</h5>
                       {clients.filter(c => c.staffId === selectedStaff.id).map((client: any, i) => (
                         <button key={client.id || i} onClick={() => openClientDetail(client)} className="w-full bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-200 transition-all group">
                            <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-[#256af4]" />
                            <div className="flex items-center gap-4">
                               <div className="flex flex-col text-right">
                                  <span className="text-sm font-bold text-slate-900">{client.name || `عميل #${i+1}`}</span>
                                  <span className="text-[10px] text-slate-400 font-medium">{client.id || `REG-882${i}`} • الرياض</span>
                               </div>
                               <div className="w-12 h-12 bg-blue-50 text-[#256af4] rounded-2xl flex items-center justify-center"><ShoppingBag className="w-6 h-6" /></div>
                            </div>
                         </button>
                       ))}
                    </div>
                  )}

                  {modalType === "clientDetail" && selectedClient && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8 pb-10">
                       <div className="hidden print:flex items-center justify-between mb-8 border-b-2 border-slate-900 pb-4">
                          <div className="text-right"><h2 className="text-2xl font-black">تقرير بيانات العميل</h2><p className="text-xs text-slate-500">تم الاستخراج بواسطة FieldPro Marketing</p></div>
                          <div className="text-left font-bold text-xs">تاريخ الاستخراج: {new Date().toLocaleDateString('ar-SA')}</div>
                       </div>
                       <div className="bg-slate-50 p-8 rounded-[40px] border border-slate-100 flex flex-col items-center gap-4 text-center print:bg-white print:border-none">
                          <div className="w-24 h-24 bg-white rounded-[32px] shadow-xl flex items-center justify-center text-[#256af4] border-4 border-slate-50 px-2 print:shadow-none"><Users className="w-12 h-12" /></div>
                          <div><h4 className="text-2xl font-black text-slate-900">{selectedClient.name}</h4><p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{selectedClient.id}</p></div>
                       </div>
                       <div className="grid grid-cols-2 gap-4">
                          {[
                            { label: "رقم الجوال", value: selectedClient.phone, icon: Phone, color: "text-blue-500" },
                            { label: "رقم واتساب", value: selectedClient.whatsapp || selectedClient.phone, icon: MessageSquare, color: "text-emerald-500" },
                            { label: "المنطقة/المدينة", value: selectedClient.location || "الرياض", icon: MapPin, color: "text-red-500" },
                            { label: "نوع السكن", value: selectedClient.housingStatus || "غير محدد", icon: Home, color: "text-slate-500" },
                            { label: "الاهتمامات المسجلة", value: selectedClient.interests && Array.isArray(selectedClient.interests) ? selectedClient.interests.join("، ") : "لا يوجد اهتمامات", icon: Tag, color: "text-purple-500" },
                            { label: "الملاحظات الإضافية", value: selectedClient.notes || "لا يوجد", icon: FileText, color: "text-orange-500" }
                          ].map((f, idx) => (
                            <div key={idx} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex flex-col gap-2 print:border-slate-50">
                               <div className="flex items-center justify-between"><f.icon className={cn("w-4 h-4", f.color)} /><span className="text-[10px] font-bold text-slate-400">{f.label}</span></div>
                               <p className="text-xs font-black text-slate-900 leading-relaxed">{f.value || "-"}</p>
                            </div>
                          ))}
                       </div>
                    </motion.div>
                  )}
               </div>
               
               <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex flex-col gap-3 print:hidden">
                  {modalType === "clientDetail" && (
                    <div className="flex gap-3">
                        <button onClick={exportToPDF} className="flex-1 py-4.5 bg-[#256af4] text-white font-bold rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-3 hover:bg-blue-600 active:scale-95 transition-all"><Printer className="w-5 h-5" />تصدير PDF</button>
                        <button onClick={exportToExcel} className="flex-1 py-4.5 bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 hover:bg-emerald-600 active:scale-95 transition-all"><FileSpreadsheet className="w-5 h-5" />تصدير Excel</button>
                    </div>
                  )}
                  <button onClick={() => { setSelectedStaff(null); setModalType(null); setSelectedClient(null); }} className={cn("py-4.5 font-bold rounded-2xl transition-all shadow-sm", modalType === "clientDetail" ? "px-10 bg-white border border-slate-100 text-slate-400" : "w-full bg-slate-900 text-white")}>إغلاق النافذة</button>
               </div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
