"use server"

import { getFeaturedProducts as getFeaturedDb } from "@/lib/db"

export async function getFeaturedProducts() {
  try {
    return await getFeaturedDb()
  } catch (error) {
    console.error("Failed to fetch featured products:", error)
    return []
  }
}
