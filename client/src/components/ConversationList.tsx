import styled from "@emotion/styled";
import { ProfilePicture } from "../styles/styles";
import { ConversationData, MessageData } from "../types/types";
import FlexContainer from "./FlexContainer";

const ConversationList = () => {
	// const [conversations, setConversations] = useState<ConversationData[]>([]);

	const conversations: ConversationData[] = [
		{
			id: "1",
			messages: [
				{
					id: "1",
					username: "johnsmith",
					content: "Hey my name is John Donut How are you doing?",
					converstaionId: "1",
					createdAt: new Date(),
				},
			],
			name: "John Smith",
			users: ["derickfan", "johnsmith"],
		},
		{
			id: "2",
			messages: [
				{
					id: "2",
					username: "Janedoe",
					content: "Goodbye world!",
					converstaionId: "2",
					createdAt: new Date(),
				},
			],
			name: "Janedoe",
			users: ["derickfan", "janedoe"],
		},
	];

	const getLatestMessageInfo = (conversation: ConversationData) => {
		const latestMessage: MessageData =
			conversation.messages[conversation.messages.length - 1];
		return `${latestMessage.username}: ${latestMessage.content}`;
	};

	return (
		<FlexContainer justify="flex-start">
			{conversations.map((conversation) => (
				<Conversation
					direction="row"
					height="5rem"
					width="400px"
					padding="0.7rem 0.5rem 0.7rem 1rem"
				>
					<ProfilePicture src="https://cdn.discordapp.com/attachments/792881224753872929/875159970444894218/image_2.png" />
					<ConversationInfo
						height="100%"
						align="flex-start"
						margin="0 0 0 1rem"
						textAlign="start"
						padding="0.2rem 0"
					>
						<ConversationTitle>
							{conversation.name}
						</ConversationTitle>
						<PreviewText>
							{getLatestMessageInfo(conversation)}
						</PreviewText>
					</ConversationInfo>
				</Conversation>
			))}
		</FlexContainer>
	);
};

export default ConversationList;

const ConversationInfo = styled(FlexContainer)`
	text-overflow: ellipsis;
	overflow: hidden;
`;

const ConversationTitle = styled.h1`
	font-size: 1rem;
	overflow: hidden;
`;

const Conversation = styled(FlexContainer)`
	transition: background-color 0.5s ease;
	&:hover {
		background-color: black;
	}
`;

const PreviewText = styled.div`
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
