"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:3001/api/auth/me", {
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
    window.location.href = "/"; // redirige al home
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold text-green-400 hover:text-green-300 transition-colors">
        ProductStore
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/" className="hover:text-green-400">Productos</Link>
        {user?.role === "ADMIN" && (
          <Link href="/admin" className="hover:text-green-400">Admin</Link>
        )}
        {!user ? (
          <>
            <Link href="/login" className="hover:text-green-400">Login</Link>
            <Link href="/register" className="hover:text-green-400">Registro</Link>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <span className="font-semibold text-green-400">
              {user.username} ({user.role})
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded-md hover:bg-red-700 transition-colors text-sm font-semibold"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
