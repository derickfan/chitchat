import dotenv from "dotenv";

dotenv.config();

interface DbConfigType {
	[key: string]: { [key: string]: string };
}

const dbConfigs: DbConfigType = {
	"development": {
		"username": `${process.env.DB_USERNAME}`,
		"password": `${process.env.DB_PASSWORD}`,
		"database": `${process.env.DB_NAME}`,
		"host": `${process.env.DB_HOST}`,
		"dialect": "postgres"
	}
};

export default dbConfigs;