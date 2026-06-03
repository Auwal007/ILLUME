import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  limit 
} from "firebase/firestore"
import { db } from "./firebase"
import bcrypt from "bcryptjs"

// Automatically check and initialize default admin and categories in Firestore
export async function ensureInitialized() {
  try {
    const usersRef = collection(db, "users")
    const userSnapshot = await getDocs(query(usersRef, limit(1)))
    
    if (userSnapshot.empty) {
      console.log("Initializing database...")
      
      // Seed default admin user
      const hashedPassword = await bcrypt.hash("admin123", 10)
      await addDoc(collection(db, "users"), {
        email: "admin@illume.ng",
        name: "Admin User",
        password: hashedPassword,
        role: "ADMIN",
        createdAt: new Date().toISOString()
      })

      // Seed default categories
      const categories = [
        { name: "Bridals & Asoebi", slug: "bridals-asoebi", description: "Culturally rooted bridal design and coordinated wedding garments." },
        { name: "Suits & Dinner", slug: "suits-dinner", description: "Sartorial precision and tailored lines crafted from luxury wools." },
        { name: "African Luxury", slug: "african-luxury", description: "Traditional textures and detailed embroidery re-envisioned." },
        { name: "Evening Couture", slug: "evening-couture", description: "High-fashion statements and red-carpet gowns featuring custom draping." }
      ]
      for (const cat of categories) {
        await addDoc(collection(db, "categories"), {
          ...cat,
          createdAt: new Date().toISOString()
        })
      }
      console.log("Database initialized successfully.")
    }
  } catch (err) {
    console.error("Firestore initialization error:", err)
  }
}

// User Authentication Query
export async function checkUserCredentials(email: string) {
  await ensureInitialized()
  const usersRef = collection(db, "users")
  const q = query(usersRef, where("email", "==", email), limit(1))
  const snap = await getDocs(q)
  if (snap.empty) return null
  const userDoc = snap.docs[0]
  return { id: userDoc.id, ...userDoc.data() } as any
}

// Category Services
export async function getCategories() {
  await ensureInitialized()
  const snap = await getDocs(collection(db, "categories"))
  const categories = snap.docs.map(d => ({ id: d.id, ...d.data() } as any))
  return categories.sort((a, b) => a.name.localeCompare(b.name))
}

export async function getAllCategories() {
  await ensureInitialized()
  const categories = await getCategories()
  const allProducts = await getProducts(false)
  return categories.map(c => ({
    ...c,
    _count: {
      products: allProducts.filter(p => p.categoryId === c.id).length
    }
  })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function createCategory(name: string, slug: string, description: string) {
  await ensureInitialized()
  await addDoc(collection(db, "categories"), {
    name,
    slug,
    description,
    createdAt: new Date().toISOString()
  })
}

export async function deleteCategory(id: string) {
  await ensureInitialized()
  await deleteDoc(doc(db, "categories", id))
}

// Collection Services
export async function getCollections(isActiveOnly = true) {
  await ensureInitialized()
  const snap = await getDocs(collection(db, "collections"))
  let collections = snap.docs.map(d => ({ id: d.id, ...d.data() } as any))
  if (isActiveOnly) {
    collections = collections.filter(c => c.isActive !== false)
  }
  
  const allProducts = await getProducts(isActiveOnly)
  return collections.map(c => ({
    ...c,
    products: allProducts.filter(p => p.collectionId === c.id).slice(0, 4)
  })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getAllCollections() {
  await ensureInitialized()
  const snap = await getDocs(collection(db, "collections"))
  const collections = snap.docs.map(d => ({ id: d.id, ...d.data() } as any))
  const allProducts = await getProducts(false)
  return collections.map(c => ({
    ...c,
    _count: {
      products: allProducts.filter(p => p.collectionId === c.id).length
    }
  })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function createCollection(name: string, slug: string, description: string, image: string | null) {
  await ensureInitialized()
  await addDoc(collection(db, "collections"), {
    name,
    slug,
    description,
    image,
    isActive: true,
    createdAt: new Date().toISOString()
  })
}

export async function deleteCollection(id: string) {
  await ensureInitialized()
  await deleteDoc(doc(db, "collections", id))
}

// Product Services
export async function getProducts(isActiveOnly = true) {
  await ensureInitialized()
  const snap = await getDocs(collection(db, "products"))
  let products = snap.docs.map(d => ({ id: d.id, ...d.data() } as any))
  if (isActiveOnly) {
    products = products.filter(p => p.isActive !== false)
  }
  
  // Resolve category and collection relations
  const categories = await getCategories()
  const snapCollections = await getDocs(collection(db, "collections"))
  const collections = snapCollections.docs.map(d => ({ id: d.id, ...d.data() } as any))

  return products.map(p => ({
    ...p,
    category: categories.find(c => c.id === p.categoryId) || { id: p.categoryId, name: "Uncategorized" },
    collection: collections.find(col => col.id === p.collectionId) || null
  })).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function getFeaturedProducts() {
  const products = await getProducts(true)
  return products.filter(p => p.isFeatured === true)
}

export async function getProductBySlug(slug: string) {
  await ensureInitialized()
  const snap = await getDocs(collection(db, "products"))
  const products = snap.docs.map(d => ({ id: d.id, ...d.data() } as any))
  const p = products.find(prod => prod.slug === slug)
  if (!p) return null

  // Resolve category
  const categories = await getCategories()
  p.category = categories.find(c => c.id === p.categoryId) || { id: p.categoryId, name: "Uncategorized" }
  return p
}

export async function createProduct(data: {
  name: string
  slug: string
  description: string
  price: number | null
  categoryId: string
  images: string
  isFeatured: boolean
}) {
  await ensureInitialized()
  await addDoc(collection(db, "products"), {
    ...data,
    isActive: true,
    createdAt: new Date().toISOString()
  })
}

export async function deleteProduct(id: string) {
  await ensureInitialized()
  await deleteDoc(doc(db, "products", id))
}

// Inquiries Services
export async function getInquiries() {
  await ensureInitialized()
  const snap = await getDocs(collection(db, "inquiries"))
  const inquiries = snap.docs.map(d => ({ id: d.id, ...d.data() } as any))
  return inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function createInquiry(data: {
  name: string
  email: string
  phone: string
  service: string
  message: string
}) {
  await ensureInitialized()
  await addDoc(collection(db, "inquiries"), {
    ...data,
    status: "NEW",
    createdAt: new Date().toISOString()
  })
}

export async function updateInquiryStatus(id: string, status: string) {
  await ensureInitialized()
  await updateDoc(doc(db, "inquiries", id), { status })
}

export async function deleteInquiry(id: string) {
  await ensureInitialized()
  await deleteDoc(doc(db, "inquiries", id))
}

// Testimonials Services
export async function getTestimonials() {
  await ensureInitialized()
  const snap = await getDocs(collection(db, "testimonials"))
  const testimonials = snap.docs.map(d => ({ id: d.id, ...d.data() } as any))
  return testimonials.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export async function createTestimonial(data: {
  name: string
  title: string
  rating: number
  content: string
}) {
  await ensureInitialized()
  await addDoc(collection(db, "testimonials"), {
    ...data,
    isActive: true,
    createdAt: new Date().toISOString()
  })
}

export async function deleteTestimonial(id: string) {
  await ensureInitialized()
  await deleteDoc(doc(db, "testimonials", id))
}
