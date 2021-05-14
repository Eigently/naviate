FROM rust:latest as build
WORKDIR /build
COPY . .
RUN cargo build --release

FROM alpine:latest
WORKDIR /server
COPY --from=build /build/target/release/naviate-server /server/naviate-server
EXPOSE 8080
CMD ["/server/naviate-server"]
