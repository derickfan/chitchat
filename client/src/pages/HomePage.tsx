import { Button, TextField, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { instance } from "../api";
import styled from "@emotion/styled";
import ConversationList from "../components/ConversationList";
import FlexContainer from "../components/FlexContainer";
import { UserContext } from "../hooks/UserContext";
import { ProfilePicture, Title } from "../styles/styles";
import { ConversationData } from "../types/types";

const HomePage = () => {
	const theme = useTheme();
	const { user, setUser } = useContext(UserContext);
	const [conversations, setConversations] = useState<ConversationData[]>([]);
	const [selectedConversation, setSelectedConversation] =
		useState<ConversationData | undefined>();

	useEffect(() => {
		instance
			.post("/conversation/getUser", { userId: user?.id })
			.then((response) => {
				console.log(response.data.data);
				setConversations(response.data.data);
			});
	}, []);

	const logout = () => {
		instance
			.post("/user/logout")
			.then((response) => {
				setUser(undefined);
				console.log(response);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<FlexContainer direction="row" width="100vw">
			<FlexContainer
				direction="column"
				// outline="1px solid white"
				padding="1rem 2rem"
				width="400px"
			>
				<Title>ChitChat</Title>
				<ConversationList
					conversations={conversations}
					selectConversation={setSelectedConversation}
				/>
				<Button
					variant="outlined"
					color="primary"
					type="submit"
					onClick={logout}
					disableElevation={true}
					fullWidth
				>
					Logout
				</Button>
			</FlexContainer>
			<FlexContainer
				direction="column"
				align="flex-start"
				margin="1rem"
				padding="1rem 2rem"
				width="100%"
			>
			{
				!selectedConversation ? (
					<h1>Select a conversation or create a new one</h1>
				) : (
					<>
						<h1>{selectedConversation.name}</h1>
						<FlexContainer
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
										padding="0.5rem 1rem"
										margin="0 1rem"
									>
										{e.content}
									</MessageBubble>
								</FlexContainer>
							))}
						</FlexContainer>
						<FlexContainer direction="row" height="auto">
							<TextField
								size="small"
								placeholder="Enter your message..."
								multiline
								fullWidth
							/>
							<Button>Send</Button>
						</FlexContainer>
					</>
				)
			}
			</FlexContainer>
		</FlexContainer>
	);
};

export default HomePage;

const MessageBubble = styled(FlexContainer)<{ color: string }>`
	word-break: break-all;
	max-width: 40rem;
	background: ${(p) => p.color || "white"};
	border-radius: 2rem;
`;
