FROM node:alpine

ARG DUMMY_SITE_URL
ENV DUMMY_SITE_URL=${DUMMY_SITE_URL}

WORKDIR /usr/src/app

COPY package* ./

RUN npm ci

COPY . .

CMD ["npm", "start"]
