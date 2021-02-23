import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';

export const WalletWrapper = styled.div`
  margin: 24px;
  margin-top: 50px;
  ${({ theme }: { icon?: string; theme?: ITheme; imageSet?: boolean }) => css`
    filter: ${!theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
  `};
  width: 100%;
  display: flex;
  justify-content: flex-start;
  > div {
    background: #2e2e2e;
    padding: 16px;
    margin-left: 24px;
    border-radius: 10px;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const TextWrapper = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  display: flex;
  height: fit-content;
  align-items: flex-end;
  > * {
    line-height: 1;
  }
  > :first-child {
    margin-right: 5px;
  }
`;

export const WalletItem = styled.div`
  border-radius: 6px;
  border: 2px #555555 solid;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
