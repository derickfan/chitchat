import dotenv from "dotenv";
import { Dialect } from "sequelize/types";

dotenv.config();

interface DbConfigType {
	[key: string]: { 
		"username": string,
		"password": string,
		"database": string,
		"host": string,
		"logging": boolean,
		"dialect": Dialect 
	};
}



const dbConfigs: DbConfigType = {
	"development": {
		"username": `${process.env.DB_USERNAME}`,
		"password": `${process.env.DB_PASSWORD}`,
		"database": `${process.env.DB_NAME}`,
		"host": `${process.env.DB_HOST}`,
		"logging": true,
		"dialect": "postgres"
	},
	"test": {
		"username": `${process.env.DB_TEST_USERNAME}`,
		"password": `${process.env.DB_TEST_PASSWORD}`,
		"database": `${process.env.DB_TEST_NAME}`,
		"host": `${process.env.DB_TEST_HOST}`,
		"logging": false,
		"dialect": "postgres"
	}
};

export default dbConfigs;