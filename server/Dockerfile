FROM rust:alpine as build
WORKDIR /build
COPY . .
RUN apk add musl-dev
RUN cargo build --release

FROM alpine:latest
WORKDIR /app
COPY --from=build /build/target/release/naviate-server ./
EXPOSE 8080
CMD ["./naviate-server"]
