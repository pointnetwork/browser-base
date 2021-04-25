import styled, { css } from 'styled-components';

export const TxList = styled.ul`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  max-width: 400px;
  > li {
    word-break: break-word;
  }
`;

export const Wrapper = styled.div`
  > h2 {
    font-size: 24px;
    text-align: center;
  }
`;
