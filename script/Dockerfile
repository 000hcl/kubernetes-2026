FROM alpine:latest

COPY job.sh /job.sh
RUN apk add --no-cache bash curl
RUN chmod +x /job.sh
ENV URL=http://todo-backend-svc:1123/api/todos

ENTRYPOINT ["/job.sh"]