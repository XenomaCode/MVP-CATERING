import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    
    const event = await prisma.event.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            name: true
          }
        },
        items: {
          include: {
            inventoryItem: true
          }
        }
      }
    });
    
    if (!event) {
      return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
    }
    
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Error al obtener evento" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    
    const data = await request.json();
    
    // Primero eliminamos los items existentes
    await prisma.eventItem.deleteMany({
      where: { eventId: params.id }
    });
    
    // Luego actualizamos el evento con los nuevos items
    const event = await prisma.event.update({
      where: { id: params.id },
      data: {
        name: data.name,
        date: new Date(data.date),
        location: data.location,
        description: data.description,
        items: {
          create: data.items.map((item: any) => ({
            inventoryId: item.inventoryId,
            quantity: item.quantity
          }))
        }
      }
    });
    
    return NextResponse.json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { error: "Error al actualizar evento" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    
    // Primero eliminamos los items relacionados
    await prisma.eventItem.deleteMany({
      where: { eventId: params.id }
    });
    
    // Luego eliminamos el evento
    await prisma.event.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { error: "Error al eliminar evento" },
      { status: 500 }
    );
  }
} 