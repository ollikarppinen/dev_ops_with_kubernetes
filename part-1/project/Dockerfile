FROM node:16-alpine

WORKDIR /

ENV NODE_ENV production

COPY ./server.js .

RUN npm install -g serve

CMD ["node", "server.js"]
