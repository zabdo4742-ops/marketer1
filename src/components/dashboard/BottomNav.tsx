"use client";

import React from "react";
import { 
  Home, 
  BarChart2, 
  History as HistoryIcon, 
  User as UserIcon 
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { 
      label: "الرئيسية", 
      icon: Home, 
      path: "/dashboard" 
    },
    { 
      label: "الإحصائيات", 
      icon: BarChart2, 
      path: "/dashboard/stats" 
    },
    { 
      label: "السجل", 
      icon: HistoryIcon, 
      path: "/dashboard/log" 
    },
    { 
      label: "الملف الشخصي", 
      icon: UserIcon, 
      path: "/dashboard/profile" 
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-2 flex items-center justify-between shadow-[0_-4px_20px_0_rgba(0,0,0,0.03)] z-50">
      {navItems.map((item) => {
        const isActive = pathname === item.path;
        const Icon = item.icon;
        
        return (
          <Link 
            key={item.path} 
            href={item.path}
            className="flex flex-col items-center gap-1 group"
          >
            <div className={cn(
              "p-2 rounded-xl transition-all",
              isActive ? "text-[#256af4]" : "text-slate-400 group-hover:text-slate-600"
            )}>
              <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
            </div>
            <span className={cn(
              "text-[10px] font-bold transition-all",
              isActive ? "text-[#256af4]" : "text-slate-400 group-hover:text-slate-600"
            )}>
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
