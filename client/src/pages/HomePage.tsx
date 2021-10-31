import { Button } from "@mui/material";
import { useContext } from "react";
import { instance } from "../api";
import styled from "@emotion/styled";
import ConversationList from "../components/ConversationList";
import FlexContainer from "../components/FlexContainer";
import { UserContext } from "../hooks/UserContext";
import { Title } from "../styles/styles";

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
		<FlexContainer direction="row"  width="100vw">
			<FlexContainer direction="column" outline="1px solid white" padding="1rem 2rem" width="400px">
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
			<FlexContainer direction="column">
				<h1>Converstaion</h1>
			</FlexContainer>
		</FlexContainer>
	);
};

export default HomePage;
