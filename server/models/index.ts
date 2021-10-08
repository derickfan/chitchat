import { Sequelize } from "sequelize";
import dbConfig from "../config/config";

const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];
const { database, username, password } = config;

export const sequelize = new Sequelize(database, username, password, config);