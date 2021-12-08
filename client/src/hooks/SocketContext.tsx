import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";

interface ContextType {
	socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const initialSocketContext: ContextType = {
	socket: io("http://localhost:5000", {
		secure: false,
	}),
};

const SocketContext = createContext(initialSocketContext);

interface InitialProps {
	children: JSX.Element | JSX.Element[];
}

const SocketProvider = (props: InitialProps) => {
	const { children } = props;
	const socket = initialSocketContext.socket;

	return (
		<SocketContext.Provider value={{ socket }}>
			{children}
		</SocketContext.Provider>
	);
};

export { SocketProvider, SocketContext };