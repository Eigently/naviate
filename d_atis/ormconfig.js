const { join } = require("path");
const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

module.exports = {
  type: process.env.DB_TYPE || "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_DB || "d_atis",
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
