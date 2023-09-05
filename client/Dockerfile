FROM node:18-alpine as dev
USER node
WORKDIR /develop
EXPOSE 5173

FROM node:18-alpine as build
WORKDIR /build
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:alpine3.18-slim as prod
COPY --from=build /build/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]