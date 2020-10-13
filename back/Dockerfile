FROM alpine:3.12.0

WORKDIR /app

ADD package.json .

RUN apk update && \
    apk add --no-cache nodejs npm && \
    npm install

RUN apk add postgresql