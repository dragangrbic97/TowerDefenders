FROM node:12-slim
RUN mkdir ./app
WORKDIR ./app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD node /src/db/db_connect.js