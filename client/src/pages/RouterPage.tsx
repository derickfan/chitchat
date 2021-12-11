import { useContext, useEffect } from "react";
import { instance } from "../api";
import { SocketContext } from "../hooks/SocketContext";
import { UserContext } from "../hooks/UserContext";
import { UserData } from "../types/types";
import HomePage from "./HomePage";
import WelcomePage from "./WelcomePage";

const RouterPage = () => {
	const { user, setUser } = useContext(UserContext);
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		instance
			.get("user/check")
			.then((response) => {
				const data: UserData = response.data;
				setUser(data);
				socket.emit("login", data.username);
			})
			.catch((err) => {
				console.error("Error: " + err);
			});
	}, []);

	return user ? <HomePage /> : <WelcomePage />;
};

export default RouterPage;
