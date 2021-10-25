import { Typography } from "@mui/material";
import React from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useToggle } from "../hooks/ToggleState";
import { CenteredFlexContainer } from "../styles/styles";

const WelcomePage = () => {
	const [creatingNewUser, toggleCreatingNewUser] = useToggle(false);

	return (
		<CenteredFlexContainer>
			<Typography variant="h3">Chit Chat</Typography>
			{creatingNewUser ? (
				<SignupForm createNewUser={toggleCreatingNewUser} />
			) : (
				<LoginForm loginUser={toggleCreatingNewUser} />
			)}
		</CenteredFlexContainer>
	);
};

export default WelcomePage;
