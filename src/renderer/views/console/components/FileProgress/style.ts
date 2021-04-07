import styled from 'styled-components';

export const FileProgressContainer = styled.div`
  margin-top: 10px;

  position: relative;
  overflow-y: auto;
  padding: 5px;

  min-width: 300px;
  width: 85vw;

  height: 75vh;
  max-height: 75vh;
  min-height: 100px;

  border-radius: 5px;
  border: 1px #03a062 solid;
  box-shadow: 0 0 8px 4px rgba(3, 160, 98, 0.3);

  background-color: #202020;
  color: #dfdfdf;

  line-height: 1;

  //&::-webkit-scrollbar {
  //  display: none;
  //}
  > ul {
    background-color: rgba(3, 160, 98, 0.1);
    width: 100%;
  }
`;
