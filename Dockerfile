FROM node:14 as build

ARG REMIX_TOKEN

WORKDIR /base/

COPY .npmrc package.json package-lock.json remix.config.js /base/
RUN npm ci --unsafe-perm
COPY public /base/public/
COPY app /base/app/
RUN npm run build
RUN npm prune --production

EXPOSE 3333
ENTRYPOINT npm run start
