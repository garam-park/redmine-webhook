FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY app.ts app.ts

CMD [ "npm", "run", "start:prod"]