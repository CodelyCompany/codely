FROM node:alpine as build-stage
WORKDIR /opt/app
COPY ./package.json ./
RUN yarn install
COPY ./ ./
ENV REACT_APP_CONTAINERS_ADDRESS "\\\${REACT_APP_CONTAINERS_ADDRESS}"
ENV REACT_APP_BACKEND "\\\${REACT_APP_BACKEND}"
ENV REACT_APP_REDIRECT_URI "\\\${REACT_APP_REDIRECT_URI}"
ENV REACT_APP_DOMAIN "\\\${REACT_APP_DOMAIN}"
ENV REACT_APP_CLIENT_ID "\\\${REACT_APP_CLIENT_ID}"
ENV REACT_APP_BACKEND_CLIENT_ID "\\\${REACT_APP_BACKEND_CLIENT_ID}"
ENV REACT_APP_BACKEND_CLIENT_SECRET "\\\${REACT_APP_BACKEND_CLIENT_SECRET}"
ENV REACT_APP_WEBSOCKET_ADDRESS "\\\${REACT_APP_WEBSOCKET_ADDRESS}"
ENV REACT_APP_LOGOUT_URL "\\\${REACT_APP_LOGOUT_URL}"
RUN rm -f .env* ; \
    printenv > .env && \
    yarn build

FROM alpine:latest as security_provider
RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

FROM nginx:alpine as nginx
COPY --from=build-stage /opt/app/build /usr/share/nginx/html
COPY --from=security_provider /etc/passwd /etc/passwd
USER nonroot
RUN echo "\
export ENV_LIST=\"\$(printenv | awk -F= '{print $1}' | sed 's/^/\$/g' | paste -sd,)\"; \
find /usr/share/nginx/html/static/ -type f -name \"*.js\"| \
xargs -I % sh -c 'envsubst \"\${ENV_LIST}\" < \"%\" > \"%.tmp\" && mv \"%.tmp\" \"%\"'" \
> /docker-entrypoint.d/40-envsubst-react-environment.sh && chmod +x /docker-entrypoint.d/40-envsubst-react-environment.sh