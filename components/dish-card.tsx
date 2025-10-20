"use client"

import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export default function DishCard({ dish, onAddToCart }: { dish: any; onAddToCart: (dish: any) => void }) {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105">
      <Link href={`/dish/${dish.id}`}>
        <div className="relative h-48 bg-muted overflow-hidden cursor-pointer">
          <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
            {dish.category}
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/dish/${dish.id}`}>
          <h3 className="text-xl font-bold text-foreground mb-2 hover:text-primary transition cursor-pointer">
            {dish.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4">{dish.description}</p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">{dish.price.toFixed(2)}€</span>
          <button
            onClick={() => onAddToCart(dish)}
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground p-2 rounded-lg transition"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
