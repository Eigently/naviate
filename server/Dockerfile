FROM alpine:latest

ARG COMMIT_SHA
ENV COMMIT_SHA=${COMMIT_SHA}

WORKDIR /app

COPY ./target/x86_64-unknown-linux-musl/release/naviate-api ./

EXPOSE 8080
CMD ["./naviate-api"]
