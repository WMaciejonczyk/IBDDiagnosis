FROM node:20.12.2

WORKDIR /react-frontend

COPY . /react-frontend

COPY package.json .
COPY package-lock.json .

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
