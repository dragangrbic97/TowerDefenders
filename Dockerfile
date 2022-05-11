FROM node:12-slim
RUN mkdir ./app
WORKDIR ./app
COPY package*.json ./
RUN npm install
COPY . .
CMD node index.js