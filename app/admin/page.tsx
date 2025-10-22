"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAdminAuthenticated, clearAdminSession } from "@/lib/admin-auth"
import { Button } from "@/components/ui/button"
import ProductList from "@/components/admin/product-list"
import ProductForm from "@/components/admin/product-form"

export default function AdminDashboard() {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
    } else {
      setAuthenticated(true)
    }
  }, [router])

  const handleLogout = () => {
    clearAdminSession()
    router.push("/admin/login")
  }

  const handleAddProduct = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  const handleEditProduct = (product: any) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingProduct(null)
    setRefreshKey((prev) => prev + 1)
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-amber-900">Tableau de bord Admin</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
          >
            Déconnexion
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showForm ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Gestion des produits</h2>
              <Button onClick={handleAddProduct} className="bg-green-600 hover:bg-green-700 text-white">
                + Ajouter un produit
              </Button>
            </div>
            <ProductList
              key={refreshKey}
              onEdit={handleEditProduct}
              onRefresh={() => setRefreshKey((prev) => prev + 1)}
            />
          </div>
        ) : (
          <ProductForm product={editingProduct} onClose={handleFormClose} />
        )}
      </div>
    </div>
  )
}
