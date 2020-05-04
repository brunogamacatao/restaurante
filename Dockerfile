FROM node:13 AS builder
COPY . /app
WORKDIR /app
RUN npm install && npm run build

FROM nginx AS server
COPY --from=builder /app/build /usr/share/nginx/html
