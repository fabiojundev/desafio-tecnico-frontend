/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { ICardError } from "../../types/card.type";
import { InputContainer, ErrorMsg } from "./TextInput.styles";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  errors: ICardError[];
}

function TextInput({ errors, name, ...props }: TextInputProps) {
  const error = errors.find((e: ICardError) => e.field === name);

  return (
    <InputContainer>
      <input name={name} {...props} />
      <ErrorMsg>{error && error?.msg}</ErrorMsg>
    </InputContainer>
  );
}

export default TextInput;
