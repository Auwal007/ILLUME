import prisma from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import WhatsAppCTA from "@/components/WhatsAppCTA"

// Fallback products matching catalogue list
const FALLBACK_PRODUCTS = [
  {
    id: "fb-1",
    name: "Zahra Bridal Gown",
    slug: "zahra-bridal-gown",
    price: 1200000,
    description: "A custom hand-beaded lace gown with a dramatic trailing skirt, silk chiffon drape, and structured inner corset. Designed to make you look unforgettable on your special day.",
    category: "Bridals & Asoebi",
    image: "/images/hero_bridal.png",
    details: [
      "Individually hand-sewn beads and premium crystals",
      "Signature ILLUME structure with premium inner boning",
      "Imported French lace and layered tulle skirt",
      "Adjustable corset back for a flawless custom contour",
      "Lead Time: 3 to 6 months for complete custom tailoring"
    ]
  },
  {
    id: "fb-2",
    name: "Abuja Signature Suit",
    slug: "abuja-signature-suit",
    price: 450000,
    description: "Elite double-breasted suit crafted from ultra-fine charcoal virgin wool with premium silk lining. Mastered silhouette for the corridors of power.",
    category: "Suits & Dinner",
    image: "/images/suits_dinner.png",
    details: [
      "100% premium Italian virgin wool construction",
      "Half-canvas layout for dynamic chest contouring",
      "Hand-finished functional sleeve buttonholes",
      "Custom internal lining with monogram embroidery option",
      "Lead Time: 4 to 6 weeks including intermediate fitting"
    ]
  },
  {
    id: "fb-3",
    name: "Heritage Agbada Set",
    slug: "heritage-agbada-set",
    price: 350000,
    description: "Exquisite hand-embroidered traditional Agbada set, modernized with sleek minimalist lines and detailed heritage patterns.",
    category: "African Luxury",
    image: "/images/heritage.png",
    details: [
      "Custom embroidery patterns designed in-house",
      "Premium heavy cashmere fabric or soft polished cotton",
      "Includes inner tunic (kaftan) and matching slim-fit trousers",
      "Signature gold brand emblem detailing",
      "Lead Time: 3 to 5 weeks for handcrafted finish"
    ]
  },
  {
    id: "fb-4",
    name: "Ebonyi Gala Gown",
    slug: "ebonyi-gala-gown",
    price: 650000,
    description: "Dramatic draped silk evening gown featuring a high slit and golden hand-embellished accents. A show-stopping silhouette for formal events.",
    category: "Evening Couture",
    image: "/images/evening_couture.png",
    details: [
      "High-luster luxury silk satin fabrication",
      "Asymmetrical custom draping across the shoulder and waist",
      "Golden leaf hand-beading along the neckline",
      "Hidden internal supportive structure",
      "Lead Time: 4 to 6 weeks of dedicated craftsmanship"
    ]
  },
  {
    id: "fb-5",
    name: "Traditional Aso-Ebi Set",
    slug: "traditional-asoebi-set",
    price: 280000,
    description: "Coordinated luxury traditional attire featuring custom embroidery and premium heavy-lace detailing, designed to stand out at any celebration.",
    category: "Bridals & Asoebi",
    image: "/images/bridal_asoebi.png",
    details: [
      "Custom-sourced heavy luxury lace fabrics",
      "Modern tailored cuts designed to highlight symmetry",
      "Intricate hand-stitched detailing along borders",
      "Ideal for weddings, family assemblies and formal celebrations",
      "Lead Time: 4 to 6 weeks depending on volume"
    ]
  }
]

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params

  // 1. Query Prisma DB
  const dbProduct = await prisma.product.findUnique({
    where: { slug },
    include: { category: true }
  })

  let product = null

  if (dbProduct) {
    product = {
      id: dbProduct.id,
      name: dbProduct.name,
      slug: dbProduct.slug,
      price: dbProduct.price,
      description: dbProduct.description,
      category: dbProduct.category.name,
      image: dbProduct.images ? JSON.parse(dbProduct.images)[0] || "/images/hero_bridal.png" : "/images/hero_bridal.png",
      details: [
        "Individually hand-crafted to order in our ateliers",
        "Curated premium fabrics selected specifically for this cut",
        "Expert fitting consultation included in pricing",
        "Operating from Abuja & Ebonyi, shipping worldwide",
        "Inquire for personalized adjustments and fabric upgrades"
      ]
    }
  } else {
    // 2. Query fallback list
    const fallback = FALLBACK_PRODUCTS.find(p => p.slug === slug)
    if (fallback) {
      product = fallback
    }
  }

  // If neither found, 404
  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Breadcrumbs */}
      <div className="bg-surface-1 py-6 px-6 border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-ui tracking-widest text-text-muted uppercase">
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/catalogue" className="hover:text-brand-gold transition-colors">Catalogue</Link>
          <span>/</span>
          <span className="text-brand-black font-semibold truncate">{product.name}</span>
        </div>
      </div>

      {/* Main product block */}
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Frame: Image */}
          <div className="w-full aspect-[3/4] bg-surface-2 relative rounded-3xl overflow-hidden shadow-[0_25px_60px_-25px_rgba(0,0,0,0.3)] border border-brand-gold/10 group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-brand-purple/5 mix-blend-overlay" />
          </div>

          {/* Right Frame: Product Details & CTAs */}
          <div className="flex flex-col">
            <span className="text-xs text-brand-deep-gold font-bold uppercase tracking-[0.25em] font-ui mb-3">
              {product.category}
            </span>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-brand-black tracking-tight mb-4">
              {product.name}
            </h1>
            
            {product.price && (
              <p className="text-2xl font-ui font-semibold text-brand-black mb-8 border-b border-brand-gold/10 pb-6">
                ₦{product.price.toLocaleString()}
              </p>
            )}

            <p className="text-base text-text-muted leading-relaxed font-ui mb-8">
              {product.description}
            </p>

            {/* Atelier highlights */}
            <div className="mb-10 bg-surface-2 p-8 rounded-2xl border border-brand-gold/10">
              <span className="text-xs uppercase tracking-widest text-brand-black font-bold block mb-4 font-ui">
                Atelier Specifications
              </span>
              <ul className="space-y-3">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-text-muted leading-normal font-ui">
                    <span className="text-brand-gold mt-0.5 select-none">✦</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div className="space-y-4">
              <WhatsAppCTA
                message={`Hi, I'm reviewing the details page for the ${product.name} and would like to book a consultation and fitting.`}
                label="Order & Book Consultation"
                fullWidth
              />
              <Link
                href="/catalogue"
                className="inline-flex w-full items-center justify-center bg-transparent border border-brand-black/20 rounded-full py-4 text-xs font-semibold uppercase tracking-widest text-brand-black hover:bg-brand-black hover:text-brand-white transition-all duration-300"
              >
                ← Back to Catalogue
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
