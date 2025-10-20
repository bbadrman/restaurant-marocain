"use client"

import { useState } from "react"
import MenuModal from "./menu-modal"

export default function Hero() {
  const [showMenuModal, setShowMenuModal] = useState(false)

  return (
    <>
      <section className="relative h-96 md:h-[500px] bg-gradient-to-r from-primary/90 to-secondary/90 overflow-hidden">
        {/* Moroccan pattern background */}
        <div className="absolute inset-0 pattern-geometric opacity-10"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4 text-balance">
            Bienvenue à Riad Saveurs
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl text-balance">
            Découvrez l'authenticité des saveurs marocaines dans une ambiance chaleureuse et conviviale
          </p>
          <button
            onClick={() => setShowMenuModal(true)}
            className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105"
          >
            Découvrir le Menu
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 border-2 border-accent/30 rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 border-2 border-accent/20 rounded-full"></div>
      </section>

      <MenuModal isOpen={showMenuModal} onClose={() => setShowMenuModal(false)} />
    </>
  )
}
