import {
	Paper,
	FormControl,
	FormHelperText,
	Button,
	Autocomplete,
	TextField,
} from "@mui/material";
import { useState } from "react";
import FlexContainer from "./FlexContainer";

const names = [
	"Oliver Hansen",
	"Van Henry",
	"April Tucker",
	"Ralph Hubbard",
	"Omar Alexander",
	"Carlos Abbott",
	"Miriam Wagner",
	"Bradley Wilkerson",
	"Virginia Andrews",
	"Kelly Snyder",
];

const CreateConversationModal = () => {
	const [users, setUsers] = useState<string[]>([]);

	const createConversation = () => {
		console.log(users);
	};

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
						options={names}
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
