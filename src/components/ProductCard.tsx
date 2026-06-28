import Link from "next/link";
import { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-indigo-200 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Área de imagen simulada - Fondo sutil que cambia al pasar el mouse */}
      <div className="h-48 bg-slate-50 flex items-center justify-center border-b border-slate-100 group-hover:bg-indigo-50/50 transition-colors">
        <span className="text-slate-400 font-medium text-sm">Vista previa</span>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-lg font-bold text-slate-800 line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors">
          {product.nombre}
        </h2>
        <p className="text-2xl font-black text-indigo-600 mb-3">
          ${product.precio}
        </p>
        {product.descripcion && (
          <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed">
            {product.descripcion}
          </p>
        )}
      </div>
    </Link>
  );
}