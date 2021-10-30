import { Button } from "@mui/material";
import { useContext } from "react";
import { instance } from "../api";
import ConversationList from "../components/ConversationList";
import { UserContext } from "../hooks/UserContext";
import { CenteredFlexContainer } from "../styles/styles";

const HomePage = () => {
	const { setUser } = useContext(UserContext);

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
		<CenteredFlexContainer>
			<div>
				<h1>ChitChat</h1>
			</div>
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
		</CenteredFlexContainer>
	);
};

export default HomePage;
