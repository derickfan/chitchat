import { Button, Container, Grid, Typography } from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import GridItems from "./GridItems";
import TextInput from "./TextInput";

interface IProps {
	loginUser?: () => void;
}

interface FormData {
	username: string;
	email: string;
	password: string;
}

const initialvalues: FormData = {
	username: "",
	email: "",
	password: "",
};

const SignupForm = (props: IProps) => {
	const { loginUser } = props;

	const signup = async (
		values: FormData,
		actions: FormikHelpers<FormData>
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
				initialValues={initialvalues}
				onSubmit={(values, actions) => signup(values, actions)}
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
									Sign Up
								</Typography>
								{generateFields(initialvalues)}
								<Button
									variant="contained"
									color="primary"
									type="submit"
									disableElevation={true}
									fullWidth
									disabled={isSubmitting}
								>
									Create Account
								</Button>
								<Button
									disableElevation={true}
									fullWidth
									disabled={isSubmitting}
									onClick={loginUser}
								>
									Back
								</Button>
							</GridItems>
						</Grid>
					</Form>
				)}
			</Formik>
		</Container>
	);
};

export default SignupForm;
