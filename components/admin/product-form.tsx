"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

interface Product {
  id: string
  name: string
  category: string
  price: number
  description: string
  image: string
  recipe: string
  ingredients: string[]
  prepTime: number
  cookTime: number
  servings: number
}

interface ProductFormProps {
  product?: Product | null
  onClose: () => void
}

export default function ProductForm({ product, onClose }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    product || {
      id: Date.now().toString(),
      name: "",
      category: "Tajines",
      price: 0,
      description: "",
      image: "",
      recipe: "",
      ingredients: [],
      prepTime: 15,
      cookTime: 30,
      servings: 4,
    },
  )

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(product?.image || "")
  const [loading, setLoading] = useState(false)
  const [ingredientInput, setIngredientInput] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "prepTime" || name === "cookTime" || name === "servings"
          ? Number.parseFloat(value)
          : value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredientInput.trim()],
      }))
      setIngredientInput("")
    }
  }

  const handleRemoveIngredient = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = formData.image

      // Upload image if changed
      if (imageFile) {
        const formDataImage = new FormData()
        formDataImage.append("file", imageFile)

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formDataImage,
        })

        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json()
          imageUrl = url
        }
      }

      // Save product
      const products = JSON.parse(localStorage.getItem("products") || "[]")
      const productIndex = products.findIndex((p: Product) => p.id === formData.id)

      const updatedProduct = { ...formData, image: imageUrl }

      if (productIndex >= 0) {
        products[productIndex] = updatedProduct
      } else {
        products.push(updatedProduct)
      }

      localStorage.setItem("products", JSON.stringify(products))
      onClose()
    } catch (error) {
      console.error("Erreur lors de la sauvegarde:", error)
      alert("Erreur lors de la sauvegarde du produit")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-amber-900">
        {product ? "Modifier le produit" : "Ajouter un produit"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image du produit</label>
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-amber-50 file:text-amber-700
                  hover:file:bg-amber-100"
              />
            </div>
            {imagePreview && (
              <div className="w-24 h-24 relative rounded-lg overflow-hidden">
                <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
              </div>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nom du produit</label>
            <Input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option>Tajines</option>
              <option>Couscous</option>
              <option>Pastillas</option>
              <option>Entrées</option>
              <option>Desserts</option>
              <option>Boissons</option>
            </select>
          </div>
        </div>

        {/* Price and Times */}
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Prix (DH)</label>
            <Input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Préparation (min)</label>
            <Input type="number" name="prepTime" value={formData.prepTime} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cuisson (min)</label>
            <Input type="number" name="cookTime" value={formData.cookTime} onChange={handleInputChange} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Portions</label>
            <Input type="number" name="servings" value={formData.servings} onChange={handleInputChange} />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Recipe */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Recette</label>
          <textarea
            name="recipe"
            value={formData.recipe}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Décrivez les étapes de préparation..."
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ingrédients</label>
          <div className="flex gap-2 mb-3">
            <Input
              type="text"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              placeholder="Ajouter un ingrédient..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  handleAddIngredient()
                }
              }}
            />
            <Button type="button" onClick={handleAddIngredient} className="bg-green-600 hover:bg-green-700">
              Ajouter
            </Button>
          </div>
          <div className="space-y-2">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                <span>{ingredient}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading} className="flex-1 bg-amber-700 hover:bg-amber-800 text-white">
            {loading ? "Sauvegarde..." : "Sauvegarder"}
          </Button>
          <Button type="button" onClick={onClose} variant="outline" className="flex-1 bg-transparent">
            Annuler
          </Button>
        </div>
      </form>
    </div>
  )
}
