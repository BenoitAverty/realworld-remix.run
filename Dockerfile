FROM node:14 as build

ARG REMIX_TOKEN

WORKDIR /buildroot/

COPY .npmrc package.json package-lock.json remix.config.js /buildroot/
RUN npm ci --unsafe-perm
COPY public /buildroot/public/
COPY app /buildroot/app/
RUN npm run build

FROM node:14

ARG REMIX_TOKEN

COPY .npmrc package.json package-lock.json /base/
COPY --from=build /buildroot/public /base/public/
COPY --from=build /buildroot/build /base/build/

WORKDIR /base/
RUN npm ci --unsafe-perm # --production
RUN rm /base/.npmrc

EXPOSE 3000
ENTRYPOINT npm run start
