ARG NODE_VERSION=22.14.0
ARG NPM_REGISTRY=https://registry.npmjs.org
ARG DEBIAN_MIRROR=deb.debian.org

# Builder image
FROM node:${NODE_VERSION}-bookworm AS builder
ARG NPM_REGISTRY
ENV NODE_OPTIONS=--max-old-space-size=4096
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm -v && \
    npm config set registry ${NPM_REGISTRY} && \
    npm install -g pnpm && \
    pnpm -v && \
    pnpm config set registry ${NPM_REGISTRY} && \
    pnpm install --ignore-scripts

COPY . ./

RUN mv .env.production .env && \
    pnpm install && \
    pnpm build

# Runtime image
FROM node:${NODE_VERSION}-bookworm-slim
ARG DEBIAN_FRONTEND=noninteractive
ARG DEBIAN_MIRROR
WORKDIR /app

RUN sed -i "s/deb.debian.org/${DEBIAN_MIRROR}/g" /etc/apt/sources.list.d/debian.sources && \
    apt update && \
    apt install -y openssl && \
    apt clean && \
    rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/.output/ ./.output/

EXPOSE 3000
CMD ["node", "./.output/server/index.mjs"]
