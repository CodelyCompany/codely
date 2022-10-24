FROM node:alpine as build-stage
WORKDIR /opt/app
COPY ./package.json ./
RUN yarn install
COPY ./ ./
RUN yarn run build
FROM nginx:alpine as nginx
COPY ./default.conf /etc/nginx/sites-available/default
COPY --from=build-stage /opt/app/build /usr/share/nginx/html
ENTRYPOINT [ "nginx" ]
CMD [ "-g", "daemon off;" ]