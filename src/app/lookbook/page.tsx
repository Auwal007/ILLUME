import prisma from "@/lib/prisma"
import Image from "next/image"
import Link from "next/link"

export default async function LookbookPage() {
  return (
    <div className="min-h-screen bg-brand-white">
      <div className="bg-brand-black text-white py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="font-display italic text-brand-gold tracking-wide mb-4">Latest Collection</div>
          <h1 className="font-display text-5xl md:text-7xl font-semibold mb-8">
            Editorial Lookbook
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A visual exploration of our latest bespoke creations, highlighting the intersection of cultural heritage and modern luxury.
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Static gallery items for now based on original HTML */}
          {[
            { label: "Editorial I", aspect: "aspect-[3/4]" },
            { label: "Couture", aspect: "aspect-square" },
            { label: "Bridal", aspect: "aspect-[4/5]" },
            { label: "Evening Wear", aspect: "aspect-[4/5]" },
            { label: "Heritage", aspect: "aspect-square" },
            { label: "Editorial II", aspect: "aspect-[3/4]" },
          ].map((item, i) => (
            <div key={i} className={`relative bg-gray-100 overflow-hidden group ${item.aspect}`}>
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                [Image: {item.label}]
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="font-display text-2xl text-white font-semibold tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <p className="text-gray-600 mb-6">See a piece that captures your light?</p>
          <Link href="/contact" className="inline-flex items-center justify-center bg-brand-black text-white px-8 py-4 font-semibold hover:bg-brand-gold hover:text-brand-black transition-colors">
            Inquire About Custom Design
          </Link>
        </div>
      </div>
    </div>
  )
}
