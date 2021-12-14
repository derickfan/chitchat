import { Button, Modal } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { instance } from "../api";
import Conversation from "../components/Conversation";
import ConversationList from "../components/ConversationList";
import FlexContainer from "../components/FlexContainer";
import { useToggle } from "../hooks/ToggleState";
import { UserContext } from "../hooks/UserContext";
import { Title } from "../styles/styles";
import { ConversationData, MessageData, NewMessageData } from "../types/types";
import CreateConversationModal from "../components/CreateConversationModal";
import { SocketContext } from "../hooks/SocketContext";

const initialSelectedConversation = {
	id: "",
	messages: [],
	name: "",
	users: [],
};

const HomePage = () => {
	const { user, setUser } = useContext(UserContext);
	const { socket } = useContext(SocketContext);
	const [conversations, setConversations] = useState<ConversationData[]>([]);
	const [selectedConversation, setSelectedConversation] =
		useState<ConversationData>(initialSelectedConversation);
	const [isCreatingConversation, toggleIsCreatingConversation] =
		useToggle(false);
	const [refreshConversation, toggleRefreshConversation] = useToggle(true);

	useEffect(() => {
		if (refreshConversation) {
			instance
				.post("/conversation/getUser", { userId: user?.id })
				.then((response) => {
					console.log(response.data.data);
					setConversations(response.data.data);
				});
			toggleRefreshConversation();
		}
	}, [refreshConversation]);

	useEffect(() => {
		const updateConversationList = (message: MessageData) => {
			setConversations((prevConversations) => {
				return prevConversations.map((conversation) => {
					if (conversation.id === message.conversationId) {
						const newConversation = {
							...conversation,
							messages: conversation.messages.concat(message),
						};
						return newConversation;
					} else {
						return conversation;
					}
				});
			});
		};

		socket.on("message", (message: MessageData) => {
			updateConversationList(message);
			console.log(message);
		});

		socket.on("newConversation", () => {
			toggleRefreshConversation();
			console.log("A new conversation has been created");
		});

		setSelectedConversation(
			conversations.find((c) => selectedConversation.id === c.id) ||
				initialSelectedConversation
		);

		return () => {
			socket.off("message");
			socket.off("newConversation");
		};
	}, [conversations]);

	const logout = () => {
		instance
			.post("/user/logout")
			.then((response) => {
				setUser(undefined);
				console.log(response);
				socket.emit("logout");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const sendMessage = (message: NewMessageData) => {
		if (!selectedConversation) throw new Error("Something happened");
		socket.emit("message", message);
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
					toggleIsCreatingConversation={toggleIsCreatingConversation}
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
						onClick={logout}
						fullWidth
					>
						Logout
					</Button>
				</FlexContainer>
			</FlexContainer>
			{selectedConversation.users.length ? (
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
