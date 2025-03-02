"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
}

interface EventItem {
  id?: string;
  inventoryId: string;
  quantity: number;
  inventoryItem?: InventoryItem;
}

interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  userId: string;
  user: {
    name: string;
  };
  items: EventItem[];
}

export default function EventDetailPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<Event | null>(null);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const [name, setName] = useState("");
  const [date, setDate] = useState<Date | null>(null);
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
    
    const fetchData = async () => {
      try {
        // Fetch event details
        const eventResponse = await fetch(`/api/events/${params.id}`);
        if (!eventResponse.ok) {
          throw new Error("Error al obtener detalles del evento");
        }
        const eventData = await eventResponse.json();
        setEvent(eventData);
        
        // Initialize form with event data
        setName(eventData.name);
        setDate(new Date(eventData.date));
        setLocation(eventData.location);
        setDescription(eventData.description || "");
        setItems(eventData.items);
        
        // Fetch inventory items
        const inventoryResponse = await fetch("/api/inventory");
        if (!inventoryResponse.ok) {
          throw new Error("Error al obtener inventario");
        }
        const inventoryData = await inventoryResponse.json();
        setInventoryItems(inventoryData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [params.id, session, status, router]);
  
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
      const response = await fetch(`/api/events/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          date,
          location,
          description,
          items: items.map(item => ({
            inventoryId: item.inventoryId,
            quantity: item.quantity
          })),
        }),
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al actualizar evento");
      }
      
      // Refresh event data
      const updatedEvent = await response.json();
      setEvent(updatedEvent);
      setIsEditing(false);
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de eliminar este evento? Esta acción no se puede deshacer.")) {
      return;
    }
    
    try {
      const response = await fetch(`/api/events/${params.id}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar evento");
      }
      
      router.push("/admin/events");
    } catch (error: any) {
      setError(error.message);
    }
  };
  
  const generatePDF = async () => {
    try {
      const response = await fetch(`/api/events/${params.id}/pdf`, {
        method: "GET",
      });
      
      if (!response.ok) throw new Error("Error generando PDF");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `evento-${params.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error al generar PDF:", error);
      alert("Error al generar PDF");
    }
  };
  
  if (loading) {
    return <div>Cargando...</div>;
  }
  
  if (!event) {
    return <div>Evento no encontrado</div>;
  }
  
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detalles del Evento</h1>
        
        <div className="flex space-x-2">
          <button
            onClick={() => router.push("/admin/events")}
            className="bg-gray-300 text-gray-700 px-3 py-1 rounded"
          >
            Volver
          </button>
          
          <button
            onClick={generatePDF}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Generar PDF
          </button>
          
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </>
          )}
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {isEditing ? (
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
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-lg font-semibold">Información del Evento</h2>
              <div className="mt-2 space-y-2">
                <p><span className="font-medium">Nombre:</span> {event.name}</p>
                <p><span className="font-medium">Fecha:</span> {format(new Date(event.date), "dd/MM/yyyy")}</p>
                <p><span className="font-medium">Ubicación:</span> {event.location}</p>
                <p><span className="font-medium">Responsable:</span> {event.user.name}</p>
                {event.description && (
                  <p><span className="font-medium">Descripción:</span> {event.description}</p>
                )}
              </div>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold">Artículos</h2>
              <div className="mt-2">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Artículo</th>
                      <th className="py-2 px-4 border-b">Categoría</th>
                      <th className="py-2 px-4 border-b">Cantidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {event.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2 px-4 border-b">{item.inventoryItem?.name}</td>
                        <td className="py-2 px-4 border-b">{item.inventoryItem?.category}</td>
                        <td className="py-2 px-4 border-b">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 