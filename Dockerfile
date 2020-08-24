FROM node:8-slim

WORKDIR /usr/src/app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENTRYPOINT [ "./node_modules/.bin/gulp" ]
CMD [ "release" ]
