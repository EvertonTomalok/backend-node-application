FROM node:10

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .

RUN npm install
