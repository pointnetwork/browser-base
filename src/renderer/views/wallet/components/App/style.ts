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
  }
`;
