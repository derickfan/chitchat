import React, { createContext, useState } from "react";
import { UserData } from "../types/types";

interface ContextType {
	user: UserData | undefined;
	setUser: (state: UserData | undefined) => void;
}

const initialUserContext: ContextType = {
	user: undefined,
	setUser: (state: UserData | undefined) => {},
};

const UserContext = createContext(initialUserContext);

interface InitialProps {
	children: JSX.Element | JSX.Element[];
}

const UserProvider = (props: InitialProps) => {
	const { children } = props;
	const [user, setUser] = useState<UserData | undefined>(
		initialUserContext.user
	);

	return (
		<UserContext.Provider
			value={{
				user,
				setUser: (data: UserData | undefined) => {
					setUser(data);
				},
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export { UserProvider, UserContext };
