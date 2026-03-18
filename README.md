# demo_site_restaurant

> Site vitrine de démonstration pour un restaurant, conçu pour être présenté à des clients dans la restauration. Basé sur le restaurant NOMAÏ à Fès (Maroc).

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JavaScript-informational)
![Statut](https://img.shields.io/badge/statut-terminé-brightgreen)

---

## Sommaire

- [Présentation](#présentation)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Lancement](#lancement)
- [Variables d'environnement](#variables-denvironnement)
- [Tests](#tests)
- [Structure du projet](#structure-du-projet)
- [Équipe](#équipe)

---

## Présentation

Ce projet est un site vitrine restaurant développé en HTML/CSS/JavaScript vanilla, sans framework ni backend. Il sert de démo commerciale pour proposer ce type de site à des restaurateurs. Le contenu (photos, menu, informations) est issu du vrai restaurant NOMAÏ (Fès, Maroc). Il est conçu pour être facilement personnalisable et réutilisable pour tout autre établissement.

**Fonctionnalités principales :**

- Menu complet avec onglets par catégorie (Salades, Pâtes, Pizzas, Viandes, Japonais, Desserts)
- Galerie photo avec 27 photos réelles et filtres par catégorie
- Formulaire de réservation connecté à Web3Forms (envoi d'email réel sans backend)
- Section témoignages avec carrousel automatique
- Animations au scroll via IntersectionObserver
- Design responsive — Mobile, Tablette, Desktop

---

## Prérequis

Avant de commencer, assure-toi d'avoir installé :

| Outil | Version minimale | Lien |
|---|---|---|
| Navigateur web | Toute version récente | — |
| Éditeur de code (optionnel) | — | [VS Code](https://code.visualstudio.com/) |
| Extension Live Server (optionnel) | — | [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) |

> Aucune dépendance npm, aucun serveur backend requis. Le projet fonctionne entièrement en statique.

---

## Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/smaillex26/demo_site_restaurant.git
cd demo_site_restaurant
```

Aucune étape supplémentaire n'est nécessaire. Toutes les images sont déjà incluses dans le dossier `img/`.

---

## Lancement

```bash
# Option 1 — Ouvrir directement dans le navigateur
# Double-cliquer sur index.html

# Option 2 — Avec Live Server (VS Code)
# Clic droit sur index.html > "Open with Live Server"
# L'application est accessible sur :
# http://127.0.0.1:5500
```

---

## Variables d'environnement

Ce projet n'utilise pas de fichier `.env`. La seule configuration nécessaire est la clé **Web3Forms** pour activer l'envoi du formulaire de réservation par email.

Dans `index.html`, remplacer `YOUR_ACCESS_KEY` par une vraie clé :

```html
<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY" />
```

**Obtenir une clé gratuite :**
1. Aller sur [web3forms.com](https://web3forms.com)
2. Entrer son adresse email
3. Cliquer sur **"Create Access Key"**

> Sans clé configurée, le formulaire fonctionne en mode démo (aucun email envoyé).

---

## Tests

Ce projet ne comporte pas de tests automatisés (site statique HTML/CSS/JS).

**Vérifications manuelles recommandées :**

```
- Ouvrir index.html dans Chrome, Firefox et Edge
- Tester la navigation mobile (DevTools > mode responsive)
- Vérifier les onglets du menu
- Tester les filtres de la galerie
- Remplir et soumettre le formulaire de réservation
```

**Couverture actuelle :** non mesurée (projet statique)

---

## Structure du projet

```
demo_site_restaurant/
├── img/                    # Photos du restaurant (27 images NOMAÏ)
│   ├── NOMAI-05.jpg        # Portraits et ambiance
│   ├── NOMAI-09.jpg        # Plats (pizza, sushis, pâtes...)
│   ├── dish-01.jpg         # Visuels pour les catégories du menu
│   ├── hero-bg.jpeg        # Fond section hero
│   ├── histoire-img.jpeg   # Fond section histoire
│   └── ...                 # (50 fichiers images au total)
├── index.html              # Structure de la page (HTML5)
├── style.css               # Styles — thème sombre & or, responsive
├── script.js               # Interactions — menu, galerie, formulaire
├── .gitignore
└── README.md
```

---

## Équipe

| Nom | Rôle | Contact |
|---|---|---|
| Ismail Alami | Développeur Web — HTML / CSS / JavaScript | [smaillex26](https://github.com/smaillex26) |

---

## Licence

Usage personnel et démonstration commerciale — Projet école / portfolio.

Les photos et contenus sont la propriété du restaurant [NOMAÏ](https://nomai.ma) (Fès, Maroc).

---

*Dernière mise à jour : Mars 2026*
