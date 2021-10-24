import React from "react";
import { FieldProps } from "formik";
import { TextField } from "@mui/material";

interface Props extends FieldProps {
	placeholder: string;
}

const TextInput: React.FC<Props> = ({ placeholder, field, form }) => {
	return (
		<TextField
			placeholder={placeholder}
			size="small"
			variant="outlined"
			autoComplete="off"
			fullWidth
			{...field}
			type={field.name === "password" ? "password" : "text"}
		/>
	);
};

export default TextInput;