FROM node:18.12.1-alpine as builder
WORKDIR /opt/app
COPY ./package.json ./
RUN yarn install
COPY . .

FROM node:18.12.1-alpine
WORKDIR /opt/app
COPY --from=builder /opt/app  .
RUN apk --update add python3
CMD ["yarn","start"]