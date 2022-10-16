FROM node:alpine
WORKDIR /opt/app
COPY ./package.json ./
RUN apk --update add python3
RUN yarn install
COPY . .
CMD ["yarn","start"]