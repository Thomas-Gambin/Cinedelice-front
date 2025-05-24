# Cinedelices

Cinedelices est un projet de groupe de fin de formation. Notre mission était de créer un site web dans le quel les utilisateurs pourraient consulter et créer des recettes en lien avec la popculture (Film, série, animé/manga, jeux vidéos, littérature)

# Cinedelices Frontend

Le repository front pour le projet Cinedelices, une plateforme dédiée au cinéma et à la gastronomie.
Il est nécessaire d'avoir le repo back de lancé pour utiliser toutes les fonctionnalités.
Lien pour le repo back : https://github.com/Thomas-Gambin/Cinedelice-back

## Prérequis

- [Node.js](https://nodejs.org/) (version recommandée : >=18.x)
- [PNPM](https://pnpm.io/) (version 10.7.1 ou supérieure)

## Installation

1. Clonez le dépôt :
   ```bash
   git clone git@github.com:Thomas-Gambin/Cinedelice-front.git
   ```

2. Installez les dépendances :
   ```bash
   pnpm install
   ```

3. Créez un fichier `.env` à la racine du projet basé sur l'exemple suivant :
   ```ini
   VITE_API_URL = http://localhost:3000/api
   ```

# Organisation front :

## HTML :
    - page d'accueil
    - page détail recette
    - page liste recette
    - page de connexion
    - page d'inscription
    - détails média
    - liste des médias
    - page création recette
  
## Lancement du projet : 

1. Pour lancer le projet vous devez utiliser la commande :
```bash
pnpm dev
```

2. Pour utiliser toutes les fonctionnalités du projet vous devrez soit vous créer un compte en ayant bien ajouté vos clés mailersend dans le repo back ou alors vous pouvez utiliser ces identifiants qui sont inclus dans la bdd :

Email : john@doe.fr

Password : johnEstVraimentUnSuperPseudo