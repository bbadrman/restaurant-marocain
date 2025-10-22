"use client"

import { useState } from "react"
import { useProducts } from "@/hooks/use-products"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import DishCard from "@/components/dish-card"
import Cart from "@/components/cart"

export default function MenuPage() {
  const { products } = useProducts()
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const categories = ["Tous", ...new Set(products.map((d) => d.category))]
  const filtered = selectedCategory === "Tous" ? products : products.filter((d) => d.category === selectedCategory)

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

      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Notre Menu Complet</h1>
          <p className="text-lg text-muted-foreground">Explorez toutes nos délicieuses spécialités marocaines</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Dishes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((dish) => (
              <DishCard key={dish.id} dish={dish} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
