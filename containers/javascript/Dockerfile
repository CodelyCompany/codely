FROM node:18.12.1-alpine AS builder
WORKDIR /opt/app
COPY ./package.json ./
RUN yarn install
COPY . .

FROM node:18.12.1-alpine
WORKDIR /opt/app
COPY --from=builder /opt/app  .
RUN addgroup -S defaultgroup && adduser -S defaultuser -G defaultgroup && chgrp defaultgroup -R userdir && chmod g+w -R userdir 
USER defaultuser
CMD ["yarn","start"]