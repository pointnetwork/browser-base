import styled, { css } from 'styled-components';
import { centerIcon } from '~/renderer/mixins';

import { ITheme } from '~/interfaces';

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  ${({ fullSize }: { fullSize: boolean }) => css`
    height: ${fullSize ? '100vh' : 'auto'};
  `};
  padding: 5px;
  > h1 {
    border-bottom: 3px solid #000;
    width: calc(100vw - 60px);
    text-align: center;
    padding: 5px 5px 10px;
    margin: 10px 0 0 0;
    font-size: 30px;
  }
`;
