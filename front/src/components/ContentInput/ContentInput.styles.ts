import styled from "styled-components";

export const ContentInputContainer = styled.div<{ height: string }>`
  display: block;
  width: 100%;

  textarea {
    height: ${(props) => (props.height ? props.height : "5em")};
  }
`;

export const ErrorMsg = styled.div`
  color: red;
  display: block;
  font-size: 0.8em;
  margin: 0 0 5px 5px;
  text-align: left;
`;
