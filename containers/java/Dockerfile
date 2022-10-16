FROM node:alpine
WORKDIR /opt/app
COPY ./package.json ./
RUN apk --update add openjdk11
RUN yarn install
COPY . .
CMD ["yarn","start"]