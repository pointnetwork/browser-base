import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';
import { DialogStyle } from '~/renderer/mixins/dialogs';

export const StyledApp = styled(DialogStyle)`
  overflow: overlay;
  padding: 6px;
  font-size: 13px;
  width: 100vw;
  height: 100vh;
  background: transparent;
  > :not(:last-child) {
    margin-bottom: 10px;
  }
  ${({ theme }: { theme?: ITheme; visible: boolean }) => css`
    &::-webkit-scrollbar {
      width: 3px;
      -webkit-app-region: no-drag;
      background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${theme['dialog.lightForeground']
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)'};

      &:hover {
        background-color: ${theme['dialog.lightForeground']
          ? 'rgba(255, 255, 255, 0.3)'
          : 'rgba(0, 0, 0, 0.3)'};
      }
    }
    color: ${theme['dialog.lightForeground'] ? 'white' : 'black'};
  `};
`;
