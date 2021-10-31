import { Typography } from "@mui/material";
import React from "react";
import FlexContainer from "../components/FlexContainer";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { useToggle } from "../hooks/ToggleState";
import { Title } from "../styles/styles";

const WelcomePage = () => {
	const [creatingNewUser, toggleCreatingNewUser] = useToggle(false);

	return (
		<FlexContainer>
			<Title>Chit Chat</Title>
			{creatingNewUser ? (
				<SignupForm createNewUser={toggleCreatingNewUser} />
			) : (
				<LoginForm loginUser={toggleCreatingNewUser} />
			)}
		</FlexContainer>
	);
};

export default WelcomePage;
