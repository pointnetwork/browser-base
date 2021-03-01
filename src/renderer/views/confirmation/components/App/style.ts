import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';
import { DialogStyle } from '~/renderer/mixins/dialogs';

export const StyledApp = styled.div`
  overflow: overlay;
  font-size: 13px;
  width: 100vw;
  height: 100vh;
  background: transparent;
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

  position: relative;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  animation: 0.15s ease-out 0s 1 fadeIn;
`;

export const Wrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(100, 100, 100, 0.2);
`;
