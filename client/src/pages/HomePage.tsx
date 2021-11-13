import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { instance } from "../api";
import Conversation from "../components/Conversation";
import ConversationList from "../components/ConversationList";
import FlexContainer from "../components/FlexContainer";
import { UserContext } from "../hooks/UserContext";
import { Title } from "../styles/styles";
import { ConversationData, MessageData } from "../types/types";

const HomePage = () => {
	const { user, setUser } = useContext(UserContext);
	const [conversations, setConversations] = useState<ConversationData[]>([]);
	const [selectedConversation, setSelectedConversation] =
		useState<ConversationData | undefined>(undefined);


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

	const sendMessage = (e: MessageData) => {
		if (!selectedConversation) throw new Error("Something happened")
		const newConversation = {
			...selectedConversation,
			messages: selectedConversation.messages.concat(e)
		}
		setSelectedConversation(newConversation)
		setConversations((prevState) => {
			return prevState.map(conversation => {
				if (selectedConversation?.id !== conversation.id)
					return conversation;
				else
					return newConversation;
			});
		})
	}

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
			{
				selectedConversation ? 
				<Conversation sendMessage={sendMessage} selectedConversation={selectedConversation} /> 
				: <h1>Select a conversation or create a new one</h1>
			}
		</FlexContainer>
	);
};

export default HomePage;
