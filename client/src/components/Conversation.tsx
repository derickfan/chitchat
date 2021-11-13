import styled from "@emotion/styled";
import { Button, TextField, useTheme } from "@mui/material";
import React, { createRef, useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/UserContext";
import { ProfilePicture } from "../styles/styles";
import { ConversationData, MessageData } from "../types/types";
import FlexContainer from "./FlexContainer";

interface IProps {
	selectedConversation: ConversationData;
	sendMessage: (e: MessageData) => void;
}

const Conversation = (props: IProps) => {
	const theme = useTheme();
	const { user } = useContext(UserContext);
	const [ text, setText ] = useState<string>("");
	const { selectedConversation, sendMessage } = props;
	const typingIndicatorRef = createRef<HTMLDivElement>();

	useEffect(() => {
		scrollIntoView()
	}, [selectedConversation]);

	const scrollIntoView = () => {
		typingIndicatorRef.current?.scrollIntoView({behavior: "auto"});
	}

	const onEnter = () => {
		if (!user) throw new Error("User not logged in");
		const message: MessageData = {
			id: "askfasflask",
			content: text,
			converstaionId: selectedConversation.id,
			createdAt: new Date(),
			username: user?.username
		}
		sendMessage(message);
		setText("");
		// scrollIntoView();
	}


	return (
		<FlexContainer
			direction="column"
			align="center"
			margin="1rem"
			padding="1rem 0rem"
			width="100%"
		>
			{!selectedConversation ? (
				<h1>Select a conversation or create a new one</h1>
			) : (
				<>
					<h1>{selectedConversation.name}</h1>
					<MessageContainer
						height="100%"
						align="flex-start"
						justify="flex-start"
					>
						{selectedConversation.messages.map((e) => (
							<FlexContainer
								direction={
									e.username === user?.username
										? "row-reverse"
										: "row"
								}
								height="auto"
								width="100%"
								margin="0.5rem 0"
								// padding="0.5rem"
								// width="500px"
								align="flex-end"
								justify="flex-start"
							>
								<ProfilePicture src="https://cdn.discordapp.com/attachments/792881224753872929/875159970444894218/image_2.png" />
								<MessageBubble
									color={
										e.username === user?.username
											? theme.palette.secondary.main
											: theme.palette.primary.main
									}
									textAlign="left"
									width="fit-content"
									height="fit-content"
									padding="0.5rem 1rem"
									margin="0 1rem"
								>
									{e.content}
								</MessageBubble>
							</FlexContainer>
						))}
						<div ref={typingIndicatorRef}></div>
					</MessageContainer>
					<FlexContainer direction="row" height="auto">
						<TextField
							size="small"
							placeholder="Enter your message..."
							onChange={(e) => setText(e.target.value)}
							value={text}
							multiline
							fullWidth
						/>
						<Button onClick={onEnter}>Send</Button>
					</FlexContainer>
				</>
			)}
		</FlexContainer>
	);
};

export default Conversation;

const MessageBubble = styled(FlexContainer)<{ color: string }>`
	/* word-break: break-all; */
	max-width: 40rem;
	background: ${(p) => p.color || "white"};
	border-radius: 2rem;
	white-space: pre-wrap;
`;

const MessageContainer = styled(FlexContainer)`
	overflow: auto;
	&::-webkit-scrollbar {
		display: none;
	}
`;
