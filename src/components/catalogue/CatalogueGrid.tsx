"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import WhatsAppCTA from "@/components/WhatsAppCTA"

interface Category {
  id: string
  name: string
  slug: string
}

interface Product {
  id: string
  name: string
  slug: string
  price: number | null
  description: string
  category: { id: string; name: string }
  image: string
}

interface CatalogueGridProps {
  initialProducts: Product[]
  categories: Category[]
}

export default function CatalogueGrid({ initialProducts, categories }: CatalogueGridProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all")

  const filteredProducts = selectedCategoryId === "all"
    ? initialProducts
    : initialProducts.filter(p => p.category.id === selectedCategoryId)

  return (
    <section className="max-w-7xl mx-auto px-6 py-28">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Sidebar / Filters */}
        <aside className="w-full lg:w-64 shrink-0">
          <h3 className="font-display text-lg font-bold tracking-wider mb-6 pb-3 border-b border-brand-gold/15 text-brand-black uppercase">
            Categories
          </h3>
          <ul className="space-y-4 font-ui text-sm">
            <li>
              <button
                onClick={() => setSelectedCategoryId("all")}
                className={`transition-colors flex items-center gap-2 tracking-wide font-medium cursor-pointer text-left w-full ${
                  selectedCategoryId === "all"
                    ? "text-brand-gold font-bold animate-pulse"
                    : "text-text-muted hover:text-brand-black"
                }`}
              >
                {selectedCategoryId === "all" && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                )}
                All Designs
              </button>
            </li>
            {categories.map(category => (
              <li key={category.id}>
                <button
                  onClick={() => setSelectedCategoryId(category.id)}
                  className={`transition-colors flex items-center gap-2 tracking-wide font-medium cursor-pointer text-left w-full ${
                    selectedCategoryId === category.id
                      ? "text-brand-gold font-bold"
                      : "text-text-muted hover:text-brand-black"
                  }`}
                >
                  {selectedCategoryId === category.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
                  )}
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-surface-2 rounded-3xl border border-brand-gold/10 px-6">
              <span className="text-3xl block mb-4">✦</span>
              <p className="text-base text-brand-black font-medium font-display tracking-wide">No custom designs found in this category.</p>
              <p className="text-xs text-text-muted mt-2 max-w-sm mx-auto leading-relaxed">We are currently crafting and preparing new couture releases for this segment. Please check back soon or inquire directly.</p>
              <button
                onClick={() => setSelectedCategoryId("all")}
                className="mt-8 inline-flex bg-brand-black text-brand-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-brand-gold hover:text-brand-black transition-colors duration-300"
              >
                View all designs
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredProducts.map(product => (
                <div key={product.id} className="group flex flex-col justify-between bg-surface-1 p-4 rounded-3xl border border-brand-gold/5 shadow-[0_15px_35px_-20px_rgba(0,0,0,0.15)] hover:border-brand-gold/25 transition-all duration-300">
                  <div>
                    {/* Image Block */}
                    <Link
                      href={`/catalogue/${product.slug}`}
                      className="block relative aspect-[3/4] bg-surface-2 rounded-2xl overflow-hidden mb-6 group-hover:shadow-md transition-shadow duration-300"
                    >
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                      />
                      <div className="absolute inset-0 bg-brand-purple/5 mix-blend-overlay" />
                    </Link>

                    {/* Meta info */}
                    <div className="px-1">
                      <div className="text-[0.65rem] text-brand-deep-gold mb-1 uppercase tracking-widest font-bold font-ui">
                        {product.category.name}
                      </div>
                      <Link href={`/catalogue/${product.slug}`}>
                        <h3 className="font-display text-xl font-bold text-brand-black hover:text-brand-gold transition-colors mb-3 tracking-wide">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-text-muted leading-relaxed font-ui mb-4 line-clamp-2">
                        {product.description}
                      </p>
                      {product.price && (
                        <p className="text-brand-black font-semibold font-ui text-sm mb-6">
                          ₦{product.price.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="px-1 mt-auto">
                    <WhatsAppCTA
                      message={`Hi, I am interested in custom ordering the ${product.name} from your catalogue.`}
                      label="Inquire via WhatsApp"
                      variant="outline"
                      fullWidth
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
