# 1) Build Angular app like any Node.js app
FROM node:22-alpine AS build

## Set app folder
WORKDIR /app

## Install dependencies
COPY package*.json ./
RUN npm ci

## Copy source code
COPY . .

## Build Angular for production (package.json script)
RUN npm run build:production


# 2) Serve the dist directory app using Nginx
FROM nginx:alpine

## Copy custom nginx config (from root directory)
COPY nginx.conf /etc/nginx/nginx.conf

## Copy Angular (production) build output
COPY --from=build /app/dist.prod/angular-multi-env/browser /usr/share/nginx/html

## Expose HTTP port
EXPOSE 80

## Run Nginx
CMD ["nginx", "-g", "daemon off;"]
