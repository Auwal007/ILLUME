import prisma from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import WhatsAppCTA from "@/components/WhatsAppCTA"
import CatalogueGrid from "@/components/catalogue/CatalogueGrid"

// Premium fallback products
const FALLBACK_PRODUCTS = [
  {
    id: "fb-1",
    name: "Zahra Bridal Gown",
    slug: "zahra-bridal-gown",
    price: 1200000,
    description: "A custom hand-beaded lace gown with a dramatic trailing skirt, silk chiffon drape, and structured inner corset.",
    category: { id: "cat-1", name: "Bridals & Asoebi" },
    image: "/images/hero_bridal.png"
  },
  {
    id: "fb-2",
    name: "Abuja Signature Suit",
    slug: "abuja-signature-suit",
    price: 450000,
    description: "Elite double-breasted suit crafted from ultra-fine charcoal virgin wool with premium silk lining.",
    category: { id: "cat-2", name: "Suits & Dinner" },
    image: "/images/suits_dinner.png"
  },
  {
    id: "fb-3",
    name: "Heritage Agbada Set",
    slug: "heritage-agbada-set",
    price: 350000,
    description: "Exquisite hand-embroidered traditional Agbada set, modernized with sleek minimalist lines.",
    category: { id: "cat-3", name: "African Luxury" },
    image: "/images/heritage.png"
  },
  {
    id: "fb-4",
    name: "Ebonyi Gala Gown",
    slug: "ebonyi-gala-gown",
    price: 650000,
    description: "Dramatic draped silk evening gown featuring a high slit and golden hand-embellished accents.",
    category: { id: "cat-4", name: "Evening Couture" },
    image: "/images/evening_couture.png"
  },
  {
    id: "fb-5",
    name: "Traditional Aso-Ebi Set",
    slug: "traditional-asoebi-set",
    price: 280000,
    description: "Coordinated luxury traditional attire featuring custom embroidery and premium heavy-lace detailing.",
    category: { id: "cat-1", name: "Bridals & Asoebi" },
    image: "/images/bridal_asoebi.png"
  }
]

export default async function CataloguePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true }
  })

  const dbCategories = await prisma.category.findMany()

  // If DB is empty, use fallbacks
  const displayProducts = products.length > 0
    ? products.map(p => ({
        ...p,
        image: p.images ? JSON.parse(p.images)[0] || "/images/hero_bridal.png" : "/images/hero_bridal.png"
      }))
    : FALLBACK_PRODUCTS

  const displayCategories = dbCategories.length > 0
    ? dbCategories
    : [
        { id: "cat-1", name: "Bridals & Asoebi" },
        { id: "cat-2", name: "Suits & Dinner" },
        { id: "cat-3", name: "African Luxury" },
        { id: "cat-4", name: "Evening Couture" }
      ]

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Header */}
      <section className="bg-brand-milk py-36 px-6 relative overflow-hidden border-b border-brand-gold/10">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-gold/5 blur-[100px]" />
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="font-display italic text-brand-deep-gold text-lg block mb-4">Meticulous Curation</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight text-brand-black">
            The Catalogue
          </h1>
          <div className="w-16 h-px bg-brand-gold/40 mx-auto mb-8" />
          <p className="text-base md:text-lg text-text-muted max-w-xl mx-auto font-ui leading-relaxed">
            Explore a digital collection of our bespoke garments, tailored cuts, and premium couture designs.
          </p>
        </div>
      </section>

      {/* Main Grid Section */}
      <CatalogueGrid initialProducts={displayProducts as any} categories={displayCategories as any} />
    </div>
  )
}
