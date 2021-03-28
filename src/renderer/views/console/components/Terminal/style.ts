import styled, { css } from 'styled-components';

export const TerminalContainer = styled.div`
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

export const LogItem = styled.li`
  padding: 2px 6px;
  display: grid;
  grid-template-columns: 80px minmax(0, 1fr);
  grid-gap: 10px;
  > .timestamp {
    &::before {
      content: '> ';
    }
    column-span: 1;
  }
  .content {
    column-span: 1;
    user-select: text;
    > p {
      user-select: text;
    }
    .progress {
      user-select: none;
    }
  }
  .multiline {
    display: grid;
    grid-template-columns: fit-content(100%);
    grid-auto-rows: auto;
    > * {
      padding-bottom: 2px;
    }
  }
`;
