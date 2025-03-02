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
    
    const inventoryItem = await prisma.inventoryItem.findUnique({
      where: { id: params.id }
    });
    
    if (!inventoryItem) {
      return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
    }
    
    return NextResponse.json(inventoryItem);
  } catch (error) {
    console.error("Error fetching inventory item:", error);
    return NextResponse.json(
      { error: "Error al obtener artículo" },
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
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    
    const data = await request.json();
    
    const inventoryItem = await prisma.inventoryItem.update({
      where: { id: params.id },
      data: {
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        description: data.description
      }
    });
    
    return NextResponse.json(inventoryItem);
  } catch (error) {
    console.error("Error updating inventory item:", error);
    return NextResponse.json(
      { error: "Error al actualizar artículo" },
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
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    
    // Verificar si el artículo está siendo usado en algún evento
    const eventItems = await prisma.eventItem.findMany({
      where: { inventoryId: params.id }
    });
    
    if (eventItems.length > 0) {
      return NextResponse.json(
        { error: "No se puede eliminar el artículo porque está siendo usado en eventos" },
        { status: 400 }
      );
    }
    
    await prisma.inventoryItem.delete({
      where: { id: params.id }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting inventory item:", error);
    return NextResponse.json(
      { error: "Error al eliminar artículo" },
      { status: 500 }
    );
  }
} 