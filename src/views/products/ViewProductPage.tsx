"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/products/ProductCard";
import { Product } from "@/interfaces/Product";
import { useProductStore } from "@/stores/ProductStore";
import { ProductDialog } from "@/components/products/ProductDialog";
import { Button } from "@/components/ui/button";



export default function ViewProductPage() {
  const { products, loading, fetchProducts, filters } = useProductStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Cargando Productos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-700 shadow">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">IDWM</h1>
          <a
            href="/login"
            className="text-sm bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-blue-100 transition"
          >
            Iniciar sesión
          </a>
        </div>
      </nav>

      {/* Banner */}
      <div className="relative h-64 bg-gray-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/tienda.jpg')` }}
        />
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative flex items-center justify-center h-full">
          <h2 className="text-3xl text-white font-bold px-2">
            Bienvenido a nuestra tienda
          </h2>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="max-w-7xl mx-auto px-12 py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Detalles del producto */}
      <ProductDialog
        product={selectedProduct}
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

  
    </div>
  );
}
