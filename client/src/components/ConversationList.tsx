import styled from "@emotion/styled";
import { useTheme } from "@mui/material";
import React from "react";
import { ProfilePicture } from "../styles/styles";
import { ConversationData, MessageData } from "../types/types";
import FlexContainer from "./FlexContainer";

interface IProps {
	conversations: ConversationData[];
	selectConversation: React.Dispatch<React.SetStateAction<ConversationData | undefined>>; 
}

const ConversationList = (props: IProps) => {
	const theme = useTheme();
	const {conversations, selectConversation} = props;
	// const [conversations, setConversations] = useState<ConversationData[]>([]);

	const getLatestMessageInfo = (conversation: ConversationData) => {
		const latestMessage: MessageData =
			conversation.messages[conversation.messages.length - 1];
		return `${latestMessage.username}: ${latestMessage.content}`;
	};

	return (
		<FlexContainer justify="flex-start" width="auto">
			{conversations.map((conversation) => (
				<Conversation
					direction="row"
					height="5rem"
					width="400px"
					padding="0.7rem 0.5rem 0.7rem 1rem"
					color={theme.palette.secondary.main}
					onClick={() => selectConversation(conversation)}
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

const Conversation = styled(FlexContainer)<{ color: string }>`
	transition: background-color 0.5s ease;
	&:hover {
		background-color: ${(p) => p.color}
	}
`;

const PreviewText = styled.div`
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;
