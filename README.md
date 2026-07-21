# 📋 Task Manager Pro - Markdown Edition

<div align="center">

[![GitHub License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen)](https://www.mongodb.com/)
[![Frontend](https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS-orange)](https://developer.mozilla.org/)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen)](https://github.com/Nathan-Pro-FR/To-Do-List)
[![Markdown](https://img.shields.io/badge/Support-Markdown-inactive?color=important)](https://marked.js.org/)

**Une application de gestion de tâches moderne avec support Markdown, priorités visuelles et design néon époustouflant** ✨

[🌐 Démo en direct](#démo) • [📦 Installation](#installation) • [🚀 Utilisation](#utilisation) • [🛠️ Stack Technique](#stack-technique)

</div>

---

## 🎯 Vue d'ensemble

**Task Manager Pro** est une application web complète de gestion de tâches conçue pour maximiser votre productivité. Avec un design moderne en **néon sombre**, un support **Markdown complet** et une architecture **full-stack**, elle offre une expérience utilisateur fluide et intuitive.

### ✨ Points forts

- 🎨 **Design époustouflant** : Interface moderne avec thème néon sombre et effets lumineux
- 📝 **Support Markdown complet** : Formatage riche avec gras, italique, code et liens
- 🚀 **Architecture full-stack** : Node.js/Express backend + Frontend vanilla JavaScript
- 💾 **Base de données MongoDB** : Persistance fiable des données
- 📱 **Responsive Design** : Adapté mobile, tablette et desktop
- ⚡ **Temps réel** : Synchronisation instantanée avec le serveur
- 🏷️ **Système de priorités** : Code couleur visuel (basse/moyenne/haute)
- 📅 **Gestion des échéances** : Détection automatique des tâches en retard
- 🎯 **Filtrage avancé** : Vue Toutes/Actives/Terminées
- 📦 **Templates prédéfinis** : Modèles pour développeurs, étudiants et routine

---

## 📸 Captures d'écran

### Interface principale

<div align="center">

```
┌─────────────────────────────────────┐
│         📋 Mes Tâches              │
│    3 tâches restantes               │
├─────────────────────────────────────┤
│  📋 Charger un template            │
│  [Choisir un modèle...         ▼]  │
├─────────────────────────────────────┤
│  Titre [Priorité ▼]                │
│  Description (optionnel)            │
│  ⏰ Échéance: [date] [Ajouter]    │
├─────────────────────────────────────┤
│  [Toutes] [Actives] [Terminées]   │
├─────────────────────────────────────┤
│  ● Créer la structure HTML          │
│  ● Configurer le CSS                │
│  ○ Tests API (en retard) ⏰         │
└─────────────────────────────────────┘
```

</div>

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** v14+ 
- **npm** ou **yarn**
- **MongoDB** (Atlas ou local)
- Un navigateur moderne

### Installation

#### 1️⃣ Clone le repository

```bash
git clone https://github.com/Nathan-Pro-FR/To-Do-List.git
cd To-Do-List
```

#### 2️⃣ Backend - Express & MongoDB

```bash
# Accéder au dossier backend (si séparé)
cd backend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
# Créer un fichier .env
echo "MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/tasks" > .env
echo "PORT=5000" >> .env

# Démarrer le serveur
npm start
# Le serveur écoute sur http://localhost:5000
```

#### 3️⃣ Frontend - Déployer les fichiers

```bash
# Les fichiers sont prêts à être servis
# Option 1: Serveur HTTP local
npx http-server

# Option 2: Ouvrir directement dans le navigateur
# Ouvrir index.html en local (file://)
```

#### 4️⃣ Accéder à l'application

```
http://localhost:8080 (ou le port de votre serveur)
```

---

## 📖 Utilisation

### 1. Ajouter une tâche

```markdown
**Titre:** Implémenter la logique JavaScript
**Priorité:** Haute (🔴)
**Description:** Connecter le frontend aux endpoints de l'API
**Échéance:** 21/07/2026 14:30
```

**Résultat:**
- La tâche apparaît en haut de liste
- Un badge rouge à gauche indique la priorité haute
- La description est affichée en petite police
- L'échéance s'affiche avec statut "à temps" ou "en retard"

### 2. Formater avec Markdown

| Syntaxe | Rendu |
|---------|-------|
| `**gras**` | <b>gras</b> |
| `*italique*` | <i>italique</i> |
| `` `code` `` | `code` |
| `[Lien](url)` | [Lien](url) |

### 3. Filtrer les tâches

- **Toutes** : Affiche toutes les tâches
- **Actives** : Uniquement les tâches non complétées
- **Terminées** : Uniquement les tâches cochées

### 4. Utiliser les templates

Sélectionnez un template pour charger des tâches prédéfinies :

- 💻 **Projet Web / Dev** (5 tâches)
- 📚 **Cours & Révisions** (4 tâches)
- 🌅 **Routine Quotidienne** (3 tâches)

### 5. Actions disponibles

| Action | Résultat |
|--------|----------|
| ☑️ Cocher | Marquer comme terminée |
| 🔄 Double-clic sur titre | Modifier le titre |
| ❌ Bouton × | Supprimer la tâche |
| 📅 Écéance | Affichage automatique du statut |

---

## 🛠️ Stack Technique

### Frontend

<div align="center">

[![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Marked.js](https://img.shields.io/badge/Marked.js-FFD700?style=for-the-badge&logo=markdown&logoColor=black)](https://marked.js.org/)

- **HTML5** : Structure sémantique
- **CSS3** : Design moderne avec variables CSS et animations
- **JavaScript Vanilla** : Aucune dépendance frontend (sauf Marked.js)
- **Marked.js** : Parser Markdown léger (CDN)

</div>

### Backend

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

- **Node.js** : Runtime JavaScript côté serveur
- **Express.js** : Framework web léger et modulaire
- **MongoDB** : Base de données NoSQL orientée documents

</div>

### DevOps & Deployment

<div align="center">

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)
[![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)
[![CORS](https://img.shields.io/badge/CORS-FF6B00?style=for-the-badge&logo=nginx&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

- **GitHub** : Versioning et contrôle de source
- **Render** : Hébergement du backend
- **GitHub Pages** : Possible pour le frontend (fichiers statiques)
- **CORS** : Gestion des requêtes cross-origin

</div>

---

## 📋 Structure du projet

```
To-Do-List/
├── index.html          # Page HTML principale
├── style.css           # Styles (thème néon, responsif)
├── script.js           # Logique JavaScript (API calls, DOM)
└── README.md           # Cette documentation

Backend (séparé):
backend/
├── server.js           # Serveur Express
├── models/
│   └── Task.js        # Schéma MongoDB Task
├── routes/
│   └── tasks.js       # Routes CRUD
├── .env               # Variables d'environnement
└── package.json       # Dépendances
```

---

## 🔌 API Reference

### Endpoints disponibles

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/tasks` | Récupère toutes les tâches |
| `POST` | `/api/tasks` | Crée une nouvelle tâche |
| `PATCH` | `/api/tasks/:id` | Met à jour une tâche |
| `DELETE` | `/api/tasks/:id` | Supprime une tâche |

### Format de réponse

```json
{
  "_id": "ObjectId",
  "text": "Titre de la tâche",
  "description": "Description optionnelle",
  "priority": "high|medium|low",
  "completed": false,
  "dueDate": "2026-07-21T14:30:00Z",
  "createdAt": "2026-07-20T10:00:00Z",
  "updatedAt": "2026-07-20T10:00:00Z"
}
```

---

## 🎨 Palette de couleurs

### Thème Néon Sombre

```css
Fond principal:        #0f172a (Bleu très foncé)
Cartes:               #1e293b (Bleu sombre)
Texte primaire:       #f8fafc (Blanc cassé)
Texte secondaire:     #94a3b8 (Gris bleu)
Accent principal:     #38bdf8 (Cyan brillant)

Priorités:
├─ Basse:     #10b981 (Vert émeraude)
├─ Moyenne:   #f59e0b (Ambre)
└─ Haute:     #ef4444 (Rouge vif)
```

---

## ⚙️ Configuration

### Variables d'environnement (Backend)

```env
# .env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://your-frontend-url.com
```

### Configuration du frontend

```javascript
// script.js - Ligne 1
const API_URL = "https://to-do-list-backend-4qko.onrender.com/api/tasks";
```

---

## 📊 Fonctionnalités détaillées

### 1. Système de priorités

```
🔴 HAUTE (High)     → Red (#ef4444)    - Urgent
🟠 MOYENNE (Medium) → Amber (#f59e0b)  - Important
🟢 BASSE (Low)      → Green (#10b981)  - Standard
```

Chaque priorité a son propre **badge luminescent** et **effet de lueur**.

### 2. Markdown support

- **Gras** : `**texte**` → Blanc brillant
- *Italique* : `*texte*` → Gris clair
- `Code` : `` `texte` `` → Cyan sur fond sombre
- **Liens** : `[texte](url)` → Bleu cliquable

### 3. Gestion des dates

```javascript
// Affichage dynamique
- "En retard :" si dueDate < maintenant
- "Échéance :" si dueDate > maintenant
- Format: JJ/MM HH:MM
```

### 4. Métadonnées des tâches

- ✅ **createdAt** : Horodatage de création
- 🔄 **updatedAt** : Dernière modification
- 📌 **completed** : Statut (booléen)
- 🎯 **priority** : Niveau de priorité
- 📝 **description** : Notes détaillées

---

## 🐛 Dépannage

### Problème: "Erreur lors de la récupération des tâches"

**Solution:**
- Vérifiez que le serveur backend est démarré
- Vérifiez que `API_URL` est correct dans `script.js`
- Vérifiez la connexion MongoDB
- Ouvrez la console (F12) pour voir les erreurs réseau

### Problème: Les styles ne s'appliquent pas

**Solution:**
- Rafraîchissez le navigateur (Ctrl+F5 ou Cmd+Shift+R)
- Vérifiez que `style.css` est dans le même répertoire
- Vérifiez que le chemin relatif est correct dans `<link>`

### Problème: Les templates ne se chargent pas

**Solution:**
- Vérifiez que le serveur peut traiter les 5 requêtes POST simultanées
- Vérifiez les logs MongoDB pour les erreurs d'insertion
- Testez avec Postman : POST sur `/api/tasks`

---

## 🚀 Déploiement

### Frontend sur GitHub Pages

```bash
# Créer une branche gh-pages
git checkout -b gh-pages

# Pousser les fichiers statiques
git push -u origin gh-pages
```

### Backend sur Render

```bash
# Créer un service Web sur Render
# Connecter votre repo GitHub
# Configurer:
# - Runtime: Node
# - Build: npm install
# - Start: node server.js
# - Ajouter les variables d'environnement
```

---

## 📈 Statistiques du projet

| Métrique | Valeur |
|----------|--------|
| 📄 Fichiers frontend | 3 (HTML, CSS, JS) |
| 🎨 Lignes de CSS | 500+ |
| 📝 Lignes de JavaScript | 350+ |
| 🔌 Endpoints API | 4 |
| 🏷️ Priorités supportées | 3 |
| 📋 Templates inclus | 3 |
| 🌐 Langues supportées | 1 (Français) |

---

## 🤝 Contribution

Les contributions sont les bienvenues ! 🎉

Pour contribuer :

1. **Fork** le repository
2. **Créez une branche** (`git checkout -b feature/AmazingFeature`)
3. **Commitez vos changements** (`git commit -m 'Add AmazingFeature'`)
4. **Pushez** (`git push origin feature/AmazingFeature`)
5. **Ouvrez une Pull Request**

---

## 📝 Licence

Ce projet est sous licence **MIT** - voir le fichier [LICENSE](LICENSE) pour les détails.

---

## 👨‍💻 Auteur

**Nathan-Pro-FR**

- GitHub: [@Nathan-Pro-FR](https://github.com/Nathan-Pro-FR)
- Repository: [To-Do-List](https://github.com/Nathan-Pro-FR/To-Do-List)

---

## 🙏 Remerciements

- [Marked.js](https://marked.js.org/) - Parser Markdown
- [Render](https://render.com/) - Hébergement backend
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Base de données
- Inspiration: Modern task management apps

---

## 📞 Support & Contact

Pour toute question ou suggestion :

- 📧 Ouvrez une **Issue** sur GitHub
- 💬 Discutez dans les **Discussions**
- 🐛 Signalez les bugs avec des détails

---

<div align="center">

⭐ Si ce projet vous a été utile, n'hésitez pas à laisser une star ! ⭐

**Fait avec ❤️ par Nathan**

</div>
