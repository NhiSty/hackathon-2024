# HACKATHON 2024 - Groupe 15

## Liste des fonctionnalités : 

 - Simplification des messages utilisateurs/patients :
   - Melvin REDUREAU
   - Serkan DEVECI 
   - Hamidou KANOUTE
 - Trie des messages par catégories :
   - Melvin REDUREAU
   - Serkan DEVECI
 - Récupération des messages de notation pour être utilisé pour statistiques :
   - Hamidou KANOUTE
   - Thomas JALLU


## Pseudo de l'équipe :

 - Les 4 fantastiques : 
   - Mel-Red : Melvin REDUREAU
   - sDev67 : Serkan DEVECI
   - Auralion(hkanoute) : Hamidou KANOUTE
   - WhiskyDev(ThomasDev6) : Thomas JALLU


## Lancement du prototype hackathon 2024



## Base de donnée

1. Lancer le serveur de base de donnée

```sh
docker compose up -d
```

Cela va lancer la base de donnée en arrière plan.

Pour éteindre les conteneurs :

```sh
docker compose down
```

## Backend

Dans le dossier `backend/`:

1. Installer les dépendances

```sh
npm install
```

2. Déployer la base de donnée

```sh
npm run db:sync
```

3. Copier le fichier `.env.example` en `.env` et remplir les variables d'environnement

4. Populer la base de donnée

```sh
npm run db:seed
```

5. Lancer le serveur en mode développement

```sh
npm run dev
```

## Frontend

Dans le dossier `frontend/`:

1. Installer les dépendances

```sh
npm install
```

2. Lancer le serveur

```sh
npm run dev
```

3. Accéder à l'URL : http://localhost:3000/

## Se connecter à Adminer

1. Aller sur http://localhost:8080/
2. Remplir les champs suivants:
   - Type: `PostgreSQL`
   - Serveur: `db`
   - Utilisateur: `postgres`
   - Mot de passe: `postgres`
   - Base de donnée: `postgres`
