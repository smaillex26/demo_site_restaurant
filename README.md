# 🍽️ NOMAÏ — Site Vitrine Restaurant

Site de démonstration pour le restaurant **NOMAÏ** à Fès, Maroc.  
Fusion méditerranéo-japonaise · Pâtes fraîches maison · Four à bois.

## 📋 Description

Site vitrine moderne et élégant créé comme démo pour des clients dans la restauration.  
Toutes les photos et informations sont issues du vrai restaurant [NOMAÏ](https://nomai.ma).

## 🚀 Fonctionnalités

- **Hero** animé avec photo réelle du restaurant
- **Menu complet** organisé par catégories avec onglets (Salades, Pâtes, Pizzas, Viandes, Japonais, Desserts)
- **Galerie photo** avec 27 vraies photos NOMAÏ + filtre par catégorie
- **Formulaire de réservation** connecté à Web3Forms (envoi email réel)
- **Section témoignages** avec carrousel
- **Page responsive** — Mobile, Tablette, Desktop
- **Animations** au scroll (IntersectionObserver)

## 🛠️ Technologies

- HTML5 / CSS3 (variables, grid, flexbox, animations)
- JavaScript Vanilla (ES6+)
- [Web3Forms](https://web3forms.com) pour le formulaire de contact

## ⚙️ Configuration du formulaire

Pour activer l'envoi d'emails de réservation :

1. Aller sur [web3forms.com](https://web3forms.com)
2. Entrer votre email → obtenir une clé gratuite
3. Dans `index.html`, remplacer `YOUR_ACCESS_KEY` par votre clé :
   ```html
   <input type="hidden" name="access_key" value="VOTRE_CLE_ICI" />
   ```

## 📁 Structure

```
demo-restaurant/
├── index.html          # Page principale
├── style.css           # Styles
├── script.js           # Interactions
├── img/                # Photos locales (NOMAÏ)
│   ├── NOMAI-05.jpg    # Portraits chefs
│   ├── NOMAI-09.jpg    # Pizza
│   ├── NOMAI-10.jpg    # Sushis
│   └── ...             # (27 photos au total)
└── README.md
```

## 📞 Infos NOMAÏ

- **Adresse** : Champs de Course, Lot. Prestigia, Av. Omar Ibnou Khattab, Fès 30000
- **Tél** : +212 661-800 981
- **Horaires** : Lun–Dim 12h00–23h30 · Tea Time 15h30–19h30
- **Web** : [nomai.ma](https://nomai.ma)
