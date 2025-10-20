"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ArrowLeft, MapPin, Truck, CreditCard } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    deliveryType: "delivery",
    paymentMethod: "card",
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    } else {
      setOrderPlaced(true)
      setTimeout(() => router.push("/"), 3000)
    }
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation cartCount={0} onCartClick={() => {}} />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <div className="bg-secondary/20 border-2 border-secondary rounded-lg p-12">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-4xl font-bold text-primary mb-4">Commande Confirmée!</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Merci pour votre commande. Vous recevrez un email de confirmation sous peu.
            </p>
            <p className="text-sm text-muted-foreground">Redirection vers l'accueil...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation cartCount={0} onCartClick={() => {}} />

      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <h1 className="text-4xl font-bold text-primary">Finaliser votre Commande</h1>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Steps */}
          <div className="flex justify-between mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex-1 flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 mx-2 ${s < step ? "bg-primary" : "bg-muted"}`}></div>}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-lg shadow-md p-8">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Informations Personnelles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Delivery Info */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Adresse de Livraison</h2>
                <div className="space-y-6">
                  <input
                    type="text"
                    name="address"
                    placeholder="Adresse"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="city"
                      placeholder="Ville"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      placeholder="Code Postal"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Mode de Livraison</h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-muted transition">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="delivery"
                          checked={formData.deliveryType === "delivery"}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <Truck className="w-5 h-5 ml-3 text-primary" />
                        <div className="ml-3">
                          <p className="font-semibold">Livraison à Domicile</p>
                          <p className="text-sm text-muted-foreground">Gratuit pour les commandes &gt; 30€</p>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-muted transition">
                        <input
                          type="radio"
                          name="deliveryType"
                          value="pickup"
                          checked={formData.deliveryType === "pickup"}
                          onChange={handleChange}
                          className="w-4 h-4"
                        />
                        <MapPin className="w-5 h-5 ml-3 text-primary" />
                        <div className="ml-3">
                          <p className="font-semibold">Retrait sur Place</p>
                          <p className="text-sm text-muted-foreground">Prêt en 30 minutes</p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">Paiement</h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border-2 border-primary rounded-lg cursor-pointer bg-primary/5">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <CreditCard className="w-5 h-5 ml-3 text-primary" />
                    <span className="ml-3 font-semibold">Carte Bancaire</span>
                  </label>
                  <label className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:bg-muted transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={formData.paymentMethod === "paypal"}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-semibold">PayPal</span>
                  </label>
                </div>

                <div className="mt-8 p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold text-foreground mb-4">Résumé de la Commande</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>45.97€</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span className="text-secondary">Gratuit</span>
                    </div>
                    <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-primary">45.97€</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 px-6 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition"
                >
                  Précédent
                </button>
              )}
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition"
              >
                {step === 3 ? "Confirmer la Commande" : "Suivant"}
              </button>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  )
}
