"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { ShoppingCart, Clock, Users, ChefHat } from "lucide-react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import { dishesData } from "@/lib/dishes-data"

export default function DishDetailPage() {
  const params = useParams()
  const dishId = Number.parseInt(params.id as string)
  const dish = dishesData.find((d) => d.id === dishId)

  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [quantity, setQuantity] = useState(1)

  if (!dish) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-foreground">Plat non trouvé</h1>
        </div>
        <Footer />
      </main>
    )
  }

  const addToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === dish.id)
      if (existing) {
        return prev.map((item) => (item.id === dish.id ? { ...item, quantity: item.quantity + quantity } : item))
      }
      return [...prev, { ...dish, quantity }]
    })
    setQuantity(1)
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation cartCount={cartItems.length} onCartClick={() => setShowCart(!showCart)} />
      {showCart && <Cart items={cartItems} setItems={setCartItems} onClose={() => setShowCart(false)} />}

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
              </div>
            </div>

            {/* Details */}
            <div>
              <div className="mb-6">
                <span className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
                  {dish.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{dish.name}</h1>
                <p className="text-xl text-muted-foreground mb-6">{dish.description}</p>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Préparation</span>
                  </div>
                  <p className="text-muted-foreground">{dish.prepTime}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ChefHat className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Cuisson</span>
                  </div>
                  <p className="text-muted-foreground">{dish.cookTime}</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Portions</span>
                  </div>
                  <p className="text-muted-foreground">{dish.servings} personnes</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold text-2xl text-primary">€</span>
                    <span className="font-semibold">Prix</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{dish.price.toFixed(2)}€</p>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4 mb-12">
                <div className="flex items-center border border-muted rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-muted transition">
                    +
                  </button>
                </div>
                <button
                  onClick={addToCart}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Ajouter au Panier
                </button>
              </div>

              {/* Recipe */}
              <div className="bg-muted p-6 rounded-lg mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Recette</h2>
                <p className="text-muted-foreground leading-relaxed">{dish.recipe}</p>
              </div>

              {/* Ingredients */}
              <div className="bg-muted p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-foreground mb-4">Ingrédients</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {dish.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
