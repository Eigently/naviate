FROM rust:buster

WORKDIR /app
COPY . .
RUN cargo build --release

EXPOSE 8080
CMD ["./target/release/naviate-server"]
