import { Formik, Form, Field, FormikHelpers } from "formik";
import TextInput from "./TextInput";
import { useContext, useState } from "react";
import GridItems from "./GridItems";
import { Grid, Typography, Button } from "@mui/material";
import { FormContainer } from "../styles/styles";
import { ThemeContext } from "../hooks/ThemeContext";
import { instance } from "../api";
import { UserContext } from "../hooks/UserContext";
import { UserData } from "../types/types";
import { AxiosResponse } from "axios";

interface IProps {
	loginUser: () => void;
}

interface FormData {
	username: string;
	password: string;
}

const initialValues: FormData = {
	username: "",
	password: "",
};

const LoginForm = (props: IProps) => {
	const { darkMode } = useContext(ThemeContext);
	const { setUser } = useContext(UserContext);
	const { loginUser } = props;
	const [error, setError] = useState<string>();

	const login = async (
		values: FormData,
		{ setSubmitting }: FormikHelpers<FormData>
	) => {
		setError("");
		setSubmitting(true);

		instance
			.post("/user/login", values)
			.then((response: AxiosResponse<UserData>) => {
				const user: UserData = response.data;
				setUser(user);
				console.log(response);
			})
			.catch((error) => {
				if (error.response) {
					console.error(error.response.data);
					setError(error.response.data);
				}
				console.error(error);
			});
		setSubmitting(false);
	};

	const generateFields = (values: FormData): JSX.Element => {
		return (
			<>
				{Object.keys(values).map((field, idx) => (
					<Field
						name={field}
						placeholder={field}
						component={TextInput}
						key={idx}
					/>
				))}
			</>
		);
	};

	return (
		<FormContainer darkMode={darkMode} maxWidth="xs">
			<Formik
				initialValues={initialValues}
				onSubmit={(values, actions) => {
					login(values, actions);
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Grid
							spacing={2}
							alignContent="center"
							alignItems="center"
							justifyContent="center"
							container
						>
							<GridItems>
								<Typography variant="h4" align="center">
									Login
								</Typography>
								{generateFields(initialValues)}
								{!!error ? (
									<Typography color="error">
										Error: Could not login
									</Typography>
								) : (
									<></>
								)}
								<Button
									variant="contained"
									color="primary"
									type="submit"
									disableElevation={true}
									disabled={isSubmitting}
									fullWidth
								>
									Login
								</Button>
								<Button
									disableElevation={true}
									fullWidth
									onClick={loginUser}
									disabled={isSubmitting}
								>
									Sign Up
								</Button>
							</GridItems>
						</Grid>
					</Form>
				)}
			</Formik>
		</FormContainer>
	);
};

export default LoginForm;
