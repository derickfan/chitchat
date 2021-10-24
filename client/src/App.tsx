import React from "react";
import "./App.css";
import { UserProvider } from "./hooks/UserContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RouterPage from "./pages/RouterPage";
import { CssBaseline } from "@mui/material";

function App() {
	const theme = createTheme({
		palette: {
			mode: "dark",
		},
		components: {
			MuiOutlinedInput: {
				styleOverrides: {
					input: {
						"background-color": "black"
					}
				},
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<UserProvider>
				<RouterPage />
			</UserProvider>
		</ThemeProvider>
	);
}

export default App;
