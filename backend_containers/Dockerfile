FROM node:18.12.1-alpine as builder
WORKDIR /opt/app
COPY ./package.json ./
RUN yarn install
COPY . .

FROM alpine:latest as security_provider
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

FROM node:18.12.1-alpine
WORKDIR /opt/app
COPY --from=builder /opt/app  .
COPY --from=security_provider /etc/passwd /etc/passwd
USER nonroot
CMD ["yarn","start"]