/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { ContentInputContainer, ErrorMsg } from "./ContentInput.styles";

interface ContentInputProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  error: string;
  height: string;
}

function ContentInput({ error, name, height, ...props }: ContentInputProps) {
  return (
    <ContentInputContainer height={height}>
      <textarea name={name} {...props} />
      <ErrorMsg>{error}</ErrorMsg>
    </ContentInputContainer>
  );
}

export default ContentInput;
