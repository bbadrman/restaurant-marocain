"use client"

import { useState, useEffect } from "react"

export interface Product {
  id: number | string
  name: string
  description: string
  price: number
  image: string
  category: string
  recipe?: string
  ingredients?: string[]
  prepTime?: string
  cookTime?: string
  servings?: number
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Tajine Agneau",
    description: "Agneau tendre cuit lentement avec pruneaux et amandes",
    price: 18.99,
    image: "/moroccan-tajine-lamb-with-prunes.jpg",
    category: "Tajines",
    recipe:
      "Cuire l'agneau à feu doux avec oignons, ail, gingembre et épices. Ajouter les pruneaux et amandes en fin de cuisson pour une saveur sucrée-salée authentique.",
    ingredients: [
      "500g d'agneau",
      "200g de pruneaux",
      "100g d'amandes",
      "2 oignons",
      "3 gousses d'ail",
      "1 cuillère à café de gingembre",
      "Safran, cannelle, sel et poivre",
      "Huile d'olive",
    ],
    prepTime: "30 min",
    cookTime: "1h30",
    servings: 4,
  },
  {
    id: 2,
    name: "Couscous Royal",
    description: "Couscous moelleux garni de légumes et viandes variées",
    price: 16.99,
    image: "/moroccan-couscous-royal.jpg",
    category: "Couscous",
    recipe:
      "Préparer le bouillon avec viandes et légumes. Cuire le couscous à la vapeur et l'arroser du bouillon. Garnir avec les viandes et légumes cuits.",
    ingredients: [
      "500g de couscous",
      "300g de poulet",
      "200g d'agneau",
      "200g de merguez",
      "Carottes, navets, courgettes",
      "Pois chiches",
      "Oignons, ail",
      "Bouillon de légumes",
    ],
    prepTime: "20 min",
    cookTime: "1h",
    servings: 6,
  },
  {
    id: 3,
    name: "Pastilla Poulet",
    description: "Feuilletage croustillant farci de poulet et amandes",
    price: 14.99,
    image: "/moroccan-pastilla-chicken.jpg",
    category: "Entrées",
    recipe:
      "Cuire le poulet avec épices. Préparer la farce avec le poulet effiloché, amandes et œufs. Enrouler dans les feuilles de brick et frire jusqu'à dorage.",
    ingredients: [
      "500g de poulet",
      "150g d'amandes",
      "8 feuilles de brick",
      "4 œufs",
      "Oignons, ail",
      "Cannelle, gingembre",
      "Sucre glace",
      "Huile de friture",
    ],
    prepTime: "25 min",
    cookTime: "45 min",
    servings: 4,
  },
  {
    id: 4,
    name: "Tajine Poisson",
    description: "Poisson frais avec légumes et sauce épicée",
    price: 17.99,
    image: "/moroccan-fish-tajine.jpg",
    category: "Tajines",
    recipe:
      "Pocher le poisson dans un bouillon aromatisé avec tomates, poivrons et épices. Cuire à feu doux pour préserver la tendreté du poisson.",
    ingredients: [
      "600g de poisson blanc",
      "3 tomates",
      "2 poivrons",
      "Olives vertes",
      "Citron",
      "Oignons, ail",
      "Cumin, paprika",
      "Huile d'olive",
    ],
    prepTime: "15 min",
    cookTime: "40 min",
    servings: 4,
  },
  {
    id: 5,
    name: "Kefta Meatballs",
    description: "Boulettes de viande épicées avec sauce tomate",
    price: 12.99,
    image: "/moroccan-kefta-meatballs.jpg",
    category: "Plats",
    recipe:
      "Mélanger la viande hachée avec épices et herbes. Former des boulettes et les cuire dans une sauce tomate riche et savoureuse.",
    ingredients: [
      "500g de viande hachée",
      "2 oignons",
      "3 gousses d'ail",
      "Persil, coriandre",
      "Cumin, paprika",
      "400g de tomates",
      "Sel et poivre",
      "Huile d'olive",
    ],
    prepTime: "20 min",
    cookTime: "30 min",
    servings: 4,
  },
  {
    id: 6,
    name: "Harira",
    description: "Soupe traditionnelle riche et réconfortante",
    price: 8.99,
    image: "/moroccan-harira-soup.jpg",
    category: "Soupes",
    recipe:
      "Cuire les pois chiches et lentilles avec viande. Ajouter tomates, épices et herbes. Laisser mijoter jusqu'à obtenir une soupe épaisse et savoureuse.",
    ingredients: [
      "200g de pois chiches",
      "100g de lentilles",
      "300g de viande",
      "4 tomates",
      "Oignons, ail",
      "Gingembre, cannelle",
      "Persil, coriandre",
      "Bouillon",
    ],
    prepTime: "15 min",
    cookTime: "1h",
    servings: 6,
  },
  {
    id: 7,
    name: "Tajine Poulet Citron",
    description: "Poulet avec citron confit et olives vertes",
    price: 16.99,
    image: "/moroccan-chicken-tajine-lemon.jpg",
    category: "Tajines",
    recipe:
      "Cuire le poulet avec citrons confits et olives. Les saveurs acidulées et salées créent un équilibre parfait avec les épices marocaines.",
    ingredients: [
      "800g de poulet",
      "4 citrons confits",
      "200g d'olives vertes",
      "Oignons, ail",
      "Gingembre",
      "Safran",
      "Persil",
      "Huile d'olive",
    ],
    prepTime: "20 min",
    cookTime: "1h",
    servings: 4,
  },
  {
    id: 8,
    name: "Pastilla Fruits de Mer",
    description: "Pastilla garnie de crevettes et poisson",
    price: 16.99,
    image: "/moroccan-pastilla-seafood.jpg",
    category: "Entrées",
    recipe:
      "Préparer une farce délicate avec crevettes et poisson. Enrouler dans les feuilles de brick et frire pour un résultat croustillant et savoureux.",
    ingredients: [
      "300g de crevettes",
      "200g de poisson",
      "8 feuilles de brick",
      "3 œufs",
      "Oignons",
      "Safran",
      "Persil",
      "Huile de friture",
    ],
    prepTime: "25 min",
    cookTime: "40 min",
    servings: 4,
  },
  {
    id: 9,
    name: "Couscous Végétarien",
    description: "Couscous avec légumes de saison et pois chiches",
    price: 13.99,
    image: "/moroccan-vegetarian-couscous.jpg",
    category: "Couscous",
    recipe:
      "Cuire les légumes et pois chiches dans un bouillon aromatisé. Préparer le couscous à la vapeur et le servir avec les légumes.",
    ingredients: [
      "500g de couscous",
      "300g de pois chiches",
      "Carottes, navets, courgettes",
      "Tomates",
      "Oignons, ail",
      "Cumin, paprika",
      "Persil, coriandre",
      "Huile d'olive",
    ],
    prepTime: "20 min",
    cookTime: "50 min",
    servings: 6,
  },
  {
    id: 10,
    name: "Chorba",
    description: "Soupe aux pois chiches et viande",
    price: 9.99,
    image: "/moroccan-chorba-soup.jpg",
    category: "Soupes",
    recipe:
      "Cuire la viande avec pois chiches et légumes. Ajouter épices et herbes pour une soupe riche et réconfortante.",
    ingredients: [
      "300g de viande",
      "250g de pois chiches",
      "Carottes, navets",
      "Tomates",
      "Oignons, ail",
      "Gingembre",
      "Persil",
      "Bouillon",
    ],
    prepTime: "15 min",
    cookTime: "1h",
    servings: 6,
  },
  {
    id: 11,
    name: "Mint Tea",
    description: "Thé à la menthe fraîche traditionnel",
    price: 4.99,
    image: "/moroccan-mint-tea.png",
    category: "Boissons",
    recipe:
      "Infuser le thé vert avec menthe fraîche et sucre. Servir chaud dans des verres traditionnels pour une expérience authentique.",
    ingredients: ["Thé vert", "Menthe fraîche", "Sucre", "Eau chaude"],
    prepTime: "5 min",
    cookTime: "10 min",
    servings: 2,
  },
  {
    id: 12,
    name: "Jus d'Orange Frais",
    description: "Jus d'orange pressé frais",
    price: 5.99,
    image: "/fresh-orange-juice.png",
    category: "Boissons",
    recipe:
      "Presser les oranges fraîches pour obtenir un jus naturel et savoureux. Servir immédiatement pour préserver les vitamines.",
    ingredients: ["6 oranges fraîches", "Glaçons", "Sucre (optionnel)"],
    prepTime: "5 min",
    cookTime: "0 min",
    servings: 2,
  },
]

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadProducts = () => {
      try {
        const stored = localStorage.getItem("moroccan_products")
        if (stored) {
          const customProducts = JSON.parse(stored)
          // Merge custom products with defaults, custom products override defaults
          const merged = defaultProducts.map((p) => customProducts.find((cp: Product) => cp.id === p.id) || p)
          // Add new custom products that don't exist in defaults
          const newProducts = customProducts.filter((cp: Product) => !defaultProducts.find((p) => p.id === cp.id))
          setProducts([...merged, ...newProducts])
        } else {
          setProducts(defaultProducts)
        }
      } catch (error) {
        console.error("Error loading products:", error)
        setProducts(defaultProducts)
      }
      setIsLoading(false)
    }

    loadProducts()
  }, [])

  return { products, isLoading }
}
