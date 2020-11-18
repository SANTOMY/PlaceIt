# Dockerfile
FROM alpine:3.12.0
ENV NODE_ENV development

#RUN mkdir app
WORKDIR /app
ADD package.json .

COPY ./src /app/src

RUN apk update && \
    apk add --no-cache nodejs npm && \
    npm install

CMD ["npm","run", "serve"]
