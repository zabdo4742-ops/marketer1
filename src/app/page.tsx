"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Megaphone, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Chrome,
  UserPlus
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("+966500000000");
  const [password, setPassword] = useState("123456");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone && password) {
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#f8fafc]">
      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">FieldPro Marketing</h1>
          <div className="w-10 h-10 bg-[#256af4] rounded-lg flex items-center justify-center">
            <Megaphone className="text-white w-6 h-6 transform -rotate-12" />
          </div>
        </div>

        {/* Hero Illustration/Image */}
        <div className="w-full relative aspect-[1.4/1] mb-8 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#134e4a]/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000" 
            alt="Field Marketing Team"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">مرحباً بك مجدداً</h2>
          <p className="text-slate-500 text-sm">أدخل بيانات اعتمادك للوصول إلى لوحة التحكم الميدانية</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full space-y-5">
          {/* Phone Input */}
          <div className="space-y-1.5 focus-within:text-[#256af4] transition-colors">
            <label className="text-xs font-medium text-slate-500 pr-1">رقم الهاتف</label>
            <div className="relative">
              <input 
                type="tel" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+966..."
                className="w-full py-3.5 pl-4 pr-11 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#256af4] focus:ring-4 focus:ring-blue-50 transition-all text-left dir-ltr"
              />
              <Phone className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 focus-within:text-[#256af4] transition-colors">
            <label className="text-xs font-medium text-slate-500 pr-1">كلمة المرور</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full py-3.5 pl-11 pr-11 bg-white border border-slate-200 rounded-xl outline-none focus:border-[#256af4] focus:ring-4 focus:ring-blue-50 transition-all text-left dir-ltr"
              />
              <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 hover:bg-slate-50 rounded-lg text-slate-400 focus:text-[#256af4] transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-left py-1">
            <a href="#" className="text-xs font-semibold text-[#256af4] hover:underline">نسيت كلمة المرور؟</a>
          </div>

          {/* Login Button */}
          <button 
            type="submit"
            className="w-full py-3.5 bg-[#256af4] text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-600 active:scale-[0.98] transition-all"
          >
            تسجيل الدخول
          </button>
        </form>

        <div className="w-full space-y-5">
          {/* Divider */}
          <div className="flex items-center gap-4 py-2 opacity-50">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500">جديد في FieldPro؟</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Google Login */}
          <button 
            type="button"
            onClick={handleLogin}
            className="w-full py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm"
          >
            <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
            <span>تسجيل الدخول باستخدام جوجل</span>
          </button>

          {/* Request Account Button */}
          <button className="w-full py-3.5 bg-blue-50 text-[#256af4] font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-blue-100 transition-all border border-blue-100">
            <UserPlus className="w-5 h-5" />
            <span>طلب إنشاء حساب</span>
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center space-y-1">
          <p className="text-[10px] text-slate-400">
            بتسجيل الدخول، أنت توافق على 
            <a href="#" className="text-[#256af4] hover:underline mx-1">شروط الخدمة</a> 
            و 
            <a href="#" className="text-[#256af4] hover:underline mx-1">سياسة الخصوصية</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
