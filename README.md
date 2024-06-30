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


Lancer Ollama en local avec le model llama3
Aller dans le container node
Lancer la commande npx prisma generate
Lancer la commande npx prisma migrate dev
Lancer node seed.js
se déplacer dans le dossier utils
Lancer node importHackathonData.js
sortir du container, aller dans frontEnd
npm i && npm run dev
Accéder à l'URL : http://localhost:3000/


## Lancement du prototype hackathon 2024

Se deplacer dans le dossier `backend`

```sh
cd backend
```


## Lancer les containers dockers

```sh
docker compose up -d
```

## Lancer Ollama en local avec le model llama3

## Aller dans le container node

```sh
docker exec -it node sh
```

## Prisma 

```sh
cd prisma
```

```sh
npx prisma generate
```

```sh
npx prisma migrate dev
```

## Seed

```sh
node seed.js
```

## Import des données

```sh
cd .. && cd utils
```

```sh
node importHackathonData.js
```

## (Hors container) Se deplacer dans le dossier `frontend`

```sh
cd frontend
```

## Installer les dépendances

```sh
npm i
```

## Lancer le Front

```sh
npm run dev
```

## Accéder au FrontEnd

Accéder à l'URL : http://localhost:3000/

## Se connecter à Adminer

1. Aller sur http://localhost:8080/
2. Remplir les champs suivants:
   - Type: `PostgreSQL`
   - Serveur: `db`
   - Utilisateur: `postgres`
   - Mot de passe: `postgres`
   - Base de donnée: `postgres`
