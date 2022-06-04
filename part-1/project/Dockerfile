FROM node:16-alpine

ENV NODE_ENV production
ENV PORT 3001

COPY ./server.js .

RUN npm install -g serve

CMD ["node", "server.js"]
