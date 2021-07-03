import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "fastify-autoload";
import { FastifyPluginAsync } from "fastify";
import createDbConnection from "./db_connection";
import * as dotenv from "dotenv";
import { startPubSub } from "./pubsub";
import { Connection } from "typeorm";

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  dotenv.config();

  // Initialize DB connection through TypeORM and share with fastify.
  const dbConnection: Connection = await createDbConnection();
  fastify.decorate("dbConnection", dbConnection);

  // Start the PubSub layer
  await startPubSub();

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });
};

export default app;
export { app };
