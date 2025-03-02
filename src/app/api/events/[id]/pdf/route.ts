import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { generateEventPdf } from "@/lib/pdf/generateEventPdf";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  
  try {
    const eventId = params.id;
    const pdfBuffer = await generateEventPdf(eventId);
    
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="evento-${eventId}.pdf"`
      }
    });
  } catch (error) {
    console.error("Error generando PDF:", error);
    return NextResponse.json(
      { error: "Error al generar PDF" },
      { status: 500 }
    );
  }
} 