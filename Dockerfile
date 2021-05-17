FROM node:12

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ADD . .

RUN npm install

ENTRYPOINT ["npm", "start"]
