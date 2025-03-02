"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  description: string | null;
}

export default function InventoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  
  // Obtener categorías únicas
  const categories = [...new Set(inventoryItems.map(item => item.category))].sort();
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    
    if (session?.user?.role !== "ADMIN") {
      router.push("/unauthorized");
    }
    
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/inventory");
        const data = await response.json();
        setInventoryItems(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchInventory();
  }, [session, status, router]);
  
  // Filtrar artículos por búsqueda y categoría
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventario</h1>
        <Link 
          href="/admin/inventory/create"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Nuevo Artículo
        </Link>
      </div>
      
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        
        <div className="w-full md:w-1/3">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="">Todas las categorías</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No se encontraron artículos</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Nombre</th>
                <th className="py-2 px-4 border-b text-left">Categoría</th>
                <th className="py-2 px-4 border-b text-right">Cantidad</th>
                <th className="py-2 px-4 border-b text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.category}</td>
                  <td className="py-2 px-4 border-b text-right">{item.quantity}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <Link
                      href={`/admin/inventory/${item.id}`}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      Editar
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 