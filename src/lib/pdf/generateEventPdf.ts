import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function generateEventPdf(eventId: string): Promise<Buffer> {
  // Obtener datos del evento
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: {
      items: {
        include: {
          inventoryItem: true
        }
      },
      user: true
    }
  });

  if (!event) {
    throw new Error("Evento no encontrado");
  }

  // Crear PDF
  const doc = new jsPDF();
  
  // Título
  doc.setFontSize(20);
  doc.text(`Lista de Artículos - ${event.name}`, 14, 22);
  
  // Información del evento
  doc.setFontSize(12);
  doc.text(`Fecha: ${new Date(event.date).toLocaleDateString()}`, 14, 32);
  doc.text(`Ubicación: ${event.location}`, 14, 38);
  doc.text(`Responsable: ${event.user.name}`, 14, 44);
  
  // Tabla de artículos
  const tableData = event.items.map(item => [
    item.inventoryItem.name,
    item.inventoryItem.category,
    item.quantity.toString()
  ]);
  
  autoTable(doc, {
    head: [['Artículo', 'Categoría', 'Cantidad']],
    body: tableData,
    startY: 55,
  });
  
  // Pie de página
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Página ${i} de ${pageCount} - Generado el ${new Date().toLocaleDateString()}`,
      14,
      doc.internal.pageSize.height - 10
    );
  }
  
  // Convertir a buffer para enviar como respuesta
  const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
  return pdfBuffer;
} 