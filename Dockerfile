FROM node:11

WORKDIR /app

RUN npm install --global cross-env

ADD . .
RUN npm install
RUN npm run build:dll

EXPOSE 3000

CMD [ "npm", "run", "start"]
