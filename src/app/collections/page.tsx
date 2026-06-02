import prisma from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"
import WhatsAppCTA from "@/components/WhatsAppCTA"

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
    where: { isActive: true },
    include: { products: { take: 4 } }
  })

  // Static fallback if no collections exist in DB
  const fallbackCollections = [
    {
      id: '1',
      slug: 'bridal',
      name: 'Bridal Couture',
      description: 'Individually sketched and hand-beaded gowns tailored to capture your light. We integrate traditional African elegance with high-fashion bridal silhouettes, utilizing premium silks, custom brocades, and elaborate lace work.'
    },
    {
      id: '2',
      slug: 'asoebi',
      name: 'Luxury Aso-Ebi',
      description: 'Coordinated family and group couture pieces designed for major celebrations. We specialize in custom embroidery, premium lace curation, and contemporary cuts that honor cultural traditions while making a bold statement.'
    },
    {
      id: '3',
      slug: 'suits',
      name: 'Tailored Suits',
      description: 'Sartorial precision and sharp silhouettes crafted from premium wools, cashmeres, and silks. Every suit is tailored to provide structural confidence, featuring modern canvassing, hand-finished lapels, and custom linings.'
    }
  ]

  const displayCollections = collections.length > 0 ? collections : fallbackCollections

  const getCollectionImage = (slug: string) => {
    switch (slug) {
      case "bridal":
        return "/images/hero_bridal.png"
      case "asoebi":
        return "/images/bridal_asoebi.png"
      case "suits":
        return "/images/suits_dinner.png"
      default:
        return "/images/evening_couture.png"
    }
  }

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Page Header */}
      <section className="bg-brand-purple text-brand-milk py-36 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-gold/5 blur-[100px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-black/30 blur-[120px]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-display italic text-brand-gold text-lg block mb-4">The Ateliers</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Our Collections
          </h1>
          <div className="w-16 h-px bg-brand-gold/40 mx-auto mb-8" />
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto font-ui leading-relaxed">
            Discover a visual study of curated garments crafted for life's most extraordinary ceremonies.
          </p>
        </div>
      </section>

      {/* Collections Showcase */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="space-y-36">
          {displayCollections.map((collection, idx) => (
            <div
              key={collection.id}
              id={collection.slug}
              className={`flex flex-col ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-12 lg:gap-24 items-center`}
            >
              {/* Collection Image */}
              <div className="w-full lg:w-1/2 aspect-[4/5] bg-surface-2 relative rounded-3xl overflow-hidden shadow-[0_25px_60px_-25px_rgba(0,0,0,0.35)] border border-brand-gold/10 group">
                <Image
                  src={getCollectionImage(collection.slug)}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                <div className="absolute inset-0 bg-brand-purple/5 mix-blend-overlay" />
              </div>

              {/* Collection Details */}
              <div className="w-full lg:w-1/2">
                <div className="w-12 h-0.5 bg-brand-gold mb-6" />
                <h2 className="font-display text-4xl font-bold mb-6 text-brand-black tracking-tight">{collection.name}</h2>
                <p className="text-base text-text-muted mb-10 leading-relaxed font-ui">
                  {collection.description || `Experience the exquisite craftsmanship and visual identity of our bespoke ${collection.name} collection.`}
                </p>

                {/* Products Preview (if dynamic products exist) */}
                {('products' in collection && collection.products.length > 0) && (
                  <div className="mb-10">
                    <span className="text-[0.7rem] uppercase tracking-widest text-text-muted font-bold block mb-4">Preview Pieces</span>
                    <div className="grid grid-cols-2 gap-4">
                      {collection.products.map(p => (
                        <Link href={`/catalogue/${p.slug}`} key={p.id} className="group cursor-pointer flex items-center gap-4 bg-surface-2 p-3 rounded-xl border border-brand-gold/5 hover:border-brand-gold/30 transition-colors">
                          <div className="w-12 h-12 rounded-lg bg-surface-3 relative overflow-hidden shrink-0">
                            <Image
                              src={getCollectionImage(collection.slug)} // fallback for preview image
                              alt={p.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-brand-black group-hover:text-brand-gold transition-colors line-clamp-1">{p.name}</h4>
                            <span className="text-[0.65rem] text-text-muted uppercase tracking-wider">View details</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <WhatsAppCTA
                    message={`Hello, I am interested in booking a consultation for the ${collection.name} collection.`}
                    label={`Inquire about ${collection.name}`}
                  />
                  <Link
                    href="/catalogue"
                    className="inline-flex items-center justify-center bg-transparent border border-brand-black/20 rounded-full px-8 py-3.5 text-xs font-semibold text-brand-black hover:bg-brand-black hover:text-brand-white transition-all duration-300"
                  >
                    View Full Catalogue
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
