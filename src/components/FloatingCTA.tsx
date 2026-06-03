"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function FloatingCTA() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTeaser, setShowTeaser] = useState(false)

  // Support reading the phone number from environment variables, fallback to original number
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "2348130024904"
  const message = "Hello, I would like to speak with the ILLUME Couture Concierge."

  useEffect(() => {
    // Show teaser tooltip after 5 seconds of initial load
    const timer = setTimeout(() => {
      if (!isOpen) {
        setShowTeaser(true)
      }
    }, 5000)

    // Hide teaser tooltip after 10 seconds of showing it
    const hideTimer = setTimeout(() => {
      setShowTeaser(false)
    }, 15000)

    return () => {
      clearTimeout(timer)
      clearTimeout(hideTimer)
    }
  }, [isOpen])

  const handleChat = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 pointer-events-none">
      {/* 1. Teaser Speech Bubble (Visible on load) */}
      <AnimatePresence>
        {showTeaser && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={() => {
              setIsOpen(true)
              setShowTeaser(false)
            }}
            className="bg-surface-4 text-text-inverse px-5 py-3.5 rounded-2xl border border-brand-gold/30 shadow-[0_15px_30px_-15px_rgba(0,0,0,0.5)] flex flex-col items-start gap-1 w-64 pointer-events-auto cursor-pointer hover:border-brand-gold transition-colors duration-300 relative"
          >
            <div className="absolute right-6 bottom-[-6px] w-3 h-3 bg-surface-4 border-r border-b border-brand-gold/30 rotate-45" />
            <span className="font-display text-[0.85rem] font-semibold text-brand-gold tracking-wide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              ILLUME CONCIERGE
            </span>
            <span className="font-ui text-xs text-text-inverse/85 leading-normal">
              Interested in a custom design? Speak directly with our design house.
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Interactive Expanded Chat Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-surface-4 text-text-inverse rounded-3xl border border-brand-gold/25 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.65)] w-80 overflow-hidden pointer-events-auto flex flex-col"
          >
            {/* Header */}
            <div className="bg-brand-purple p-5 flex items-center justify-between border-b border-brand-gold/15 relative">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full bg-surface-4 border border-brand-gold/30 flex items-center justify-center font-display text-brand-gold font-bold text-sm">
                  IL
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-brand-purple" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-brand-gold tracking-wide">ILLUME Concierge</h4>
                  <p className="text-[0.68rem] text-white/60 font-ui">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-brand-gold transition-colors p-1.5 rounded-full hover:bg-white/5 focus:outline-none"
                aria-label="Close chat window"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-6 bg-surface-4 space-y-4 max-h-48 overflow-y-auto">
              <div className="bg-white/5 border border-white/5 p-4 rounded-2xl rounded-tl-none">
                <p className="font-ui text-xs text-white/90 leading-relaxed">
                  Hello there! Welcome to **ILLUME Couture**. 
                  <br /><br />
                  How can we assist you with your dream bridal gown, bespoke suit fitting, or custom design inquiry today?
                </p>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-5 bg-surface-4 border-t border-white/5 flex flex-col gap-2">
              <button
                onClick={handleChat}
                className="w-full inline-flex items-center justify-center rounded-full bg-brand-gold text-brand-black px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-brand-white hover:-translate-y-0.5 shadow-md active:translate-y-0"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.766.459 3.493 1.332 5.01L2 22l5.105-1.339A9.972 9.972 0 0012.031 22c5.54 0 10.03-4.49 10.03-10.03S17.571 2 12.031 2zm0 18.344a8.311 8.311 0 01-4.24-1.159l-.304-.18-3.15.826.837-3.072-.198-.314A8.32 8.32 0 013.656 12.03c0-4.619 3.757-8.375 8.375-8.375 4.62 0 8.376 3.756 8.376 8.375s-3.756 8.376-8.376 8.376zm4.597-6.28c-.252-.126-1.492-.737-1.724-.821-.231-.084-.4-.126-.569.126-.168.252-.65 8.821-.798.989-.147.168-.294.189-.546.063-.252-.126-1.066-.393-2.03-1.253-.75-.67-1.258-1.497-1.405-1.749-.147-.252-.016-.388.11-.514.113-.113.252-.294.378-.441.126-.147.168-.252.252-.421.084-.168.042-.315-.021-.441-.063-.126-.568-1.371-.778-1.875-.205-.494-.415-.427-.569-.434-.147-.007-.315-.008-.483-.008s-.441.063-.672.315c-.231.252-.882.861-.882 2.101s.903 2.437 1.029 2.605c.126.168 1.775 2.712 4.3 3.801.601.259 1.07.414 1.436.53.604.192 1.153.164 1.587.1.487-.072 1.492-.61 1.702-1.198.21-.588.21-1.093.147-1.198-.063-.105-.231-.168-.483-.294z" clipRule="evenodd" />
                </svg>
                Start Chat
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Concierge Floating Toggle Button */}
      <div className="relative group pointer-events-auto">
        {/* Pulsing Gold Ring */}
        {!isOpen && (
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
        )}

        <button
          onClick={() => {
            setIsOpen(!isOpen)
            setShowTeaser(false)
          }}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center border shadow-[0_20px_50px_-12px_rgba(48,25,52,0.6)] cursor-pointer transition-all duration-300 focus:outline-none ${
            isOpen
              ? "bg-brand-gold text-brand-black border-brand-gold hover:bg-brand-white"
              : "bg-brand-purple text-brand-gold border-brand-gold/50 hover:scale-105 active:scale-95 group-hover:border-brand-gold"
          }`}
          aria-label={isOpen ? "Close concierge chat" : "Chat with concierge"}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7 filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12.031 2C6.49 2 2 6.49 2 12.031c0 1.766.459 3.493 1.332 5.01L2 22l5.105-1.339A9.972 9.972 0 0012.031 22c5.54 0 10.03-4.49 10.03-10.03S17.571 2 12.031 2zm0 18.344a8.311 8.311 0 01-4.24-1.159l-.304-.18-3.15.826.837-3.072-.198-.314A8.32 8.32 0 013.656 12.03c0-4.619 3.757-8.375 8.375-8.375 4.62 0 8.376 3.756 8.376 8.375s-3.756 8.376-8.376 8.376zm4.597-6.28c-.252-.126-1.492-.737-1.724-.821-.231-.084-.4-.126-.569.126-.168.252-.65 8.821-.798.989-.147.168-.294.189-.546.063-.252-.126-1.066-.393-2.03-1.253-.75-.67-1.258-1.497-1.405-1.749-.147-.252-.016-.388.11-.514.113-.113.252-.294.378-.441.126-.147.168-.252.252-.421.084-.168.042-.315-.021-.441-.063-.126-.568-1.371-.778-1.875-.205-.494-.415-.427-.569-.434-.147-.007-.315-.008-.483-.008s-.441.063-.672.315c-.231.252-.882.861-.882 2.101s.903 2.437 1.029 2.605c.126.168 1.775 2.712 4.3 3.801.601.259 1.07.414 1.436.53.604.192 1.153.164 1.587.1.487-.072 1.492-.61 1.702-1.198.21-.588.21-1.093.147-1.198-.063-.105-.231-.168-.483-.294z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
