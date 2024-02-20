FROM node:lts-alpine

WORKDIR /frontend/

COPY package.json .
COPY package-lock.json .

RUN npm install

WORKDIR /frontend/app

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]