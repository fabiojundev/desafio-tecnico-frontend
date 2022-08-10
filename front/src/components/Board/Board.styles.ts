import styled from "styled-components";

export const BoardContainer = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(4, minmax(300px, 4fr));
  margin: 0 auto;
  max-width: 100%;
`;

export const ListContainer = styled.div`
  align-content: baseline;
  align-items: baseline;
  border-radius: 4px;
  background-color: #eee;
  color: #172b4d;
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
  min-height: 100px;
  padding: 20px 0;
`;

export const ListHeader = styled.div`
  border-bottom: 1px solid #dcdcdc;
  text-align: center;
  width: 100%;
`;

export const ListBody = styled.div`
  width: 100%;
  border-bottom: 1px solid #fff;
`;

export const ListFooter = styled.div`
  width: 100%;
`;

export const ListTitle = styled.h2`
  font-size: 1em;
  font-weight: 800;
  margin-bottom: 10px;
`;

export const ListText = styled.p`
  margin-bottom: 10px;
`;
