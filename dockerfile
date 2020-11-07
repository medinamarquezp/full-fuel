FROM node:12.18.3-alpine3.12

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./patches ./patches

RUN npm install --unsafe-perm

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
