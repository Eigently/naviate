FROM alpine:latest
WORKDIR /app
COPY ./target/x86_64-unknown-linux-musl/release/naviate-server ./
EXPOSE 8080
CMD ["./naviate-server"]
