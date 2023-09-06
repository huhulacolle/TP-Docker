# TP Docker

> TP Docker utilisant la stack MERN (MongoDB, Express.js, React.js, Node.js) et Docker pour la conteneurisation. Il permet de déployer l'application en environnement de développement et de production en utilisant des conteneurs Docker.

## Prérequis

Assurez-vous d'avoir les éléments suivants installés sur votre système:

- [Docker](https://www.docker.com/products/docker-desktop/).

## Lancement de l'environnement de développement

Pour lancer les conteneurs Docker en environnement de développement, utilisez la commande suivante :

```
docker-compose -f docker-compose-dev.yml up --build --detach
```
Cette commande va construire et démarrer les conteneurs nécessaires pour le développement, y compris le serveur backend et l'application frontend.

## Accès aux conteneurs de développement

Pour accéder aux conteneurs de développement, utilisez les commandes suivantes :

- Accéder au conteneur du backend : 
```
docker exec -it back-dev sh
```
- Accéder au conteneur du frontend :
```
docker exec -it front-dev sh
```

Le backend est accessible sur le port 3000, et le frontend sur le port 5173 dans l'environnement de développement.

## Lancement de l'environnement de production

Pour lancer les conteneurs Docker en environnement de production, utilisez la commande suivante :

```
docker-compose -f docker-compose-prod.yml up --build --detach
```

Cette commande va construire et démarrer les conteneurs nécessaires pour la production, avec les paramètres appropriés.

Dans l'environnement de production, le backend est accessible sur le port 3000, tandis que le frontend est accessible sur le port 8080.

## Configuration

Un fichier .env est nécessaire pour configurer l'application. Un exemple de fichier .env est fourni sous le nom .env.example pour montrer les variables nécessaires.

Pour configurer votre environnement, copiez le fichier .env.example et renommez-le en .env. Modifiez les valeurs des variables d'environnement en fonction de vos besoins.