FROM node:14.17.0-alpine

WORKDIR /usr/src

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src ./src

RUN npm run build

COPY . .

CMD ["npm","run","start"]