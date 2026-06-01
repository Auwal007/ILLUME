"use client"

import { motion } from "framer-motion"

export default function AnnouncementBar() {
  return (
    <div className="bg-brand-black text-brand-white text-center py-2.5 px-4 text-sm font-ui tracking-wide relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-gold to-transparent"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      Bespoke African Luxury — <strong className="text-brand-gold font-semibold">Ateliers in Abuja & Ebonyi</strong> — Shipping Globally
    </div>
  )
}
