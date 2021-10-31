import { Op } from "sequelize";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
import User from "../models/User";

interface ConversationData {
	name?: string;
	creatorId: string;
	usernames: string[];
}

/**
 * 
 * @param data - js object used to create new user
 * @returns a newly created conversation 
 * @throws a generic Error
 */
export const createConveration = async (
	data: ConversationData
): Promise<Conversation> => {
	const { name, creatorId, usernames } = data;
	try {
		const users = await User.findAll({
			where: {
				[Op.or]: [{ id: creatorId }, { username: usernames }],
			},
		});
		const conversationName =
			name || users.map((user) => user.username).join(", ");
		const conversation = await Conversation.create({
			name: conversationName,
		});
		await conversation.addUsers(users);
		return conversation;
	} catch (error) {
		throw new Error(error);
	}
};

/**
 * 
 * @returns an array of all the Conversations in the database
 */
export const getAllConversations = async (): Promise<Conversation[]> => {
	try {
		const conversations = await Conversation.findAll();
		return conversations;
	} catch (error) {
		throw new Error(error);
	}
};

/**
 * 
 * @param userId - the id of the user whose conversations are being returned
 * @returns an array of all the Conversations with the userId in the database
 */
export const getUserConversations = async (userId: string): Promise<Conversation[]> => {
	try {
		const conversations = await Conversation.findAll({
			include: [{
				model: User,
				where: {
					id: userId,
				},
				attributes: ["username"],
				through: {
					attributes: [],
				},
			}, {
				model: Message
			}],
		});
		return conversations;
	} catch (error) {
		throw new Error(error);
	}
};
