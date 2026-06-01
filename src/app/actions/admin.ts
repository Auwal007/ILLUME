"use server"

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

async function checkAuth() {
  const session = await getServerSession(authOptions)
  if (!session) throw new Error("Unauthorized")
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

  await prisma.product.create({
    data: {
      name,
      slug,
      description,
      price: priceStr ? parseFloat(priceStr) : null,
      categoryId,
      images: "[]", // Default empty for now
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

  await prisma.collection.create({
    data: { name, slug, description, isActive: true }
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
