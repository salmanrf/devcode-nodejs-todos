# syntax=docker/dockerfile:1

FROM node:lts-alpine

ENV NODE_ENV=production

COPY ["package.json", "yarn.lock", "./"]

RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]