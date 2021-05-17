FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .

RUN npm install

ENTRYPOINT ["npm", "start"]
