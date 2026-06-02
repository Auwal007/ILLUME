"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import WhatsAppCTA from "@/components/WhatsAppCTA"
import { getFeaturedProducts } from "@/app/actions/products"

// Fallback Featured Products
const FALLBACK_FEATURED = [
  {
    id: "fb-1",
    name: "Zahra Bridal Gown",
    slug: "zahra-bridal-gown",
    price: 1200000,
    description: "A custom hand-beaded lace gown with a dramatic trailing skirt, silk chiffon drape, and structured inner corset.",
    category: { name: "Bridals & Asoebi" },
    image: "/images/hero_bridal.png"
  },
  {
    id: "fb-2",
    name: "Abuja Signature Suit",
    slug: "abuja-signature-suit",
    price: 450000,
    description: "Elite double-breasted suit crafted from ultra-fine charcoal virgin wool with premium silk lining.",
    category: { name: "Suits & Dinner" },
    image: "/images/suits_dinner.png"
  },
  {
    id: "fb-4",
    name: "Ebonyi Gala Gown",
    slug: "ebonyi-gala-gown",
    price: 650000,
    description: "Dramatic draped silk evening gown featuring a high slit and golden hand-embellished accents.",
    category: { name: "Evening Couture" },
    image: "/images/evening_couture.png"
  }
]

// FAQ Data
const FAQS = [
  {
    question: "How does the bespoke design process work?",
    answer: "Our process begins with an intimate private consultation (online or at our Abuja/Ebonyi ateliers) to discuss your vision. We then curate custom fabrics, sketch custom silhouettes, perform precise measurements, and carry out multiple fittings to ensure absolute physical and structural perfection."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, ILLUME ships globally via secure express courier services (DHL/FedEx). We regularly cater to international clients in the US, UK, Canada, and across Africa, ensuring remote measurement guides and secure packaging."
  },
  {
    question: "What are your lead times for custom orders?",
    answer: "Bespoke bridal gowns typically require 3 to 6 months of planning, fabric sourcing, and hand-embellishment. Custom suits and dinner wear require 4 to 6 weeks. Rush orders may be accommodated under special circumstances upon consultation."
  },
  {
    question: "How do fittings work if I am outside Abuja or Ebonyi?",
    answer: "For global and remote clients, we host guided video consultations to ensure precise measurements. We also collaborate with local partner tailors or send intermediate mock-ups (toiles) to guarantee an immaculate final fit before finishing the garment."
  }
]

