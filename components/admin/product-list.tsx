"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Product {
  id: string
  name: string
  category: string
  price: number
  image: string
}

interface ProductListProps {
  onEdit: (product: any) => void
  onRefresh: () => void
}

export default function ProductList({ onEdit, onRefresh }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProducts = () => {
      const stored = localStorage.getItem("products")
      if (stored) {
        setProducts(JSON.parse(stored))
      }
      setLoading(false)
    }

    loadProducts()
  }, [])

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit?")) {
      const updated = products.filter((p) => p.id !== id)
      setProducts(updated)
      localStorage.setItem("products", JSON.stringify(updated))
      onRefresh()
    }
  }

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500 mb-4">Aucun produit pour le moment</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
          {product.image && (
            <div className="relative w-full h-48">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
          )}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.category}</p>
            <p className="text-lg font-bold text-amber-700 mb-4">{product.price} DH</p>
            <div className="flex gap-2">
              <Button onClick={() => onEdit(product)} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                Modifier
              </Button>
              <Button
                onClick={() => handleDelete(product.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
