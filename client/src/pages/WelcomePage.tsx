import React from "react";
import { useToggle } from "../hooks/ToggleState";

const WelcomePage = () => {
	const [creatingNewUser, toggleCreatingNewUser] = useToggle(false);

	return (
		<div>
			<h1>ChitChat</h1>
			{
				creatingNewUser ? <h1>Creating New User</h1> : <h1>Logging in User</h1>
			}
			<button onClick={() => toggleCreatingNewUser()}>Toggle</button>
		</div>
	);
}

export default WelcomePage;