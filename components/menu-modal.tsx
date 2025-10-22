"use client"

import { X } from "lucide-react"
import Image from "next/image"
import { dishesData } from "@/lib/dishes-data"

interface MenuModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MenuModal({ isOpen, onClose }: MenuModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold">Notre Menu Complet</h2>
          <button onClick={onClose} className="hover:bg-primary/80 p-2 rounded-lg transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Menu Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dishesData.map((dish) => (
              <div key={dish.id} className="border border-muted rounded-lg p-4 hover:shadow-lg transition">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={dish.image ? `/uploads/${dish.image}` : "/placeholder.svg"}
                      alt={dish.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground mb-1">{dish.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{dish.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary">{dish.price.toFixed(2)}€</span>
                      <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                        {dish.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
