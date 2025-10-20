"use client"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import DishCard from "@/components/dish-card"
import Cart from "@/components/cart"

const allDishes = [
  {
    id: 1,
    name: "Tajine Agneau",
    description: "Agneau tendre cuit lentement avec pruneaux et amandes",
    price: 18.99,
    image: "/moroccan-tajine-lamb.jpg",
    category: "Tajines",
  },
  {
    id: 2,
    name: "Tajine Poulet Citron",
    description: "Poulet avec citron confit et olives vertes",
    price: 16.99,
    image: "/moroccan-chicken-tajine-lemon.jpg",
    category: "Tajines",
  },
  {
    id: 3,
    name: "Tajine Poisson",
    description: "Poisson frais avec légumes et sauce épicée",
    price: 17.99,
    image: "/moroccan-fish-tajine.jpg",
    category: "Tajines",
  },
  {
    id: 4,
    name: "Couscous Royal",
    description: "Couscous moelleux garni de légumes et viandes variées",
    price: 16.99,
    image: "/moroccan-couscous-royal.jpg",
    category: "Couscous",
  },
  {
    id: 5,
    name: "Couscous Végétarien",
    description: "Couscous avec légumes de saison et pois chiches",
    price: 13.99,
    image: "/moroccan-vegetarian-couscous.jpg",
    category: "Couscous",
  },
  {
    id: 6,
    name: "Pastilla Poulet",
    description: "Feuilletage croustillant farci de poulet et amandes",
    price: 14.99,
    image: "/moroccan-pastilla-chicken.jpg",
    category: "Entrées",
  },
  {
    id: 7,
    name: "Pastilla Fruits de Mer",
    description: "Pastilla garnie de crevettes et poisson",
    price: 16.99,
    image: "/moroccan-pastilla-seafood.jpg",
    category: "Entrées",
  },
  {
    id: 8,
    name: "Kefta Meatballs",
    description: "Boulettes de viande épicées avec sauce tomate",
    price: 12.99,
    image: "/moroccan-kefta-meatballs.jpg",
    category: "Plats",
  },
  {
    id: 9,
    name: "Harira",
    description: "Soupe traditionnelle riche et réconfortante",
    price: 8.99,
    image: "/moroccan-harira-soup.jpg",
    category: "Soupes",
  },
  {
    id: 10,
    name: "Chorba",
    description: "Soupe aux pois chiches et viande",
    price: 9.99,
    image: "/moroccan-chorba-soup.jpg",
    category: "Soupes",
  },
  {
    id: 11,
    name: "Mint Tea",
    description: "Thé à la menthe fraîche traditionnel",
    price: 4.99,
    image: "/moroccan-mint-tea.png",
    category: "Boissons",
  },
  {
    id: 12,
    name: "Jus d'Orange Frais",
    description: "Jus d'orange pressé frais",
    price: 5.99,
    image: "/fresh-orange-juice.png",
    category: "Boissons",
  },
]

export default function MenuPage() {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const categories = ["Tous", ...new Set(allDishes.map((d) => d.category))]
  const filtered = selectedCategory === "Tous" ? allDishes : allDishes.filter((d) => d.category === selectedCategory)

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
