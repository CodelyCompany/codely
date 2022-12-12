FROM node:16.13.0-alpine as builder
WORKDIR /opt/app
COPY ./package.json ./
RUN yarn install
COPY . .

FROM node:16.13.0-alpine
WORKDIR /opt/app
COPY --from=builder /opt/app  .
RUN apk --update add python3
CMD ["yarn","start"]