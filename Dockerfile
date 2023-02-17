# syntax=docker/dockerfile:1

FROM node:lts-alpine

ENV NODE_ENV=production

COPY ["package.json", "yarn.lock", "./"]

RUN yarn global add @nestjs/cli
RUN yarn add source-map-support
RUN yarn

COPY . .

RUN yarn build

EXPOSE 3030

CMD ["yarn", "start"]