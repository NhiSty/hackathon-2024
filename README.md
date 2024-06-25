# hackaton

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
