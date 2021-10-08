interface DbConfigType {
	[key: string]: { [key: string]: string };
}

const dbConfigs: DbConfigType = {
	"development": {
		"username": "derickfan",
		"password": "password",
		"database": "chitchat-db",
		"host": "localhost",
		"dialect": "postgres"
	}
};

export default dbConfigs;