FROM node:18-alpine as dev
USER node
WORKDIR /develop
EXPOSE 3000

FROM node:18-alpine as prod
USER node
WORKDIR /prod
COPY . .
RUN npm ci
CMD [ "node", "." ]