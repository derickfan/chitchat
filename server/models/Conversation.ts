import {
	DataTypes,
	HasManyAddAssociationMixin,
	HasManyAddAssociationsMixin,
	HasManyCountAssociationsMixin,
	HasManyGetAssociationsMixin,
	Model,
	UUIDV4,
} from "sequelize/types";
import { sequelize } from ".";
import Message from "./Message";
import User from "./User";

interface ConversationAttribues {
	id?: string;
	name?: string;
}

class Conversation
	extends Model<ConversationAttribues>
	implements ConversationAttribues
{
	public id!: string;
	public name: string | null;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getUsers!: HasManyGetAssociationsMixin<User>;
	public addUser!: HasManyAddAssociationMixin<User, string>;
	public addUsers!: HasManyAddAssociationsMixin<User, string>;
	public countUsers!: HasManyCountAssociationsMixin;

	public getMessages!: HasManyGetAssociationsMixin<Message>;
	public addMessage!: HasManyAddAssociationMixin<Message, string>;
	public addMessages!: HasManyAddAssociationsMixin<Message, string>;
	public countMessages!: HasManyCountAssociationsMixin;

	public readonly users?: User[];
	public readonly messages?: Message[];
}

Conversation.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "conersation",
		modelName: "conversation",
	}
);

const User_Conversation = sequelize.define("User_Conversation", {});

User.belongsToMany(Conversation, { through: User_Conversation });
Conversation.belongsToMany(User, { through: User_Conversation });

User.hasMany(Message, {
	foreignKey: { allowNull: false, name: "username" },
	sourceKey: "username",
});
Conversation.hasMany(Message, { foreignKey: { allowNull: false } });

sequelize.sync();

export default Conversation;
