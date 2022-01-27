import { createContext } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface ContextType {
	socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}

const SOCKET_ENDPOINT: string = process.env.REACT_APP_SOCKET_ENDPOINT || "localhost:5000";

const initialSocketContext: ContextType = {
	socket: io(SOCKET_ENDPOINT, {
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
