const { join } = require("path");
const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "scds_d_atis_pubsub",
  synchronize: false,
  logging: false,
  entities: [join(__dirname, "{,dist}", "entity", "**", "*.{ts,js}")],
  migrations: [join(__dirname, "{,dist}", "migration", "**", "*.{ts,js}")],
  subscribers: [join(__dirname, "{,dist}", "subscriber", "**", "*.{ts,js}")],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
  namingStrategy: new SnakeNamingStrategy(),
};
