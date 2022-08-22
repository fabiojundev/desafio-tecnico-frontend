/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { InputContainer, ErrorMsg } from "./TextInput.styles";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error: string;
}

function TextInput({ error, name, ...props }: TextInputProps) {
  return (
    <InputContainer>
      <input name={name} {...props} />
      <ErrorMsg>{error}</ErrorMsg>
    </InputContainer>
  );
}

export default TextInput;
