"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import WhatsAppCTA from "@/components/WhatsAppCTA"

// Lookbook gallery items
const LOOKBOOK_ITEMS = [
  { id: 1, label: "Bespoke Bridal Couture", image: "/images/hero_bridal.png", aspect: "aspect-[3/4]", desc: "Intricately detailed hand-beaded lace and tulle wedding gown." },
  { id: 2, label: "Contemporary Heritage", image: "/images/heritage.png", aspect: "aspect-square", desc: "Traditional Nigerian fashion forms reinvented for the contemporary runway." },
  { id: 3, label: "Luxury Bridal Aso-Ebi", image: "/images/bridal_asoebi.png", aspect: "aspect-[4/5]", desc: "Chic cream and gold coordinated celebration attire." },
  { id: 4, label: "Bespoke Dinner Suit", image: "/images/suits_dinner.png", aspect: "aspect-[4/5]", desc: "Double-breasted tailored menswear crafted from fine wool." },
  { id: 5, label: "Atelier Consultancy", image: "/images/consultancy.png", aspect: "aspect-square", desc: "Private sketches and fabric selection workspace in our Abuja studio." },
  { id: 6, label: "Red-Carpet Evening Couture", image: "/images/evening_couture.png", aspect: "aspect-[3/4]", desc: "Dramatic draped silk evening gown with golden accents." },
]

export default function LookbookPage() {
  const [selectedItem, setSelectedItem] = useState<typeof LOOKBOOK_ITEMS[0] | null>(null)

  return (
    <div className="min-h-screen bg-brand-white">
      {/* Header */}
      <section className="bg-brand-black text-white py-36 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-brand-gold/10 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-brand-purple/20 blur-[100px]" />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="font-display italic text-brand-gold text-lg block mb-4">Visual Narratives</span>
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-8 tracking-tight text-brand-milk">
            Editorial Lookbook
          </h1>
          <div className="w-16 h-px bg-brand-gold/40 mx-auto mb-8" />
          <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto font-ui leading-relaxed">
            A photographic study exploring the intersection of cultural heritage, premium textiles, and contemporary draping.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="max-w-[1600px] mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {LOOKBOOK_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onClick={() => setSelectedItem(item)}
              className={`relative bg-surface-2 overflow-hidden rounded-3xl group cursor-pointer border border-brand-gold/5 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.2)] ${item.aspect}`}
            >
              <Image
                src={item.image}
                alt={item.label}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-brand-purple/90 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <span className="font-display text-brand-gold text-xs uppercase tracking-widest block mb-2 font-semibold">VIEW PIECE ✦</span>
                <h3 className="font-display text-2xl text-brand-milk font-bold leading-snug mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {item.label}
                </h3>
                <p className="text-white/70 text-xs leading-normal font-ui translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-28 max-w-xl mx-auto border-t border-brand-gold/15 pt-16">
          <span className="font-display italic text-brand-deep-gold text-lg block mb-3">Envision Your Silhouette</span>
          <p className="text-text-muted mb-8 font-ui text-sm">Have a vision for a specific silhouette or fabric drapery in this lookbook?</p>
          <WhatsAppCTA
            message="Hi ILLUME, I'm reviewing your lookbook and would like to inquire about a custom design."
            label="Inquire custom design"
          />
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            {/* Close trigger area */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={() => setSelectedItem(null)} />
            
            {/* Lightbox Content Card */}
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative bg-surface-4 border border-brand-gold/25 rounded-3xl overflow-hidden max-w-5xl w-full max-h-[85vh] grid grid-cols-1 md:grid-cols-2 z-10 shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
            >
              {/* Image Frame */}
              <div className="relative min-h-[40vh] md:min-h-[60vh] bg-surface-3">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.label}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Close Button top corner for mobile/all */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-brand-gold hover:text-black transition-colors focus:outline-none z-20 cursor-pointer"
                aria-label="Close details"
              >
                ✕
              </button>

              {/* Detail Frame */}
              <div className="p-8 md:p-12 flex flex-col justify-between text-text-inverse">
                <div>
                  <div className="w-8 h-[2px] bg-brand-gold mb-6" />
                  <span className="text-[0.65rem] uppercase tracking-[0.3em] text-brand-gold font-bold block mb-3">ILLUME LOOKBOOK</span>
                  <h2 className="font-display text-3xl font-bold text-brand-milk tracking-tight mb-6">{selectedItem.label}</h2>
                  <p className="text-white/70 text-sm leading-relaxed font-ui mb-8">{selectedItem.desc}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-white/10 mt-auto">
                  <WhatsAppCTA
                    message={`Hi, I'm interested in the lookbook piece: ${selectedItem.label}.`}
                    label="Chat with Concierge about this piece"
                    fullWidth
                  />
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="w-full py-3.5 border border-white/10 rounded-full text-xs font-semibold text-white hover:bg-white/5 transition-colors focus:outline-none"
                  >
                    Return to Lookbook
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
