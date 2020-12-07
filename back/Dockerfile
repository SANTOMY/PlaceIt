FROM alpine:3.12.0

WORKDIR /app

ADD package.json .

RUN apk update && \
    apk add --no-cache nodejs npm && \
    npm install

RUN apk add postgresql

COPY ./src /app/src
COPY ./.env /app/.env
COPY ./cert.pem /app/cert.pem
COPY ./key.pem /app/key.pem

EXPOSE 5000

CMD ["npm","start"]
