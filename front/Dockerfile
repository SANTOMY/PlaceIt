# Dockerfile
FROM alpine:3.12.0

#RUN mkdir app
WORKDIR /app
ADD package.json .

RUN apk update && \
    apk add --no-cache nodejs npm && \
    npm install
