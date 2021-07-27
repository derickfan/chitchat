import React from "react";
import { TextField } from "@material-ui/core";
import { FieldProps } from "formik";
import styled from "styled-components";

interface Props extends FieldProps {
  placeholder: string;
}

const TextInput: React.FC<Props> = ({placeholder, field, form}) => {

  return (
    <StyledTextField placeholder={placeholder} size="small" variant="outlined" fullWidth {...field} type={field.name === "password" ? "password" : "text" } />    
  );
}

export default TextInput;

const StyledTextField = styled(TextField)`
  & > div {
    background-color: #EBEBEB;
    border-radius: 30px;
    padding: 0 10px;
    /* background-color: transparent; */
  }
`