"use client"

import Link from "next/link"
import { ShoppingCart, Menu, X } from "lucide-react"
import { useState } from "react"

export default function Navigation({ cartCount, onCartClick }: { cartCount: number; onCartClick: () => void }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="hidden sm:inline font-bold text-lg text-primary">Riad Saveurs</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-foreground hover:text-primary transition">
              Accueil
            </Link>
            <Link href="/menu" className="text-foreground hover:text-primary transition">
              Menu
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button onClick={onCartClick} className="relative p-2 hover:bg-muted rounded-lg transition">
              <ShoppingCart className="w-6 h-6 text-primary" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg transition">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-4 py-2 hover:bg-muted rounded-lg transition">
              Accueil
            </Link>
            <Link href="/menu" className="block px-4 py-2 hover:bg-muted rounded-lg transition">
              Menu
            </Link>
            <Link href="/contact" className="block px-4 py-2 hover:bg-muted rounded-lg transition">
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
