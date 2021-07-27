import {
	Grid,
	Typography,
	Button,
	Container,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import TextInput from "./TextInput";
import styled from "styled-components";

const login = () => {
	console.log("Login");
};

const initialValues = {
	username: "",
	password: "",
};

const LoginForm = () => {
	return (
		<LoginContainer maxWidth="sm">
			<Formik initialValues={initialValues} onSubmit={login}>
				{({ values }) => (
					<Form>
						<Grid spacing={2} alignContent="center" alignItems="center" justify="center" justifyContent="center" container>
							<Grid xs={12} item>
								<Typography variant="h4" align="center">Login Form</Typography>
							</Grid>
							<Grid xs={12} item>
								<Field
									name="username"
									placeholder="username"
									component={TextInput}
								/>
							</Grid>
							<Grid xs={12} item>
								<Field
									name="password"
									placeholder="password"
									component={TextInput}
								/>
							</Grid>
							<Grid xs={12} item>
								<Button variant="contained" color="primary" disableElevation={true} fullWidth>Login</Button>
							</Grid>
              <Grid xs={12} item>
								<Button disableElevation={true} fullWidth>Sign Up</Button>
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</LoginContainer>
	);
};

export default LoginForm;

const LoginContainer = styled(Container)`
  background-color: #2F2F2F;
  padding: 2rem;
  border-radius: 20px;
`