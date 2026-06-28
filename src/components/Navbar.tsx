"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function Navbar() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setUser(data.data);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-xl font-extrabold text-slate-900 tracking-tight">
              Product<span className="text-indigo-600">Store</span>
            </span>
          </Link>

          {/* Enlaces */}
          <div className="flex items-center gap-6">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
              Catálogo
            </Link>
            
            {user?.role === "ADMIN" && (
              <Link href="/admin" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Panel Admin
              </Link>
            )}

            {/* Autenticación */}
            {!user ? (
              <div className="flex items-center gap-3 border-l border-slate-200 pl-6 ml-2">
                <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                  Ingresar
                </Link>
                <Link href="/register" className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition-colors">
                  Registrarse
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 border-l border-slate-200 pl-6 ml-2">
                <div className="flex flex-col text-right">
                  <span className="text-sm font-bold text-slate-900 leading-none">{user.username}</span>
                  <span className="text-xs text-indigo-600 font-medium mt-1">{user.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors text-sm font-medium"
                >
                  Salir
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
}