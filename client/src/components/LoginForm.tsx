import { Formik, Form, Field, FormikHelpers } from "formik";
import TextInput from "./TextInput";
import { useContext, useState } from "react";
import GridItems from "./GridItems";
import { UserContext } from "../hooks/UserContext";
import { Container, Grid, Typography, Button } from "@mui/material";

interface IProps {
	createNewUser: () => void;
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
	const { createNewUser } = props;

	const login = async (
		values: FormData,
		{ setSubmitting }: FormikHelpers<FormData>
	) => {};

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
		<Container maxWidth="xs">
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
									onClick={createNewUser}
									disabled={isSubmitting}
								>
									Sign Up
								</Button>
							</GridItems>
						</Grid>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default LoginForm;
