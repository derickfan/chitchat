import styled from "@emotion/styled";
import { Container, Typography } from "@mui/material";

export const FlexContainer = styled(Container)`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	text-align: center;
`;

export const CenteredFlexContainer = styled(FlexContainer)`
	align-items: center;
`;

export const FormContainer = styled(Container)<{ darkMode: boolean}>`
	display: flex;
	align-items: center;
	margin: 1rem;
	height: 30rem;
`;

export const CustomTypography = styled(Typography)<{ customColor: string}>`
	color: ${p => p.customColor}
`;