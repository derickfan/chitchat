import { Container, TextField, Typography } from "@mui/material";
import React from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useToggle } from "../hooks/ToggleState";
import { CenteredFlexContainer, FlexContainer } from "../styles/styles";

const WelcomePage = () => {
	const [creatingNewUser, toggleCreatingNewUser] = useToggle(false);

	return (
		<CenteredFlexContainer>
			<Typography variant="h3">Chit Chat</Typography>
			{creatingNewUser ? (
				<SignupForm loginUser={toggleCreatingNewUser} />
			) : (
				<LoginForm createNewUser={toggleCreatingNewUser} />
			)}
		</CenteredFlexContainer>
	);
};

export default WelcomePage;
