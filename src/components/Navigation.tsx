"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
            : "bg-white border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <h1 className="font-display text-2xl font-bold tracking-wider">ILLUME</h1>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <NavLink href="/collections">Collections</NavLink>
              <NavLink href="/catalogue">Catalogue</NavLink>
              <NavLink href="/lookbook">Lookbook</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>

            <div className="hidden md:flex">
              <Link
                href="/contact"
                className="bg-brand-black text-white px-6 py-2.5 text-sm font-semibold tracking-wide border border-brand-black hover:bg-white hover:text-brand-black transition-colors"
              >
                Book Appointment
              </Link>
            </div>

            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-black p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-white pt-20"
          >
            <div className="px-4 pt-4 pb-8 space-y-4 flex flex-col items-center">
              <MobileNavLink href="/collections" onClick={() => setIsMobileMenuOpen(false)}>Collections</MobileNavLink>
              <MobileNavLink href="/catalogue" onClick={() => setIsMobileMenuOpen(false)}>Catalogue</MobileNavLink>
              <MobileNavLink href="/lookbook" onClick={() => setIsMobileMenuOpen(false)}>Lookbook</MobileNavLink>
              <MobileNavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>About</MobileNavLink>
              <MobileNavLink href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</MobileNavLink>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-brand-black text-white px-6 py-3 mt-4 text-sm font-semibold tracking-wide border border-brand-black hover:bg-white hover:text-brand-black transition-colors"
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
      className="text-brand-black text-sm font-medium tracking-wide relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-2xl font-display text-brand-black hover:text-brand-gold transition-colors py-2"
    >
      {children}
    </Link>
  )
}
