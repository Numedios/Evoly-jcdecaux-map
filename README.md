# 🚲 JCDecaux Map

Mini-projet React permettant de visualiser les stations de vélos JCDecaux  
Développé dans le cadre d’un test technique.  

---

## ⚙️ Installation & Lancement

# Cloner le dépôt
git clone https://github.com/<ton-compte>/jcdecaux-map.git
cd jcdecaux-map

# Installer les dépendances
pnpm install

#  Créer le fichier d’environnement
# (à la racine du projet)
echo "VITE_JCDECAUX_API_KEY=ta_clef_api_jcdecaux" > .env

# 💡 Les variables doivent toujours commencer par VITE_
# Exemple fourni dans .env.example

# Lancer le projet en mode développement
pnpm dev

# 🖥️ Application disponible sur :
# 👉 http://localhost:5173

---

## 🧱 Stack Technique

- ⚡ **Vite** – Build ultra-rapide pour React + TS
- ⚛️ **React 18** – Composants fonctionnels et hooks modernes
- 🧠 **TypeScript** – Typage strict pour fiabilité et clarté
- 🎨 **Tailwind CSS v4** – Style moderne et responsive
- 🗺️ **React Leaflet** – Intégration de cartes interactives
- 📦 **PapaParse** – Parsing CSV rapide et fiable
- ❤️ **Custom Hooks** – Gestion des favoris, filtres, et auto-refresh
- 🧩 **Architecture modulaire** – Composants réutilisables et typés

---

## 👀 Aperçu Visuel

# 🗺️ Carte interactive : 
- Affichage dynamique des stations JCDecaux
- Popup au survol avec nom et disponibilité
- Filtrage des stations ouvertes / vélos / places

# ⭐ Favoris :
- Ajout et suppression en un clic
- Persistance locale

# 🕑 Historique :
- Historique des dernières stations consultées
- Auto-rafraîchissement toutes les 90 secondes

# ⚠️ Gestion des erreurs :
- Popup claire si l’API ou le fichier CSV échoue
- Vérification du format CSV à l’import

---

---

## 🧩 Astuce VS Code (pour Tailwind v4)

# Ajoute ceci dans .vscode/settings.json pour éviter les avertissements :
{
   "css.lint.unknownAtRules": "ignore",
   "css.validate": true
}

---
