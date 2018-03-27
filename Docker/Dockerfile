FROM ubuntu:xenial

MAINTAINER david.dionise@gmail.com

ENV NODE_ENV production
RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y nodejs
RUN mkdir -p app/src
WORKDIR app
COPY ./src ./src
COPY ./.babelrc ./
COPY ./package.json ./
RUN npm install
RUN npm run build

EXPOSE 3000

CMD NODE_ENV=production node ./dist/src/server.js
