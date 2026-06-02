"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { writeFile, mkdir } from "fs/promises"
import { join } from "path"

async function checkAuth() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")
}

async function saveUploadedFile(file: any): Promise<string | null> {
  if (!file || typeof file !== "object" || typeof file.arrayBuffer !== "function" || !file.name || file.size === 0) {
    return null
  }

  const uploadsDir = join(process.cwd(), "public", "uploads")
  try {
    await mkdir(uploadsDir, { recursive: true })
  } catch (err) {
    // Ignore if directory already exists
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
  const cleanFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
  const filename = `${uniquePrefix}-${cleanFilename}`
  
  const filePath = join(uploadsDir, filename)
  await writeFile(filePath, buffer)
  
  return `/uploads/${filename}`
}

// Category Actions
export async function createCategory(formData: FormData) {
  await checkAuth()
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string

  await prisma.category.create({
    data: { name, slug, description }
  })
  revalidatePath("/admin/categories")
}

export async function deleteCategory(id: string) {
  await checkAuth()
  await prisma.category.delete({ where: { id } })
  revalidatePath("/admin/categories")
}

// Product Actions
export async function createProduct(formData: FormData) {
  await checkAuth()
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const priceStr = formData.get("price") as string
  const categoryId = formData.get("categoryId") as string
  const isFeatured = formData.get("isFeatured") === "true" || formData.get("isFeatured") === "on"

  // Handle file uploads
  const files = formData.getAll("images")
  const imageUrls: string[] = []

  for (const file of files) {
    const url = await saveUploadedFile(file)
    if (url) {
      imageUrls.push(url)
    }
  }

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price: priceStr ? parseFloat(priceStr) : null,
      categoryId,
      images: imageUrls.length > 0 ? JSON.stringify(imageUrls) : "[]",
      isFeatured,
      isActive: true
    }
  })
  revalidatePath("/admin/products")
}

export async function deleteProduct(id: string) {
  await checkAuth()
  await prisma.product.delete({ where: { id } })
  revalidatePath("/admin/products")
}

// Collection Actions
export async function createCollection(formData: FormData) {
  await checkAuth()
  const name = formData.get("name") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string

  const imageFile = formData.get("image")
  const imageUrl = await saveUploadedFile(imageFile)

  await prisma.collection.create({
    data: {
      name,
      slug,
      description,
      image: imageUrl || null,
      isActive: true
    }
  })
  revalidatePath("/admin/collections")
}

export async function deleteCollection(id: string) {
  await checkAuth()
  await prisma.collection.delete({ where: { id } })
  revalidatePath("/admin/collections")
}

// Testimonial Actions
export async function createTestimonial(formData: FormData) {
  await checkAuth()
  const name = formData.get("name") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const ratingStr = formData.get("rating") as string

  await prisma.testimonial.create({
    data: {
      name,
      title,
      content,
      rating: ratingStr ? parseInt(ratingStr) : 5,
      isActive: true
    }
  })
  revalidatePath("/admin/testimonials")
}

export async function deleteTestimonial(id: string) {
  await checkAuth()
  await prisma.testimonial.delete({ where: { id } })
  revalidatePath("/admin/testimonials")
}

export async function deleteInquiry(id: string) {
  await checkAuth()
  await prisma.inquiry.delete({ where: { id } })
  revalidatePath("/admin/inquiries")
}

export async function updateInquiryStatus(id: string, status: string) {
  await checkAuth()
  await prisma.inquiry.update({
    where: { id },
    data: { status }
  })
  revalidatePath("/admin/inquiries")
}
