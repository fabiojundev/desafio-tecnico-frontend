import styled from "styled-components";

export const CardContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  background-color: white;
  color: #172b4d;
  display: flex;
  justify-content: space-evenly;
  margin: 10px;
  min-height: 100px;
  padding: 20px;
  width: 200px;
`;

export const CardTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

export const CardText = styled.p`
  margin-bottom: 10px;
`;

export const IconContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font-size: .9rem;
  padding: 10px 0;
  svg {
    cursor: pointer;
    font-size: 1.5rem;
    padding: 5px 0;
  }

  &:hover {
    background-color: #eee;
  }
`;