// Testimonial Data
const TESTIMONIALS = [
  {
    quote: "The bridal gown ILLUME crafted was nothing short of a masterpiece. From the fabric selection to the hand-beaded lace, every detail was exquisite. It radiated elegance and fit flawlessly on my wedding day in Abuja.",
    author: "Dr. Chioma N.",
    role: "Bespoke Bride",
    location: "Abuja",
    category: "Bridal Couture"
  },
  {
    quote: "As someone who appreciates tailored silhouettes, I was blown away by the precision of my double-breasted dinner suit. The craftsmanship easily rivals Savile Row, with a distinct African luxury character.",
    author: "Tunde O.",
    role: "Managing Director",
    location: "Lagos",
    category: "Bespoke Suiting"
  },
  {
    quote: "Their team went above and beyond to procure a custom fabric for my reception dress. The remote fittings were incredibly detailed, and shipping to London was prompt. Truly a global luxury brand.",
    author: "Amara K.",
    role: "Creative Director",
    location: "London",
    category: "Heritage Couture"
  }
]

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([])

  useEffect(() => {
    getFeaturedProducts().then(products => {
      setFeaturedProducts(products || [])
    })
  }, [])

  const displayProducts = featuredProducts.length > 0
    ? featuredProducts.map(p => {
        let image = "/images/hero_bridal.png"
        try {
          const parsed = JSON.parse(p.images)
          if (Array.isArray(parsed) && parsed.length > 0) {
            image = parsed[0]
          }
        } catch (e) {}
        return {
          id: p.id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          description: p.description,
          category: p.category,
          image
        }
      })
    : FALLBACK_FEATURED

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[92vh]">
        <div className="bg-surface-2 px-6 py-24 lg:p-28 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-brand-gold/8 blur-[100px]" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand-purple/5 blur-[100px]" />
          </div>
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-brand-gold/15 to-transparent hidden lg:block" />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="max-w-xl relative z-10"
          >
            <div className="font-ui text-xs uppercase tracking-[0.38em] text-brand-deep-gold mb-6 font-semibold flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold"></span>
              Ateliers in Abuja & Ebonyi — Shipping Globally
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight text-brand-black mb-8 text-balance">
              Crafted in <br />
              <em className="text-brand-gold not-italic font-medium relative inline-block">
                Light.
                <span className="absolute bottom-2 left-0 w-full h-[2px] bg-brand-gold/20"></span>
              </em>
            </h1>

            <p className="text-base md:text-lg text-text-muted leading-relaxed mb-12 font-ui tracking-wide">
              African luxury fashion house. We translate cultural heritage into contemporary masterpieces through bespoke bridal wear, precision suiting, and custom visual identity consulting.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-brand-gold/40 bg-brand-black px-9 py-4.5 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-brand-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold hover:shadow-[0_25px_45px_-10px_rgba(212,175,55,0.25)] group"
              >
                Book Consultation
                <span className="ml-2.5 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center rounded-full border border-brand-black/20 bg-transparent px-9 py-4.5 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-black hover:bg-brand-black hover:text-brand-white"
              >
                Explore Collections
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Hero Image Block */}
        <div className="relative min-h-[60vh] lg:min-h-full bg-surface-4 overflow-hidden">
          <motion.div
            initial={{ scale: 1.08, opacity: 0.85 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="/images/hero_bridal.png"
              alt="ILLUME Bridal Couture Design"
              fill
              priority
              className="object-cover object-center pointer-events-none"
            />
            <div className="absolute inset-0 bg-brand-purple/10 mix-blend-overlay" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-purple/80 via-black/35 to-transparent" />
          </motion.div>

          {/* Floater overlay badge */}
          <div className="absolute bottom-8 left-8 z-10 bg-surface-4/80 backdrop-blur-md border border-brand-gold/25 p-5 rounded-2xl max-w-xs">
            <span className="font-display text-brand-gold text-lg font-bold block mb-1">Bespoke Bridal</span>
            <span className="font-ui text-white/80 text-xs leading-normal">
              Individually sketched and hand-beaded in our ateliers to illuminate your heritage.
            </span>
          </div>
        </div>
      </section>

      {/* Luxury Brand Marquee */}
      <div className="bg-surface-4 text-brand-milk py-7 overflow-hidden flex whitespace-nowrap border-y border-brand-gold/15">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="flex space-x-20 items-center"
        >
          {Array(8).fill(["Bespoke Bridal", "Heritage Couture", "Luxury Aso-Ebi", "Editorial Suiting"]).flat().map((text, i) => (
            <div key={i} className="flex items-center font-display text-lg tracking-[0.18em] uppercase font-semibold">
              {text}
              <span className="text-brand-gold ml-20 text-xs">✦</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Brand Philosophy Section */}
      <section className="py-36 px-6 bg-surface-1 text-center relative">
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <span className="font-display text-[9vw] md:text-[7vw] text-brand-gold/5 font-extrabold uppercase select-none tracking-[0.3em]">
            ILLUME
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <span className="font-display italic text-brand-deep-gold text-xl block mb-6">Our Philosophy</span>
          <blockquote className="font-display text-4xl md:text-5xl font-medium leading-[1.3] text-brand-black text-balance mb-8">
            "Fashion should not just be seen, <br />
            <span className="text-brand-gold font-normal">but felt.</span>"
          </blockquote>
          <div className="w-16 h-px bg-brand-gold/40 mx-auto mb-6" />
          <div className="text-text-muted font-ui tracking-[0.2em] text-xs uppercase font-semibold">— Ikedichukwu Peace, Founder</div>
        </motion.div>
      </section>

      {/* Featured Masterpieces Section */}
      <section className="py-36 px-6 bg-surface-2 border-t border-brand-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="font-display italic text-brand-deep-gold text-lg tracking-wider block mb-3">
              Selected Creations
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-black tracking-tight">
              Featured Masterpieces
            </h2>
            <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {displayProducts.slice(0, 3).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group flex flex-col justify-between bg-surface-1 p-5 rounded-[32px] border border-brand-gold/5 shadow-[0_15px_35px_-20px_rgba(0,0,0,0.15)] hover:border-brand-gold/25 transition-all duration-300"
              >
                <div>
                  {/* Image Block */}
                  <Link
                    href={`/catalogue/${product.slug}`}
                    className="block relative aspect-[3/4] bg-surface-2 rounded-2xl overflow-hidden mb-6 group-hover:shadow-md transition-all duration-300"
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
                      {product.category?.name || "Bespoke Design"}
                    </div>
                    <Link href={`/catalogue/${product.slug}`}>
                      <h3 className="font-display text-2xl font-bold text-brand-black hover:text-brand-gold transition-colors mb-3 tracking-wide">
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
                    message={`Hi, I am interested in custom ordering the featured ${product.name} from your collection.`}
                    label="Inquire via WhatsApp"
                    variant="outline"
                    fullWidth
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="/catalogue" className="inline-flex items-center gap-3 border-b border-brand-black/30 pb-2.5 text-[0.72rem] font-bold uppercase tracking-[0.3em] hover:text-brand-gold hover:border-brand-gold transition-colors duration-300">
              View Entire Catalogue
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Collections/Atelier Categories Grid */}
      <section className="py-36 px-6 bg-surface-2 border-y border-brand-gold/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="font-display italic text-brand-deep-gold text-lg tracking-wider block mb-3">Masterful Craftsmanship</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-black tracking-tight">The Ateliers</h2>
            <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Bridals & Asoebi", desc: "Culturally rooted bridal design and coordinated wedding garments tailored for memorable moments.", img: "/images/bridal_asoebi.png" },
              { title: "Suits & Dinner", desc: "Sartorial precision and tailored lines crafted from luxury wools for distinguished formal occasions.", img: "/images/suits_dinner.png" },
              { title: "African Luxury", desc: "Traditional textures and detailed embroidery re-envisioned for international runways.", img: "/images/african_luxury.png" },
              { title: "Evening Couture", desc: "High-fashion statements and red-carpet gowns featuring custom draping and silhouettes.", img: "/images/evening_couture.png" },
              { title: "Atelier Consultancy", desc: "Private design sessions mapping your aesthetic style and visual brand identity.", img: "/images/consultancy.png" },
              { title: "Heritage Wear", desc: "Timeless handcrafted detailing celebrating historical styles through modern luxury aesthetics.", img: "/images/heritage.png" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer shadow-[0_20px_50px_-25px_rgba(0,0,0,0.4)] border border-brand-gold/10"
              >
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-purple/95 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-500" />
                
                <div className="absolute bottom-0 left-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 w-full">
                  <div className="w-8 h-px bg-brand-gold mb-3 transition-all duration-500 group-hover:w-16" />
                  <h3 className="font-display text-2xl font-semibold text-brand-milk mb-3">{item.title}</h3>
                  <p className="text-white/80 text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link href="/catalogue" className="inline-flex items-center gap-3 border-b border-brand-black/30 pb-2.5 text-[0.72rem] font-bold uppercase tracking-[0.3em] hover:text-brand-gold hover:border-brand-gold transition-colors duration-300">
              Explore Full Catalogue
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Process Journey */}
      <section className="py-36 px-6 bg-brand-purple text-text-inverse relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-brand-gold/8 blur-[120px]" />
          <div className="absolute bottom-0 left-0 h-[600px] w-[600px] rounded-full bg-black/40 blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div>
            <span className="font-display italic text-brand-gold text-lg block mb-4">The Fitting Journey</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-16 text-brand-milk">
              Your Path to <em className="text-brand-gold not-italic font-normal">Perfection.</em>
            </h2>

            <div className="space-y-12">
              {[
                { num: "01", title: "Consultation & Sketching", desc: "An intimate design session charting your style profile, vision, and measurements, culminating in custom fashion illustrations." },
                { num: "02", title: "Material & Detail Curation", desc: "Sourcing and selection of luxurious silks, fine wools, and hand-embroidered laces that showcase your persona." },
                { num: "03", title: "Meticulous Tailoring", desc: "Our skilled tailors construct the structural base of the garment, preparing elements for detailing and fittings." },
                { num: "04", title: "Final Fitting & Handover", desc: "Refining every line, seam, and contour to fall immaculately, delivering a garment crafted to highlight your light." },
              ].map((step, i) => (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="flex gap-8 group"
                >
                  <div className="font-display text-4xl font-extrabold text-brand-gold/60 leading-none group-hover:text-brand-gold transition-colors duration-300">{step.num}</div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-brand-milk mb-2 tracking-wide">{step.title}</h3>
                    <p className="text-white/70 text-sm leading-relaxed font-ui">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Premium workspace photography framing */}
          <div className="hidden lg:block relative h-[650px] bg-white/5 rounded-3xl overflow-hidden border border-white/10 p-4">
            <div className="absolute inset-0 m-6 border border-brand-gold/15 rounded-2xl overflow-hidden">
              <Image
                src="/images/consultancy.png"
                alt="ILLUME Atelier Consultation Studio"
                fill
                className="object-cover opacity-85 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-purple via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8 right-8 text-center bg-surface-4/90 backdrop-blur-md p-6 border border-brand-gold/20 rounded-xl">
                <span className="font-display text-brand-gold text-sm tracking-widest uppercase block mb-1">THE ATELIER</span>
                <span className="font-ui text-white/70 text-xs">Crafting identity and culture into wearable sculpture.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Testimonials Section */}
      <section className="py-36 px-6 bg-surface-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="font-display italic text-brand-deep-gold text-lg block mb-3">Client Chronicles</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-black tracking-tight">Voices of Distinction</h2>
            <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={t.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-surface-2 p-10 rounded-3xl border border-brand-gold/10 relative flex flex-col justify-between shadow-[0_15px_40px_-20px_rgba(212,175,55,0.08)]"
              >
                <div>
                  <div className="flex text-brand-gold gap-1 mb-8 text-sm">
                    {Array(5).fill(null).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <blockquote className="font-display text-lg text-brand-black italic leading-relaxed mb-10">
                    "{t.quote}"
                  </blockquote>
                </div>
                <div className="border-t border-brand-gold/15 pt-6 mt-auto">
                  <div className="font-display font-bold text-brand-black">{t.author}</div>
                  <div className="text-xs text-text-muted mt-1 uppercase tracking-wider font-semibold font-ui">
                    {t.role} • <span className="text-brand-deep-gold">{t.category}</span>
                  </div>
                  <div className="text-[0.7rem] text-text-muted mt-0.5 uppercase tracking-widest">{t.location}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section className="py-36 px-6 bg-surface-2 border-t border-brand-gold/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-24">
            <span className="font-display italic text-brand-deep-gold text-lg block mb-3">Got Questions?</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-black tracking-tight">Atelier Inquiries</h2>
            <div className="w-20 h-0.5 bg-brand-gold mx-auto mt-6" />
          </div>

          <div className="space-y-6">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="bg-surface-1 rounded-2xl border border-brand-gold/10 overflow-hidden shadow-sm"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-6 focus:outline-none cursor-pointer"
                >
                  <span className="font-display text-lg md:text-xl font-bold text-brand-black tracking-wide">
                    {faq.question}
                  </span>
                  <span className="text-brand-gold text-2xl font-light">
                    {activeFaq === i ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 md:p-8 pt-0 border-t border-brand-gold/5">
                        <p className="text-text-muted text-sm md:text-base leading-relaxed font-ui">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Action/Call to Action */}
      <section className="py-40 px-6 bg-surface-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-brand-gold/10 blur-[120px]" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-brand-purple/20 blur-[120px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto relative z-10"
        >
          <span className="font-display italic text-brand-gold text-lg block mb-4">Your Custom Piece Awaits</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 text-brand-milk tracking-tight">
            Begin Your <br className="md:hidden" />
            <em className="text-brand-gold not-italic font-normal">Fitting Journey.</em>
          </h2>
          <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto mb-14 font-ui leading-relaxed">
            Radiance you can wear. Collaborate with our atelier to design garments that capture and reflect your inner light.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <WhatsAppCTA
              message="Hi ILLUME, I would like to book a luxury consultation."
              label="Chat with the Designer"
              className="py-4.5 px-10 text-xs font-bold uppercase tracking-[0.25em]"
            />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-transparent px-10 py-4.5 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-white hover:bg-white hover:text-brand-black transition-all duration-300 hover:-translate-y-0.5"
            >
              Book At Atelier
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
