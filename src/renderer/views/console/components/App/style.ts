import styled, { css } from 'styled-components';
import { centerIcon } from '~/renderer/mixins';

import { ITheme } from '~/interfaces';

export const Wrapper = styled.div`
  -webkit-user-select: auto;
  user-select: auto;
  cursor: auto;
  pointer-events: auto;

  display: flex;
  flex-flow: column;
  align-items: center;
  position: relative;
  overflow: hidden;

  ${({ fullSize }: { fullSize: boolean }) => css`
    height: ${fullSize ? '100vh' : 'auto'};
  `};
  padding: 5px;

  // ${({ theme }: { theme?: ITheme }) => css`
    //   filter: ${!theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
    //
  `};
`;
