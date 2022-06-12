FROM node:16-alpine

WORKDIR /

ENV NODE_ENV production

COPY . .

RUN npm ci

CMD ["npm", "start"]
