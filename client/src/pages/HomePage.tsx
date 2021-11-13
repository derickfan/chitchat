import { Button, TextField, useTheme } from "@mui/material";
import { useContext } from "react";
import { instance } from "../api";
import styled from "@emotion/styled";
import ConversationList from "../components/ConversationList";
import FlexContainer from "../components/FlexContainer";
import { UserContext } from "../hooks/UserContext";
import { ProfilePicture, Title } from "../styles/styles";
import { ConversationData } from "../types/types";

const conversation: ConversationData = {
	id: "1",
	messages: [
		{
			id: "1",
			username: "johnsmith",
			content: "Hey my name is John Donut How are you doing?",
			converstaionId: "1",
			createdAt: new Date(),
		},
		{
			id: "1",
			username: "johnsmith",
			content: "I'm doing fine!",
			converstaionId: "1",
			createdAt: new Date(),
		},
		{
			id: "1",
			username: "derickfan",
			content:
				"Hey my name is John Donut How arejsdngsjklnsldkjngldsnglskdnglsdnglsdngsdlgsjklnsldkjngldsnglskdnglsdnglsdngsdlgsjklnsldkjngldsnglskdnglsdnglsdngsdlgsjklnsldkjngldsnglskdnglsdnglsdngsdlgn you doing?",
			converstaionId: "1",
			createdAt: new Date(),
		},
	],
	name: "John Smith",
	users: ["derickfan", "johnsmith"],
};

const HomePage = () => {
	const theme = useTheme();
	const { user, setUser } = useContext(UserContext);

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
				<ConversationList />
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
			<FlexContainer direction="column" margin="1rem" padding="1rem 2rem" width="100%">
				<h1>{conversation.name}</h1>
				<FlexContainer
					height="100%"
					align="flex-start"
					justify="flex-start"
				>
					{conversation.messages.map((e) => (
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
								color={e.username === user?.username ? theme.palette.secondary.main : theme.palette.primary.main}
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
					<TextField size="small" placeholder="Enter your message..." multiline fullWidth />
					<Button>Send</Button>
				</FlexContainer>
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
