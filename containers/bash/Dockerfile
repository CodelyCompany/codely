FROM node:alpine
WORKDIR /opt/app
COPY ./package.json ./
RUN apk --update add bash
RUN yarn install
COPY . .
CMD ["yarn","start"]