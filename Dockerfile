# Stage 1: Build the Node.js application
FROM node:20 AS build
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# Stage 2: Copy built files to Nginx container
FROM nginx:latest
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY default /etc/nginx/sites-enabled/default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]