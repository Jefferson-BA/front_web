"use client";

import { useState, useEffect } from "react";
import { Product, ApiResponse } from "@/types/product";
import ProductCard from "@/components/ProductCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";
const categories = ["Electrónica", "Ropa", "Hogar"];

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const url = selectedCategory
        ? `${API_URL}/products?category=${selectedCategory}`
        : `${API_URL}/products`;

      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return;

      const data: ApiResponse<Product[]> = await res.json();
      if (data.success) setProducts(data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabecera */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Descubre lo <span className="text-indigo-600">Nuevo</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Explora nuestro catálogo con los mejores productos seleccionados para ti.
          </p>
        </div>

        {/* Filtro por categorías - Diseño de "Píldora" */}
        <div className="flex justify-center mb-10">
          <div className="relative inline-flex">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 font-medium py-3 pl-6 pr-12 rounded-full shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 focus:outline-none cursor-pointer transition-all hover:bg-slate-50"
            >
              <option value="">Todas las categorías</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {/* Ícono de flecha personalizado */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Cuadrícula de Productos */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-lg">No encontramos productos en esta categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}