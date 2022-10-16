FROM node:alpine
WORKDIR /opt/app
COPY ./package.json ./
RUN apk --update add g++
RUN yarn install
COPY . .
CMD ["yarn","start"]