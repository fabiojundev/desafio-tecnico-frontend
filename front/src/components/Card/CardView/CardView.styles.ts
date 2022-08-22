import styled from "styled-components";

export const CardContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  background-color: white;
  color: #172b4d;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 10px;
  min-height: 100px;
  padding: 10px;
  width: 100%;
`;

export const CardView = styled.div`
  padding: 10px 0;
  width: 100%;
`;

export const CardHeader = styled.div`
  align-items: end;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const CardBody = styled.div`
  padding: 10px 0;
  text-align: left;
  width: 100%;
`;

export const CardFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;
`;

export const CardTitle = styled.h3`
  font-size: 1em;
  flex-grow: 1;
  margin-bottom: 10px;
  text-align: center;
`;

export const CardText = styled.p`
  margin-bottom: 10px;
`;

export const CardForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  input,
  textarea {
    width: 100%;
  }
`;

export const IconContainer = styled.div<{ disabled?: boolean }>`
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font-size: 0.9rem;
  padding: 10px;
  pointer-events: ${(props) => (props.disabled ? "none" : "unset")};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};

  svg {
    cursor: pointer;
    font-size: 1.7rem;
    padding: 5px 0;
  }

  &:hover {
    background-color: #eee;
  }
`;
