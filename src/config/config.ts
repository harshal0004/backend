import { SequelizeOptions } from "sequelize-typescript";
import * as dotenv from "dotenv";

dotenv.config();

interface Config {
  development: SequelizeOptions;
  test: SequelizeOptions;
  production: SequelizeOptions;
}

const config: Config = {
  development: {
    username: process.env.DB_USER || "harshaladmin",
    password: process.env.DB_PASSWORD || "123456789",
    database: process.env.DB_NAME || "CDP",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "1433", 10),
    dialect: "mssql",
    dialectOptions: {
      Options: {
        encrypt: false,
        trustSeverCertificate: true,
      },
    },
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {},
  },
  test: {
    username: process.env.TESTDB_USER || "harshaladmin",
    password: process.env.TESTDB_PASSWORD || "123456789",
    database: process.env.TESTDB_NAME || "CDP",
    host: process.env.TESTDB_HOST || "localhost",
    port: parseInt(process.env.TESTDB_PORT || "3306", 10),
    dialect: "mssql",
    logging: console.log,
    pool: {
      max: 5,
    },
  },
  production: {
    username: process.env.PRODDB_USER || "harshaladmin",
    password: process.env.PRODDB_PASSWORD || "123456789",
    database: process.env.PRODDB_NAME || "CDP",
    host: process.env.PRODDB_HOST || "localhost",
    port: parseInt(process.env.PRODDB_PORT || "3306", 10),
    dialect: "mssql",
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {},
  },
};

export default config;
