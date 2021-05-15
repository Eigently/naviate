FROM rust:alpine as build
WORKDIR /build
COPY . .
RUN apk add musl-dev openssl-dev
RUN cargo build --release

FROM alpine:latest
WORKDIR /app
COPY --from=build /build/target/release/naviate-server ./
RUN apk add musl-dev openssl-dev
EXPOSE 8080
CMD ["./naviate-server"]
