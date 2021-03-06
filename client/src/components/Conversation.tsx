import styled from "@emotion/styled";
import { Button, TextField, useTheme } from "@mui/material";
import React, { createRef, useContext, useEffect, useState } from "react";
import { SocketContext } from "../hooks/SocketContext";
import { UserContext } from "../hooks/UserContext";
import { ProfilePicture } from "../styles/styles";
import { ConversationData, NewMessageData } from "../types/types";
import FlexContainer from "./FlexContainer";

interface IProps {
	selectedConversation: ConversationData;
	sendMessage: (e: NewMessageData) => void;
}

const Conversation = (props: IProps) => {
	const theme = useTheme();
	const { user } = useContext(UserContext);
	const [text, setText] = useState<string>("");
	const { selectedConversation, sendMessage } = props;
	const typingIndicatorRef = createRef<HTMLDivElement>();

	useEffect(() => {
		scrollIntoView();
	}, [selectedConversation]);

	const scrollIntoView = () => {
		typingIndicatorRef.current?.scrollIntoView({ behavior: "auto" });
	};

	const onEnter = () => {
		if (!user) throw new Error("User not logged in");
		const message: NewMessageData = {
			content: text,
			conversationId: selectedConversation.id,
			username: user?.username,
		};
		sendMessage(message);
		setText("");
	};

	return (
		<FlexContainer
			direction="column"
			align="center"
			margin="1rem"
			padding="1rem 0rem"
			width="100%"
		>
			<h1>{selectedConversation.name}</h1>
			<MessageContainer
				height="100%"
				align="flex-start"
				justify="flex-start"
			>
				{selectedConversation.messages.map((message, index) => (
					<FlexContainer
						key={index}
						direction={
							message.username === user?.username
								? "row-reverse"
								: "row"
						}
						height="auto"
						width="100%"
						margin="0.5rem 0"
						align="flex-end"
						justify="flex-start"
					>
						<ProfilePicture src="https://cdn.discordapp.com/attachments/792881224753872929/875159970444894218/image_2.png" />
						<MessageBubble
							color={
								message.username === user?.username
									? theme.palette.secondary.main
									: theme.palette.primary.main
							}
							textAlign="left"
							width="fit-content"
							height="fit-content"
							padding="0.5rem 1rem"
							margin="0 1rem"
						>
							{message.content}
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
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							onEnter();
							e.preventDefault();
						}
					}}
					value={text}
					multiline
					fullWidth
				/>
				<Button onClick={onEnter}>Send</Button>
			</FlexContainer>
		</FlexContainer>
	);
};

export default Conversation;

const MessageBubble = styled(FlexContainer)<{ color: string }>`
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
