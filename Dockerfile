FROM node:8-slim

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "build" ]
