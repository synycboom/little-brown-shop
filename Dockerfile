# build environment
FROM node:8.10 as builder
RUN mkdir /app
COPY . /app
WORKDIR /app
RUN yarn install
RUN yarn build

# Production Environment
FROM abiosoft/caddy:0.11.0
COPY --from=builder /app/dist /srv/
COPY ./Caddyfile /etc/Caddyfile