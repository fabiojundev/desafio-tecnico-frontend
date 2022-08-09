import styled from "styled-components";

export const BoardContainer = styled.div`
  align-items: flex-start;
  display: grid;
  grid-template-columns: repeat(4, 220px);
  grid-gap: 10px;
  justify-content: space-evenly;
  margin: 10px;
  min-height: 100px;
  overflow: scroll;
  padding: 20px;
  width: 100%;
  height: 800px;
`;

export const ListContainer = styled.div`
  align-items: center;
  border-radius: 4px;
  background-color: #eee;
  color: #172b4d;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin: 10px;
  min-height: 100px;
  padding: 20px 0;
  width: 100%;
`;

export const ListHeader = styled.div`
  width: 100%;
  border-bottom: 1px solid #dcdcdc;
`;

export const ListBody = styled.div`
  width: 100%;
  border-bottom: 1px solid #fff;
`;

export const ListFooter = styled.div`
  width: 100%;
`;

export const ListTitle = styled.h2`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

export const ListText = styled.p`
  margin-bottom: 10px;
`;
