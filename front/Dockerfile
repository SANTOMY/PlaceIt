# Dockerfile
FROM alpine:3.12.0
ENV NODE_ENV development

#RUN mkdir app
WORKDIR /app
ADD ./ ./

RUN apk update && \
    apk add --no-cache nodejs npm

CMD ["npm","run","serve"]
