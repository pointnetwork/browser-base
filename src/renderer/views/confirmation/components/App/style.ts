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
  background-color: rgba(20, 20, 20, 0.9);
  border-radius: 5px;
  border: 1px rgba(100, 100, 100, 1) solid;

  padding: 10px;
  > section {
    padding: 12px;
    margin-top: 8px;
  }
`;

export const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  > h1 {
    font-size: 20px;
  }
`;
