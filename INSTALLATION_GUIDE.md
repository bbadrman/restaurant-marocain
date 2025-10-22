# Guide d'Installation - Riad Saveurs 🍽️

## Prérequis

Avant de commencer, assurez-vous d'avoir installé:
- **Node.js** (version 18 ou supérieure) - [Télécharger](https://nodejs.org/)
- **npm** ou **yarn** (généralement inclus avec Node.js)
- Un éditeur de code (VS Code recommandé)

## Installation Rapide

### Option 1: Avec le CLI shadcn (Recommandé)

\`\`\`bash
# 1. Clonez ou téléchargez le projet
git clone <votre-repo-url>
cd moroccan-restaurant

# 2. Installez les dépendances
npm install

# 3. Lancez le serveur de développement
npm run dev
\`\`\`

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Option 2: Télécharger le ZIP

1. Cliquez sur les trois points (...) en haut à droite de v0
2. Sélectionnez "Download ZIP"
3. Extrayez le fichier ZIP
4. Ouvrez un terminal dans le dossier du projet
5. Exécutez:
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`

## Structure du Projet

\`\`\`
moroccan-restaurant/
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── menu/
│   │   └── page.tsx          # Page du menu
│   ├── cart/
│   │   └── page.tsx          # Page du panier
│   ├── checkout/
│   │   └── page.tsx          # Page de livraison/commande
│   ├── contact/
│   │   └── page.tsx          # Page de contact
│   ├── layout.tsx            # Layout principal
│   └── globals.css           # Styles globaux
├── components/
│   ├── navigation.tsx        # Barre de navigation
│   ├── hero.tsx              # Section hero
│   ├── featured-dishes.tsx   # Plats en vedette
│   ├── dish-card.tsx         # Carte de plat
│   ├── cart.tsx              # Composant panier
│   ├── footer.tsx            # Pied de page
│   └── ui/                   # Composants shadcn/ui
├── lib/
│   ├── utils.ts              # Utilitaires
│   └── dishes.ts             # Données des plats
├── hooks/
│   └── use-cart.ts           # Hook pour gérer le panier
└── package.json              # Dépendances du projet
\`\`\`

## Utilisation du Site

### 1. Page d'Accueil
- Découvrez les plats en vedette
- Cliquez sur "Voir le Menu" pour explorer tous les plats

### 2. Page Menu
- Filtrez les plats par catégorie (Tajines, Couscous, Entrées, Desserts, Boissons)
- Cliquez sur "Ajouter au Panier" pour ajouter un plat
- Ajustez la quantité si nécessaire

### 3. Panier
- Consultez tous vos articles
- Modifiez les quantités (+ / -)
- Supprimez des articles
- Consultez le total
- Cliquez sur "Procéder à la Commande" pour continuer

### 4. Livraison & Commande
- **Étape 1**: Remplissez vos informations personnelles
- **Étape 2**: Entrez votre adresse de livraison
- **Étape 3**: Choisissez le mode de livraison (Livraison à domicile / Retrait sur place)
- Confirmez votre commande

### 5. Contact
- Remplissez le formulaire de contact
- Envoyez vos questions ou commentaires
- Consultez les informations du restaurant

## Commandes Utiles

\`\`\`bash
# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Lancer la version de production
npm run start

# Vérifier les erreurs de linting
npm run lint
\`\`\`

## Personnalisation

### Modifier les Plats
Éditez le fichier `lib/dishes.ts` pour ajouter, modifier ou supprimer des plats:

\`\`\`typescript
export const dishes = [
  {
    id: 1,
    name: "Tajine de Poulet",
    category: "tajines",
    price: 12.99,
    description: "Tajine traditionnel avec poulet, olives et citron",
    image: "/placeholder.svg?height=300&width=300",
  },
  // Ajoutez d'autres plats ici
]
\`\`\`

### Modifier les Couleurs
Les couleurs sont définies dans `app/globals.css`. Modifiez les variables CSS:

\`\`\`css
:root {
  --color-ocre: #B8860B;        /* Ocre/Doré */
  --color-mint: #98D8C8;        /* Vert Menthe */
  --color-dark: #2C1810;        /* Marron foncé */
  --color-light: #F5F1E8;       /* Beige clair */
}
\`\`\`

### Modifier le Nom du Restaurant
Éditez `app/layout.tsx`:

\`\`\`typescript
export const metadata: Metadata = {
  title: "Votre Nom - Restaurant Marocain",
  description: "Votre description",
}
\`\`\`

## Déploiement

### Déployer sur Vercel (Recommandé)

1. Cliquez sur le bouton "Publish" en haut à droite de v0
2. Connectez votre compte GitHub
3. Sélectionnez le repository
4. Cliquez sur "Deploy"

Votre site sera en ligne en quelques minutes!

### Déployer sur d'autres plateformes

**Netlify:**
\`\`\`bash
npm run build
# Uploadez le dossier .next sur Netlify
\`\`\`

**Heroku:**
\`\`\`bash
heroku create votre-app-name
git push heroku main
\`\`\`

## Dépannage

### Le site ne se lance pas
\`\`\`bash
# Supprimez node_modules et réinstallez
rm -rf node_modules
npm install
npm run dev
\`\`\`

### Erreur "Port 3000 déjà utilisé"
\`\`\`bash
# Utilisez un autre port
npm run dev -- -p 3001
\`\`\`

### Les styles ne s'affichent pas correctement
\`\`\`bash
# Reconstruisez les styles Tailwind
npm run build
npm run dev
\`\`\`

## Support

Pour toute question ou problème:
1. Consultez la documentation [Next.js](https://nextjs.org/docs)
2. Consultez la documentation [Tailwind CSS](https://tailwindcss.com/docs)
3. Ouvrez un ticket de support sur [Vercel Help](https://vercel.com/help)

## Licence

Ce projet est fourni à titre d'exemple. Vous êtes libre de l'utiliser et de le modifier selon vos besoins.

---

**Bon appétit! 🍽️** Profitez de votre site de restaurant marocain!
