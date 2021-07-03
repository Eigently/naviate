FROM node:alpine as build
WORKDIR /build
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY tsconfig.json ormconfig.js ./
COPY src ./src
RUN yarn build:ts

FROM node:alpine
WORKDIR /app
RUN npm install pm2 typeorm -g
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY tsconfig.json Procfile ormconfig.js ./
COPY --from=build /build/dist .
EXPOSE 3000
CMD ["node_modules/.bin/fastify", "start", "app.js"]