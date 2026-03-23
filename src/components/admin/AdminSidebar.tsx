"use client";

import React from "react";
import { 
  LayoutDashboard, 
  Users, 
  Settings2, 
  BellRing, 
  ClipboardList,
  LogOut,
  ChevronLeft
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { label: "لوحة التحكم", icon: LayoutDashboard, path: "/admin" },
    { label: "الموظفون", icon: Users, path: "/admin/staff" },
    { label: "إدارة الحقول والاهتمامات", icon: Settings2, path: "/admin/operations" },
    { label: "تنبيهات الميدان", icon: BellRing, path: "/admin/alerts" },
    { label: "الإعدادات", icon: ClipboardList, path: "/admin/settings" },
  ];

  return (
    <aside className="w-72 bg-white border-l border-slate-100 flex flex-col h-screen fixed right-0 top-0 z-50">
      {/* Branding */}
      <div className="p-8 pb-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#256af4] rounded-xl flex items-center justify-center text-white">
          <Settings2 className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none italic">المسوق الاحترافي</h2>
          <span className="text-[10px] font-bold text-slate-400 mt-1">بوابة الإدارة</span>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.path} 
              href={item.path}
              className={cn(
                "flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all group",
                isActive 
                  ? "bg-[#256af4] text-white shadow-lg shadow-blue-100/50" 
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-white" : "text-slate-400 group-hover:text-slate-900")} />
              <span>{item.label}</span>
              {isActive && (
                <div className="mr-auto">
                  <ChevronLeft className="w-4 h-4 opacity-70" />
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User / Logout */}
      <div className="p-6 border-t border-slate-50">
        <div className="bg-blue-50/80 p-4 rounded-2xl flex items-center gap-3 border border-blue-100/50">
          <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
             <LayoutDashboard className="w-5 h-5 text-[#256af4]" />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-xs font-bold text-[#256af4]">المدير زكريا</span>
            <span className="text-[10px] font-medium text-slate-400">الإدارة المركزية</span>
          </div>
          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
