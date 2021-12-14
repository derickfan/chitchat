import {
	Paper,
	FormControl,
	FormHelperText,
	Button,
	Autocomplete,
	TextField,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { instance } from "../api";
import { SocketContext } from "../hooks/SocketContext";
import { UserContext } from "../hooks/UserContext";
import FlexContainer from "./FlexContainer";

interface IProps {
	toggleIsCreatingConversation: () => void;
}

const CreateConversationModal = (props: IProps) => {
	const { user } = useContext(UserContext);
	const { socket } = useContext(SocketContext);
	const [users, setUsers] = useState<string[]>([]);
	const { toggleIsCreatingConversation } = props;
	const [availableUsers, setAvailableUsers] = useState<string[]>([]);

	const createConversation = () => {
		if (user !== undefined && users.length > 0) {
			const conversationName = generateConversationName([
				...users,
				user.username,
			]);
			socket.emit("createConversation", {
				name: conversationName,
				creatorId: user.id,
				usernames: users,
			});
			toggleIsCreatingConversation();
		}
	};

	const generateConversationName = (listOfUsernames: string[]) => {
		return [...listOfUsernames].sort().join(", ");
	};

	useEffect(() => {
		if (user !== undefined) {
			instance.get("/user/all").then((response) => {
				const listOfUsernames = response.data.data.map(
					(u: { username: string }) => u.username
				);
				setAvailableUsers(listOfUsernames);
			});
		}
	}, []);

	return (
		<Paper
			sx={{ width: 500, height: 500 }}
			elevation={3}
			variant="outlined"
		>
			<FlexContainer>
				<FormControl sx={{ m: 1, width: "90%" }}>
					<Autocomplete
						multiple
						options={availableUsers}
						autoHighlight
						onChange={(e, value) => {
							setUsers(value);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								placeholder="Users"
								label="Users: "
							/>
						)}
					/>
					<FormHelperText>
						Choose the users to want to add to this new conversation
					</FormHelperText>
				</FormControl>
				<Button
					variant="contained"
					onClick={() => createConversation()}
				>
					Create New Conversation
				</Button>
			</FlexContainer>
		</Paper>
	);
};

export default CreateConversationModal;
