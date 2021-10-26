import { Button } from "@mui/material";
import { useContext } from "react";
import { instance } from "../api";
import { UserContext } from "../hooks/UserContext";

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
		<div>
			<h1>Home Page</h1>
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
		</div>
	);
};

export default HomePage;
