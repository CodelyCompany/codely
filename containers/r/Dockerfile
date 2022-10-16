FROM node:alpine
WORKDIR /opt/app
COPY ./package.json ./
RUN apk --update add R
RUN yarn install
COPY . .
CMD ["yarn","start"]