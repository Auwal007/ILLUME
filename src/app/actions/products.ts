"use server"

import prisma from "@/lib/prisma"

export async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        isFeatured: true,
        isActive: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return products
  } catch (error) {
    console.error("Failed to fetch featured products:", error)
    return []
  }
}
