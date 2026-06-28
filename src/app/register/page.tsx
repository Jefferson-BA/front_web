"use client";

import { useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function RegisterPage() {
  const [form, setForm] = useState({ username: "", password: "", role: "CUSTOMER" });
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (data.success) {
        alert("Registro exitoso, ahora inicia sesión");
        window.location.href = "/login";
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
        
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-slate-900">Crear Cuenta</h2>
          <p className="mt-2 text-sm text-slate-500">
            Únete a nuestra plataforma y empieza a explorar
          </p>
        </div>

        <div className="space-y-5 mt-8">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Usuario</label>
            <input
              type="text"
              placeholder="Crea un nombre de usuario"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
            <input
              type="password"
              placeholder="Crea una contraseña segura"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white focus:outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipo de Perfil</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white focus:outline-none transition-all cursor-pointer"
            >
              <option value="CUSTOMER">Cliente (Comprador)</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 transition-colors disabled:opacity-70 mt-4"
          >
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </div>

        <p className="text-center text-sm text-slate-600 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition-colors">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}