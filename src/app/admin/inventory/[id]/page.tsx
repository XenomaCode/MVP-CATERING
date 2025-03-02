"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  description: string | null;
}

export default function EditInventoryItemPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Categorías predefinidas
  const categories = [
    "Mobiliario",
    "Textiles",
    "Cristalería",
    "Vajilla",
    "Decoración",
    "Electrónica",
    "Otros"
  ];
  
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
    
    if (session?.user?.role !== "ADMIN") {
      router.push("/unauthorized");
    }
    
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/inventory/${params.id}`);
        if (!response.ok) {
          throw new Error("Error al obtener artículo");
        }
        
        const item: InventoryItem = await response.json();
        setName(item.name);
        setCategory(item.category);
        setQuantity(item.quantity);
        setDescription(item.description || "");
      } catch (error) {
        console.error("Error fetching item:", error);
        setError("Error al cargar el artículo");
      } finally {
        setLoading(false);
      }
    };
    
    fetchItem();
  }, [params.id, session, status, router]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    
    if (!name || !category || quantity < 1) {
      setError("Por favor completa todos los campos requeridos");
      setSaving(false);
      return;
    }
    
    try {
      const response = await fetch(`/api/inventory/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          quantity,
          description,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al actualizar artículo");
      }
      
      router.push("/admin/inventory");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };
  
  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este artículo? Esta acción no se puede deshacer.")) {
      return;
    }
    
    try {
      const response = await fetch(`/api/inventory/${params.id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar artículo");
      }
      
      router.push("/admin/inventory");
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Editar Artículo de Inventario</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Artículo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoría</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Cantidad</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción (opcional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows={3}
          />
        </div>
        
        <div className="flex justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Eliminar Artículo
          </button>
          
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => router.push("/admin/inventory")}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={saving}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-blue-300"
            >
              {saving ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
} 