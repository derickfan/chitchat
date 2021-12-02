import {
	Button,
	Modal,
	SelectChangeEvent,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { instance } from "../api";
import Conversation from "../components/Conversation";
import ConversationList from "../components/ConversationList";
import FlexContainer from "../components/FlexContainer";
import { useToggle } from "../hooks/ToggleState";
import { UserContext } from "../hooks/UserContext";
import { Title } from "../styles/styles";
import { ConversationData, MessageData } from "../types/types";
import CreateConversationModal from "../components/CreateConversationModal";

const HomePage = () => {
	const { user, setUser } = useContext(UserContext);
	const [conversations, setConversations] = useState<ConversationData[]>([]);
	const [selectedConversation, setSelectedConversation] = useState<
		ConversationData | undefined
	>(undefined);
	const [isCreatingConversation, toggleIsCreatingConversation] =
		useToggle(false);
	const [users, setUsers] = useState<string[]>([]);

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
		if (!selectedConversation) throw new Error("Something happened");
		const newConversation = {
			...selectedConversation,
			messages: selectedConversation.messages.concat(e),
		};
		setSelectedConversation(newConversation);
		updateConversationList(e);
	};

	const updateConversationList = (message: MessageData) => {
		setConversations((prevConversations) => {
			return prevConversations.map((conversation) => {
				if (conversation.id === message.converstaionId) {
					return {
						...conversation,
						messages: conversation.messages.concat(message),
					};
				} else {
					return conversation;
				}
			});
		});
	};

	const createConversation = () => {
		console.log(`Creating a new conversation with ${users}`);
	};

	const addUser = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event;
		setUsers(typeof value === "string" ? value.split(",") : value);
		console.log(users);
	};

	return (
		<FlexContainer direction="row" width="100vw">
			<Modal
				open={isCreatingConversation}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
				onClose={() => toggleIsCreatingConversation()}
			>
				<CreateConversationModal
					createConversation={createConversation}
					addUser={addUser}
					users={users}
				/>
			</Modal>
			<FlexContainer direction="column" padding="1rem 2rem" width="400px">
				<Title>ChitChat</Title>
				<ConversationList
					conversations={conversations}
					selectConversation={setSelectedConversation}
				/>
				<FlexContainer
					direction="column"
					height="100px"
					justify="space-between"
				>
					<Button
						onClick={() => toggleIsCreatingConversation()}
						variant="contained"
						fullWidth
					>
						Create Conversation
					</Button>
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
			</FlexContainer>
			{selectedConversation ? (
				<Conversation
					sendMessage={sendMessage}
					selectedConversation={selectedConversation}
				/>
			) : (
				<FlexContainer>
					<h1>Select a conversation or create a new one</h1>
				</FlexContainer>
			)}
		</FlexContainer>
	);
};

export default HomePage;
