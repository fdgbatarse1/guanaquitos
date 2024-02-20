FROM node:lts-alpine

WORKDIR /backend/

COPY package.json .

COPY package-lock.json .

RUN npm install

WORKDIR /backend/app

COPY . .

RUN ["npm", "run", "build"]

EXPOSE 1337

CMD ["npm", "run", "develop"]
