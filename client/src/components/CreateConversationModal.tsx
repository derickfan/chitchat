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
import { UserContext } from "../hooks/UserContext";
import FlexContainer from "./FlexContainer";

const CreateConversationModal = () => {
	const { user } = useContext(UserContext);
	const [users, setUsers] = useState<string[]>([]);
	const [availableUsers, setAvailableUsers] = useState<string[]>([]);

	const createConversation = () => {
		console.log(users);
	};

	useEffect(() => {
		if (user !== undefined) {
			instance.get("/user/all", {
				params: {
					userId: user.id
				}
			}).then((response) => {
				const listOfUsernames = response.data.data.map((u: { username: string }) => u.username);
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
