import prisma from "@/lib/prisma"
import Link from "next/link"
import WhatsAppCTA from "@/components/WhatsAppCTA"

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany({
    where: { isActive: true },
    include: { products: { take: 4 } }
  })

  // Static fallback if no collections exist yet
  const fallbackCollections = [
    { id: '1', slug: 'bridal', name: 'Bridal Couture', description: 'Bespoke wedding gowns that embody your unique love story.' },
    { id: '2', slug: 'asoebi', name: 'Aso-Ebi', description: 'Coordinated luxury pieces for your special celebrations.' },
    { id: '3', slug: 'suits', name: 'Tailored Suits', description: 'Precision-cut menswear for the modern gentleman.' }
  ]

  const displayCollections = collections.length > 0 ? collections : fallbackCollections

  return (
    <div className="min-h-screen bg-brand-white">
      <div className="bg-brand-purple text-white py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-5xl md:text-7xl font-semibold mb-8">
            Collections
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our carefully curated collections designed for life's most extraordinary moments.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="space-y-32">
          {displayCollections.map((collection, idx) => (
            <div key={collection.id} id={collection.slug} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center`}>
              <div className="w-full lg:w-1/2 aspect-[4/5] bg-gray-100 relative">
                 <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    [Collection Image: {collection.name}]
                 </div>
              </div>
              <div className="w-full lg:w-1/2">
                <h2 className="font-display text-4xl font-semibold mb-6 text-brand-black">{collection.name}</h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {collection.description || `Explore the exquisite craftsmanship of our ${collection.name} collection.`}
                </p>

                {/* Products Preview (if any) */}
                {('products' in collection && collection.products.length > 0) && (
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {collection.products.map(p => (
                      <Link href={`/catalogue/${p.slug}`} key={p.id} className="group cursor-pointer">
                        <div className="aspect-square bg-gray-100 mb-2" />
                        <h4 className="text-sm font-semibold group-hover:text-brand-gold transition-colors">{p.name}</h4>
                      </Link>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4">
                  <WhatsAppCTA
                    message={`Hello, I'd like more information about the ${collection.name} collection.`}
                    label="Inquire Collection"
                  />
                  <Link href="/catalogue" className="inline-flex items-center justify-center bg-transparent border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:border-brand-black hover:text-brand-black transition-colors">
                    View Catalogue
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
