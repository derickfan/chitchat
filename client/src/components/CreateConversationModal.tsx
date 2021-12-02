import {
	Paper,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Checkbox,
	ListItemText,
	FormHelperText,
	Button,
	SelectChangeEvent,
	Theme,
} from "@mui/material";
import FlexContainer from "./FlexContainer";

interface IProps {
	users: string[];
	addUser: (event: SelectChangeEvent<string[]>) => void;
	createConversation: () => void;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

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

const CreateConversationModal = (props: IProps) => {
	const { users, addUser, createConversation } = props;

	return (
		<Paper
			sx={{ width: 500, height: 500 }}
			elevation={3}
			variant="outlined"
		>
			<FlexContainer>
				<FormControl sx={{ m: 1, width: "90%" }}>
					<InputLabel id="users">Users: </InputLabel>
					<Select
						labelId="users"
						label="Users"
						multiple={true}
						value={users}
						onChange={addUser}
						multiline
						renderValue={(selected) => selected.join(", ")}
						MenuProps={{
							PaperProps: {
								style: {
									maxHeight:
										ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
									width: "auto",
								},
							},
						}}
					>
						{names.map((name) => (
							<MenuItem key={name} value={name}>
								<Checkbox checked={users.indexOf(name) > -1} />
								<ListItemText primary={name} />
							</MenuItem>
						))}
					</Select>
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
