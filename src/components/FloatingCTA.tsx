"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingCTA() {
  const [showTooltip, setShowTooltip] = useState(false)
  const phoneNumber = "2348130024904"
  const message = "Hello, I would like to speak with the ILLUME Couture Concierge."

  useEffect(() => {
    // Show tooltip after 5 seconds of initial load
    const timer = setTimeout(() => {
      setShowTooltip(true)
    }, 5000)

    // Hide tooltip after 10 seconds of showing it
    const hideTimer = setTimeout(() => {
      setShowTooltip(false)
    }, 15000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [])

  const handleChat = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center justify-end">
      {/* Speech Bubble Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute right-20 bg-surface-4 text-text-inverse px-5 py-3.5 rounded-2xl border border-brand-gold/30 shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)] flex flex-col items-start gap-1 w-64 pointer-events-auto cursor-pointer"
            onClick={handleChat}
          >
            <div className="absolute right-[-6px] top-[50%] -translate-y-[50%] w-3 h-3 bg-surface-4 border-r border-t border-brand-gold/30 rotate-45" />
            <span className="font-display text-[0.85rem] font-semibold text-brand-gold tracking-wide">ILLUME CONCIERGE</span>
            <span className="font-ui text-xs text-text-inverse/85 leading-normal">
              Interested in a custom design? Speak directly with our design house.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Concierge Floating Button */}
      <div className="relative group">
        {/* Gold Pulse Ring 1 */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-brand-gold/25"
        />

        {/* Floating Button */}
        <button
          onClick={handleChat}
          onMouseEnter={() => setShowTooltip(true)}
          className="relative w-16 h-16 rounded-full bg-brand-purple text-brand-gold flex items-center justify-center border border-brand-gold/50 shadow-[0_20px_50px_-12px_rgba(48,25,52,0.6)] cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95 group-hover:border-brand-gold focus:outline-none"
          aria-label="Chat with concierge"
        >
          <svg className="w-7 h-7 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.766.459 3.493 1.332 5.01L2 22l5.105-1.339A9.972 9.972 0 0012.031 22c5.54 0 10.03-4.49 10.03-10.03S17.571 2 12.031 2zm0 18.344a8.311 8.311 0 01-4.24-1.159l-.304-.18-3.15.826.837-3.072-.198-.314A8.32 8.32 0 013.656 12.03c0-4.619 3.757-8.375 8.375-8.375 4.62 0 8.376 3.756 8.376 8.375s-3.756 8.376-8.376 8.376zm4.597-6.28c-.252-.126-1.492-.737-1.724-.821-.231-.084-.4-.126-.569.126-.168.252-.65 8.821-.798.989-.147.168-.294.189-.546.063-.252-.126-1.066-.393-2.03-1.253-.75-.67-1.258-1.497-1.405-1.749-.147-.252-.016-.388.11-.514.113-.113.252-.294.378-.441.126-.147.168-.252.252-.421.084-.168.042-.315-.021-.441-.063-.126-.568-1.371-.778-1.875-.205-.494-.415-.427-.569-.434-.147-.007-.315-.008-.483-.008s-.441.063-.672.315c-.231.252-.882.861-.882 2.101s.903 2.437 1.029 2.605c.126.168 1.775 2.712 4.3 3.801.601.259 1.07.414 1.436.53.604.192 1.153.164 1.587.1.487-.072 1.492-.61 1.702-1.198.21-.588.21-1.093.147-1.198-.063-.105-.231-.168-.483-.294z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}
