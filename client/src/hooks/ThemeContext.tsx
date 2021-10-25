import { createContext } from "react";
import { useToggle } from "./ToggleState";

interface ContextType {
	darkMode: boolean;
	toggleDarkMode: () => void;
}

const initialThemeContext: ContextType = {
	darkMode: true,
	toggleDarkMode: () => {},
};

const ThemeContext = createContext(initialThemeContext);

interface InitialProps {
	children: JSX.Element | JSX.Element[];
}

const ThemeProvider = (props: InitialProps) => {
	const { children } = props;
	const [darkMode, toggleDarkMode] = useToggle(initialThemeContext.darkMode);

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

export { ThemeProvider, ThemeContext };
