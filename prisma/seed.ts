import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Crear usuario admin
  const adminPassword = await hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Administrador',
      password: adminPassword,
      role: 'ADMIN',
    },
  });

  // Crear usuario colaborador
  const collabPassword = await hash('collab123', 10);
  const collaborator = await prisma.user.upsert({
    where: { email: 'colaborador@example.com' },
    update: {},
    create: {
      email: 'colaborador@example.com',
      name: 'Colaborador',
      password: collabPassword,
      role: 'COLLABORATOR',
    },
  });

  // Crear artículos de inventario con IDs específicos
  const items = [
    { id: '1', name: 'Mesa redonda', category: 'Mobiliario', quantity: 20 },
    { id: '2', name: 'Silla plegable', category: 'Mobiliario', quantity: 100 },
    { id: '3', name: 'Mantel blanco', category: 'Textiles', quantity: 30 },
    { id: '4', name: 'Copa de vino', category: 'Cristalería', quantity: 150 },
    { id: '5', name: 'Plato principal', category: 'Vajilla', quantity: 200 },
  ];

  for (const item of items) {
    await prisma.inventoryItem.upsert({
      where: { id: item.id },
      update: {},
      create: item,
    });
  }

  console.log('Base de datos inicializada con datos de prueba');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 