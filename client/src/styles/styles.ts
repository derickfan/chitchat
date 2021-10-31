import styled from "@emotion/styled";
import { Container, Typography } from "@mui/material";

export const FormContainer = styled(Container)<{ darkMode: boolean }>`
	display: flex;
	align-items: center;
	margin: 1rem;
	height: 30rem;
`;

export const Title = styled.h1`
	font-family: "Chewy", cursive;
	font-size: 3rem;
`;

export const ProfilePicture = styled.img`
	border-radius: 100%;
	height: 100%;
`;

export const CustomTypography = styled(Typography)<{ customColor: string }>`
	color: ${p => p.customColor}
`;

