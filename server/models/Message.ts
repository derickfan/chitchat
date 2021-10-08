import {
	DataTypes,
	HasOneCreateAssociationMixin,
	HasOneGetAssociationMixin,
	Model,
	UUIDV4,
} from "sequelize/types";
import { sequelize } from ".";
import Conversation from "./Conversation";
import User from "./User";

interface MessageAttribues {
	id?: string;
	content: string;
	username?: string;
	conversationId?: string;
}

class Message extends Model<MessageAttribues> implements MessageAttribues {
	public id!: string;
	public content!: string;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;

	public getUser!: HasOneGetAssociationMixin<User>;
	public addUser!: HasOneCreateAssociationMixin<User>;

  public getConversation!: HasOneGetAssociationMixin<Conversation>;
  public addConversation!: HasOneCreateAssociationMixin<Conversation>;

	public readonly user!: User;
  public readonly conversation!: Conversation;
}

Message.init(
	{
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: UUIDV4,
		},
		content: {
			type: DataTypes.TEXT,
		},
	},
	{
		sequelize,
		tableName: "message",
		modelName: "message",
	}
);

sequelize.sync();

export default Message;
