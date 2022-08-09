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

export const CardHeader = styled.div`
  align-items: end;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-wrap: wrap;
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
  margin-bottom: 10px;
`;

export const CardText = styled.p`
  margin-bottom: 10px;
`;

export const IconContainer = styled.div<{ hidden?: boolean }>`
  align-items: center;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  font-size: 0.9rem;
  padding: 10px;
  visibility: ${props => props.hidden ? "hidden" : "visible"};

  svg {
    cursor: pointer;
    font-size: 1.5rem;
    padding: 5px 0;
  }

  &:hover {
    background-color: #eee;
  }
`;
