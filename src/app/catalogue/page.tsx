import prisma from "@/lib/prisma"
import Link from "next/link"
import WhatsAppCTA from "@/components/WhatsAppCTA"

export default async function CataloguePage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: true }
  })

  const categories = await prisma.category.findMany()

  return (
    <div className="min-h-screen bg-brand-white">
      <div className="bg-brand-milk py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-6xl font-semibold mb-6">The Catalogue</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of bespoke designs, ready-to-wear pieces, and heritage couture.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <h3 className="font-display text-xl font-semibold mb-6 pb-2 border-b border-gray-200">Categories</h3>
            <ul className="space-y-4">
              <li>
                <button className="text-brand-gold font-medium">All Designs</button>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <button className="text-gray-600 hover:text-brand-black transition-colors">{category.name}</button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 border border-gray-100">
                <p className="text-gray-500">No products available at the moment. Please check back later.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map(product => (
                  <div key={product.id} className="group flex flex-col">
                    <Link href={`/catalogue/${product.slug}`} className="block relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </Link>
                    <div className="flex flex-col flex-grow">
                      <div className="text-xs text-brand-deep-gold mb-1 uppercase tracking-wider">{product.category.name}</div>
                      <Link href={`/catalogue/${product.slug}`}>
                        <h3 className="font-display text-lg font-semibold hover:text-brand-gold transition-colors mb-2">{product.name}</h3>
                      </Link>
                      {product.price && (
                        <p className="text-gray-600 mb-4">₦{product.price.toLocaleString()}</p>
                      )}
                      <div className="mt-auto pt-4">
                        <WhatsAppCTA
                          message={`Hi, I'm interested in the ${product.name} from your catalogue.`}
                          label="Inquire via WhatsApp"
                          variant="outline"
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
