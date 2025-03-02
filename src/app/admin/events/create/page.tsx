"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

interface EventItem {
  inventoryId: string;
  quantity: number;
  inventoryItem?: InventoryItem;
}

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<EventItem[]>([]);
  const [error, setError] = useState("");
  
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
  
  const addItem = () => {
    if (inventoryItems.length > 0) {
      setItems([
        ...items,
        { inventoryId: inventoryItems[0].id, quantity: 1 }
      ]);
    }
  };
  
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  
  const updateItem = (index: number, field: string, value: any) => {
    const updatedItems = [...items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setItems(updatedItems);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!name || !date || !location || items.length === 0) {
      setError("Por favor completa todos los campos requeridos");
      return;
    }
    
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          date,
          location,
          description,
          items,
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al crear evento");
      }
      
      router.push("/admin/events");
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Crear Nuevo Evento</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nombre del Evento</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Fecha</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            dateFormat="dd/MM/yyyy"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Ubicación</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            rows={3}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Artículos</label>
          
          {items.length === 0 && (
            <p className="text-gray-500 mb-2">No hay artículos agregados</p>
          )}
          
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <select
                value={item.inventoryId}
                onChange={(e) => updateItem(index, "inventoryId", e.target.value)}
                className="block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                {inventoryItems.map((invItem) => (
                  <option key={invItem.id} value={invItem.id}>
                    {invItem.name} ({invItem.category})
                  </option>
                ))}
              </select>
              
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value))}
                className="block w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              />
              
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="bg-red-500 text-white px-3 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addItem}
            className="mt-2 bg-green-500 text-white px-3 py-2 rounded"
          >
            Agregar Artículo
          </button>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={() => router.push("/admin/events")}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
          >
            Cancelar
          </button>
          
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Crear Evento
          </button>
        </div>
      </form>
    </div>
  );
} 