import "reflect-metadata";
import { createConnection } from "typeorm";

export const createDbConnection = async () => {
  const connection = await createConnection();
  return connection;
};

export default createDbConnection;
