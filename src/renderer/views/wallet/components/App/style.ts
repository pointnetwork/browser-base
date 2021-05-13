import styled, { css } from 'styled-components';
import { centerIcon } from '~/renderer/mixins';

import { ITheme } from '~/interfaces';

export const Wrapper = styled.div`
  -webkit-user-select: auto;
  user-select: text;
  cursor: auto;
  pointer-events: auto;

  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;

  ${({ fullSize }: { fullSize: boolean }) => css`
    height: ${fullSize ? '100vh' : 'auto'};
  `};
  padding: 20px;
  > h1 {
    font-size: 30px;
  }
  > div {
    margin-top: 20px;
    > p {
      font-size: 15px;
      max-width: 400px;
      word-break: break-word;
    }
    > button {
      padding: 5px;
    }
  }

  .inputs-wrapper {
    display: flex;
    flex-direction: column;
    > h6 {
      margin-bottom: 10px;
    }
    > p {
      font-size: 12px;
      margin-top: 5px;
      margin-bottom: 2px;
    }
    > input {
      width: 350px;
      font-size: 14px;
    }
    > textarea {
      width: 350px;
      font-size: 14px;
    }
    > button {
      margin-left: auto;
      margin-top: 10px;
      padding: 5px;
      width: 150px;
    }
  }
`;
