"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-surface-1/80 backdrop-blur-xl border-b border-brand-gold/15 shadow-[0_12px_45px_-30px_rgba(212,175,55,0.15)]"
            : "bg-surface-1/40 backdrop-blur-lg border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-22">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <Image
                src="/img/logo.png"
                alt="ILLUME Logo"
                width={130}
                height={45}
                className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </Link>

            <div className="hidden md:flex items-center space-x-10">
              <NavLink href="/collections">Collections</NavLink>
              <NavLink href="/catalogue">Catalogue</NavLink>
              <NavLink href="/lookbook">Lookbook</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>

            <div className="hidden md:flex">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-brand-gold/40 bg-brand-black px-7 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-brand-white shadow-[0_16px_40px_-24px_rgba(0,0,0,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold hover:shadow-[0_20px_45px_-12px_rgba(212,175,55,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50 focus-visible:ring-offset-2"
              >
                Book Appointment
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-text-primary p-2.5 rounded-full border border-brand-gold/15 hover:bg-brand-milk/60 transition-colors focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 bg-surface-1/98 backdrop-blur-2xl pt-24"
          >
            <div className="px-6 pt-4 pb-12 space-y-6 flex flex-col items-center justify-center min-h-[60vh]">
              <MobileNavLink href="/collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</MobileNavLink>
              <MobileNavLink href="/catalogue" onClick={() => setIsMobileMenuOpen(false)}>Catalogue</MobileNavLink>
              <MobileNavLink href="/lookbook" onClick={() => setIsMobileMenuOpen(false)}>Lookbook</MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full max-w-xs text-center rounded-full border border-brand-gold/30 bg-brand-black px-6 py-4 mt-6 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-brand-white shadow-lg transition-all duration-300 hover:bg-brand-gold hover:text-brand-black"
              >
                Book Appointment
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-text-muted text-[0.72rem] font-semibold uppercase tracking-[0.28em] relative group transition-colors duration-300 hover:text-brand-black"
    >
      {children}
      <span className="absolute -bottom-2.5 left-0 w-0 h-[2px] bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-3xl font-display text-text-primary tracking-wider hover:text-brand-deep-gold transition-colors py-2"
    >
      {children}
    </Link>
  )
}
