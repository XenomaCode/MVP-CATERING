import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    
    const inventoryItems = await prisma.inventoryItem.findMany({
      orderBy: {
        name: 'asc'
      }
    });
    
    return NextResponse.json(inventoryItems);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return NextResponse.json(
      { error: "Error al obtener inventario" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }
    
    const data = await request.json();
    
    const inventoryItem = await prisma.inventoryItem.create({
      data: {
        name: data.name,
        category: data.category,
        quantity: data.quantity,
        description: data.description
      }
    });
    
    return NextResponse.json(inventoryItem, { status: 201 });
  } catch (error) {
    console.error("Error creating inventory item:", error);
    return NextResponse.json(
      { error: "Error al crear artículo de inventario" },
      { status: 500 }
    );
  }
} 