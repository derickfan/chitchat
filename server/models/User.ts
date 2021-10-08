import { DataTypes, Model, UUIDV4 } from "sequelize/types";
import bcrypt from "bcrypt";
import { sequelize } from ".";

interface UserAttributes {
	id?: string;
	username: string;
	email: string;
	hashedPassword?: string;
	password: string;
	profilePhotoUrl?: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
	public id!: string;
	public username!: string;
	public email!: string;
	public hashedPassword!: string;
	public password!: string;
	public profilePhotoUrl: string | null;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

User.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: UUIDV4,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: {
					msg: "incorrect email format",
				},
			},
		},
		hashedPassword: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		password: {
			type: DataTypes.VIRTUAL,
			allowNull: false,
		},
		profilePhotoUrl: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		tableName: "user",
		modelName: "user",
		hooks: {
			beforeCreate: (user) => {
				if (user.password) {
					user.hashedPassword = bcrypt.hashSync(user.password, 10);
				}
			},
		},
	}
);

sequelize.sync({
	force: true,
});

export default User;
