import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  > h1 {
    border-bottom: 3px solid #000;
    width: calc(100vw - 60px);
    text-align: center;
    padding: 5px 5px 10px;
    margin: 10px 0 0 0;
    font-size: 30px;
  }
  > .tab {
    z-index: 10;
    position: absolute;
    right: 20px;
    top: 10px;

    > button {
      &:hover {
        cursor: pointer;
      }
      padding: 5px 6px;
      border-radius: 10px;
      background-color: #555;
      height: fit-content;
      border: 1px solid #777;

      > p {
        font-size: 16px;
      }
    }
  }
  ${({ theme }: { theme?: ITheme }) => css`
    filter: ${!theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
  `};
`;
