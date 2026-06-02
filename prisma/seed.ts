import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'admin@illume.com' },
    update: {},
    create: {
      email: 'admin@illume.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })

  console.log({ admin })

  // Seed Categories
  const categories = [
    { name: "Bridals & Asoebi", slug: "bridals-asoebi", description: "Culturally rooted bridal design and coordinated wedding garments." },
    { name: "Suits & Dinner", slug: "suits-dinner", description: "Sartorial precision and tailored lines crafted from luxury wools." },
    { name: "African Luxury", slug: "african-luxury", description: "Traditional textures and detailed embroidery re-envisioned." },
    { name: "Evening Couture", slug: "evening-couture", description: "High-fashion statements and red-carpet gowns featuring custom draping." }
  ]

  const seededCategories = []
  for (const cat of categories) {
    const c = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat
    })
    seededCategories.push(c)
  }

  console.log("Seeded categories:", seededCategories.map(c => c.name))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
