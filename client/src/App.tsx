import React, { useContext } from "react";
import "./App.css";
import { UserProvider } from "./hooks/UserContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RouterPage from "./pages/RouterPage";
import { Button, CssBaseline, styled } from "@mui/material";
import { ThemeContext } from "./hooks/ThemeContext";
import { green } from "@mui/material/colors";

function App() {
	const { darkMode, toggleDarkMode } = useContext(ThemeContext);

	const theme = createTheme({
		palette: {
			// Applying this to a Typography does not work???
			success: { main: green[500] },
			mode: darkMode ? "dark" : "light",
		},
		components: {
			MuiOutlinedInput: {
				styleOverrides: {
					input: {
						"background-color": darkMode ? "black" : "white",
					},
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<UserProvider>
				<AbsoluteButton onClick={toggleDarkMode}>Toggle</AbsoluteButton>
				<RouterPage />
			</UserProvider>
		</ThemeProvider>
	);
}

export default App;

const AbsoluteButton = styled(Button)`
	position: absolute;
`;
