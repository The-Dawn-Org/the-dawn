# ---------- build ----------
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Vite inlines VITE_* at build time, so it has to be an ARG, not a runtime env.
ARG VITE_FINANCE_API_URL=""
ENV VITE_FINANCE_API_URL=$VITE_FINANCE_API_URL

COPY . .
RUN npm run build

# ---------- runtime ----------
# Unprivileged image: runs as UID 101 and listens on 8080, so it passes
# GKE's runAsNonRoot / no-privileged-ports policies without extra config.
FROM nginxinc/nginx-unprivileged:alpine AS runtime

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Where nginx forwards the API calls that the vite dev-server proxies locally.
ENV API_URL=http://localhost:3000

EXPOSE 8080
