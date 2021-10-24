import { useContext, useEffect } from "react";
import { UserContext } from "../hooks/UserContext";
import HomePage from "./HomePage";
import WelcomePage from "./WelcomePage";

const RouterPage = () => {
	const { user, setUser } = useContext(UserContext);

	useEffect(() => {
		// API call to see if user is still logged in
	}, []);

	return user ? <HomePage /> : <WelcomePage />;
}

export default RouterPage;