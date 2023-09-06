# Utilisation de l'image Node.js Alpine 18 comme base "dev"
FROM node:18-alpine as dev
# Définition de l'utilisateur actif à 'node' sans aucun accès root
USER node
# Définition du répertoire de travail actif à /develop
WORKDIR /develop
# Expose le port 5173
EXPOSE 5173

# Utilisation de l'image Node.js Alpine 18 comme base "build"
FROM node:18-alpine as build
# Définition du répertoire /build
WORKDIR /build
# Copie le contenu du code Javascript du PC Local dans le conteneur (ignore les fichiers présent dans le .dockerignore)
COPY . .
# Installe les dépendances du projet avec la commande "clean install" 
# qui permet l'installation des packages sans mettre à jour le package-lock.json
RUN npm ci
# Execute la construction du code React
RUN npm run build

# Utilisation de l'image Node.js Alpine 18 comme base "prod"
FROM nginx:alpine3.18-slim as prod
# Copie le contenu construit du stage "build" dans le répertoire HTML de Nginx
COPY --from=build /build/dist /usr/share/nginx/html
# Expose le port 80
EXPOSE 80
# Commande par défaut pour exécuter le serveur Nginx
CMD ["nginx", "-g", "daemon off;"]