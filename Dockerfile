# base image
FROM node:latest as builder
# set working directory
WORKDIR /app
# install and cache app dependencies
COPY . .
RUN npm install
RUN npm run build --prod

# nginx state for serving content
FROM nginx:alpine
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /app/dist/cr-front .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]