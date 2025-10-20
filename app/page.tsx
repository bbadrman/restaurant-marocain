"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import FeaturedDishes from "@/components/featured-dishes"
import Footer from "@/components/footer"
import Cart from "@/components/cart"

export default function Home() {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])

  const addToCart = (dish: any) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id)
      if (existing) {
        return prev.map((item) => (item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...dish, quantity: 1 }]
    })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} />
      {showCart && <Cart items={cartItems} setItems={setCartItems} onClose={() => setShowCart(false)} />}
      <Hero />
      <FeaturedDishes onAddToCart={addToCart} />
      <Footer />
    </main>
  )
}
