"use client"

import { useState } from "react"
import DishCard from "./dish-card"

const dishes = [
  {
    id: 1,
    name: "Tajine Agneau",
    description: "Agneau tendre cuit lentement avec pruneaux et amandes",
    price: 18.99,
    image: "/moroccan-tajine-lamb-with-prunes.jpg",
    category: "Tajines",
  },
  {
    id: 2,
    name: "Couscous Royal",
    description: "Couscous moelleux garni de légumes et viandes variées",
    price: 16.99,
    image: "/moroccan-couscous-royal.jpg",
    category: "Couscous",
  },
  {
    id: 3,
    name: "Pastilla Poulet",
    description: "Feuilletage croustillant farci de poulet et amandes",
    price: 14.99,
    image: "/moroccan-pastilla-chicken.jpg",
    category: "Entrées",
  },
  {
    id: 4,
    name: "Tajine Poisson",
    description: "Poisson frais avec légumes et sauce épicée",
    price: 17.99,
    image: "/moroccan-fish-tajine.jpg",
    category: "Tajines",
  },
  {
    id: 5,
    name: "Kefta Meatballs",
    description: "Boulettes de viande épicées avec sauce tomate",
    price: 12.99,
    image: "/moroccan-kefta-meatballs.jpg",
    category: "Plats",
  },
  {
    id: 6,
    name: "Harira",
    description: "Soupe traditionnelle riche et réconfortante",
    price: 8.99,
    image: "/moroccan-harira-soup.jpg",
    category: "Soupes",
  },
]

export default function FeaturedDishes({ onAddToCart }: { onAddToCart: (dish: any) => void }) {
  const [selectedCategory, setSelectedCategory] = useState("Tous")

  const categories = ["Tous", ...new Set(dishes.map((d) => d.category))]
  const filtered = selectedCategory === "Tous" ? dishes : dishes.filter((d) => d.category === selectedCategory)

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nos Spécialités</h2>
          <p className="text-muted-foreground text-lg">Sélection de nos meilleurs plats marocains</p>
        </div>

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
            <DishCard key={dish.id} dish={dish} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  )
}
