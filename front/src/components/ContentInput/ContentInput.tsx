import React, { useState } from "react";
import { ICardError } from "../../types/card.type";
import { ContentInputContainer, ErrorMsg } from "./ContentInput.styles";

interface ContentInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  errors: ICardError[];
  height?: string;
}

function ContentInput({ errors, name, height, ...props }: ContentInputProps) {
  const error = errors.find((e: ICardError) => e.field === name);

  return (
    <ContentInputContainer height={height}>
      <textarea name={name} {...props} />
      <ErrorMsg>{error && error?.msg}</ErrorMsg>
    </ContentInputContainer>
  );
}

export default ContentInput;
