FROM alpine:3.16

RUN apk add --no-cache uuidgen=2.38-r1

COPY entrypoint.sh ./

CMD ["/entrypoint.sh"]
