FROM rust:buster as build
WORKDIR /build
COPY . .
RUN cargo build --release

FROM debian:buster
WORKDIR /app
COPY --from=build /build/target/release/naviate-server ./
EXPOSE 8080
CMD ["./naviate-server"]
