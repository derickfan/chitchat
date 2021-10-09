import Message from "../models/Message";

interface MessageData {
	username: string;
	conversationId: string;
	content: string;
}

/**
 * 
 * @param data js object used to create new message
 * @returns a newly created Message
 * @throws a generic Error
 */
export const createMessage = async (data: MessageData): Promise<Message> => {
	try {
		const message = await Message.create(data);
		return message;
	} catch (error) {
		throw new Error(error);
	}
};

/**
 * 
 * @returns an array of all the Messages in the database
 * @throws a generic Error
 */
export const getAllMessages = async (): Promise<Message[]> => {
	try {
		const messages = await Message.findAll();
		return messages;
	} catch (error) {
		throw new Error(error);
	}
};