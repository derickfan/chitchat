import { useState } from "react";
import { ConversationData } from "../types/types";

const ConversationList = () => {
	// const [conversations, setConversations] = useState<ConversationData[]>([]);

	const conversations: ConversationData[] = [
		{
			id: "1",
			messages: [{id: "1", username: "johnsmith", content: "Hello world", converstaionId: "1", createdAt: new Date()}],
			name: "John Smith",
			users: ["derickfan", "johnsmith"]
		}, {
			id: "2",
			messages: [{id: "2", username: "janedoe", content: "Goodbye world!", converstaionId: "2", createdAt: new Date()}],
			name: "janedoe",
			users: ["derickfan", "janedoe"]
		}
	]

	return (
		<div>
			{conversations.map((conversation) => (
				<div>
					<h1>{conversation.name}</h1>
					<h2>{conversation.messages[conversation.messages.length -1]?.content}</h2>
				</div>
			))}
		</div>
	);
};

export default ConversationList;
