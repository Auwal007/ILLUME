"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import WhatsAppCTA from "@/components/WhatsAppCTA"

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[90vh]">
        <div className="bg-brand-milk px-6 py-20 lg:p-24 flex flex-col justify-center relative">
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-black/10 to-transparent hidden lg:block" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <div className="font-display italic text-lg text-brand-deep-gold tracking-wide mb-6">
              Luxury Fashion House
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight text-brand-black mb-8">
              Crafted in <em className="text-brand-gold not-italic font-medium">Light.</em>
            </h1>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-10 text-balance">
              African luxury fashion house. We don't just design garments — we illuminate identity through bespoke bridals, suits, and culturally rooted elegance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center bg-brand-black text-white px-8 py-4 font-semibold tracking-wide hover:bg-white hover:text-brand-black border border-brand-black transition-all group">
                Book Consultation
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/collections" className="inline-flex items-center justify-center bg-transparent text-brand-black px-8 py-4 font-semibold tracking-wide border border-brand-black hover:bg-brand-black hover:text-white transition-all">
                View Collections
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="relative min-h-[50vh] lg:min-h-full bg-brand-black overflow-hidden">
          <motion.div
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            {/* Placeholder for Hero Image */}
            <div className="absolute inset-0 bg-gray-900 flex items-center justify-center text-gray-700 text-sm">
              [Hero Image: Bridal Collection]
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="bg-brand-black text-brand-white py-6 overflow-hidden flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex space-x-16 items-center"
        >
          {Array(8).fill(["Bespoke Bridal", "Heritage Couture", "Luxury Aso-Ebi", "Editorial Fashion"]).flat().map((text, i) => (
            <div key={i} className="flex items-center font-display text-xl tracking-widest uppercase">
              {text}
              <span className="text-brand-gold ml-16 text-sm">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-brand-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <blockquote className="font-display text-4xl md:text-5xl font-medium leading-[1.3] text-brand-black text-balance">
            "Fashion should not just be seen,<br />
            <em className="text-brand-gold not-italic">but felt.</em>"
          </blockquote>
          <div className="mt-8 text-gray-600 tracking-wider">— Ikedichukwu Peace, Founder</div>
        </motion.div>
      </section>

      {/* Services/Collections Grid */}
      <section className="py-32 px-6 bg-brand-milk">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="font-display italic text-brand-deep-gold tracking-wide mb-4">Our Collections</div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold text-brand-black">Crafted for Every Occasion</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Bridals & Asoebi", desc: "Culturally rooted elegance for life's most sacred moments", img: "bridalspics" },
              { title: "Suits & Dinner", desc: "Mastered silhouettes for the corridors of power", img: "suitpics" },
              { title: "African Luxury", desc: "Traditional forms reimagined for the global stage", img: "luxurypics" },
              { title: "Consultancy", desc: "Expert guidance on visual identity and wardrobe curation", img: "couturepics" },
              { title: "Evening Couture", desc: "Statement pieces for galas and formal occasions", img: "dinnerpics" },
              { title: "Heritage", desc: "Timeless Nigerian craftsmanship meets contemporary design", img: "heritagepics" },
            ].map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative aspect-[3/4] bg-brand-black overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-600 text-xs">[{service.img}.png]</div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="font-display text-2xl font-semibold text-white mb-2">{service.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{service.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/catalogue" className="inline-block border-b border-brand-black pb-1 font-semibold hover:text-brand-gold hover:border-brand-gold transition-colors">
              Explore Full Catalogue
            </Link>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 px-6 bg-brand-purple text-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-16">
              Your Journey to <em className="text-brand-gold not-italic">Perfection</em>
            </h2>

            <div className="space-y-12">
              {[
                { num: "01", title: "Consultation", desc: "We begin with an intimate conversation about your vision, style, and the occasion that brings you to us." },
                { num: "02", title: "Design & Selection", desc: "Together, we curate fabrics, silhouettes, and details that reflect your personality and celebrate your story." },
                { num: "03", title: "Craftsmanship", desc: "Our artisans bring your vision to life with meticulous attention to every stitch, drape, and embellishment." },
                { num: "04", title: "Final Fitting", desc: "We ensure absolute perfection—every seam, every line, tailored to embrace you flawlessly." },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}

                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-8"
                >
                  <div className="font-display text-4xl font-bold text-brand-gold leading-none">{step.num}</div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-white/80 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="hidden lg:block relative h-full min-h-[600px] bg-white/5">
            {/* Decorative element / process image placeholder */}
            <div className="absolute inset-0 border border-white/10 m-8 flex items-center justify-center">
               <span className="text-white/30 font-display italic tracking-widest uppercase">The Atelier</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-brand-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-4xl md:text-6xl font-semibold mb-8">
            Begin Your <em className="text-brand-gold not-italic">Journey.</em>
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Radiance you can wear. Let's illuminate your identity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <WhatsAppCTA
              message="Hi ILLUME, I would like to book a consultation."
              label="Chat with Designer"
              className="py-4 px-8 text-lg"
            />
          </div>
        </div>
      </section>
    </>
  )
}
