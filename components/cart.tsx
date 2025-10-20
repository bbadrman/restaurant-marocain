"use client"

import Link from "next/link"
import { X, Trash2, Plus, Minus } from "lucide-react"

export default function Cart({
  items,
  setItems,
  onClose,
}: { items: any[]; setItems: (items: any[]) => void; onClose: () => void }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(items.filter((item) => item.id !== id))
    } else {
      setItems(items.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-40 flex justify-end">
      <div className="bg-background w-full max-w-md h-full overflow-y-auto shadow-lg">
        <div className="sticky top-0 bg-primary text-primary-foreground p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Panier</h2>
          <button onClick={onClose} className="hover:bg-primary/80 p-1 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Votre panier est vide</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-muted p-4 rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.price.toFixed(2)}€</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-background rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-background rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button onClick={() => removeItem(item.id)} className="p-1 hover:bg-red-100 rounded ml-2">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-primary">{total.toFixed(2)}€</span>
                </div>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                className="block w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 rounded-lg font-semibold text-center transition mb-3"
              >
                Passer la Commande
              </Link>
              <button
                onClick={onClose}
                className="w-full bg-muted hover:bg-muted/80 text-foreground py-3 rounded-lg font-semibold transition"
              >
                Continuer les Achats
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
