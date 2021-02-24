import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';

export const NotificationWrapper = styled.div`
  ${({ theme }: { icon?: string; theme?: ITheme; imageSet?: boolean }) => css`
    filter: ${!theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
  `};
  background-color: rgba(32, 32, 32, 0.95);
  width: calc(100% - 10px);
  padding: 4px;
  border: 2px #444 solid;
  border-radius: 10px;
  max-height: 200px;
  min-height: fit-content;
  overflow-y: auto;
  > .notification-top {
    display: flex;
    justify-content: space-between;
    > .notification-title-area {
      display: flex;
      align-items: center;
      padding: 4px 0;
      ${({
        theme,
      }: {
        icon?: string;
        theme?: ITheme;
        imageSet?: boolean;
      }) => css`
        filter: ${!theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
      `};
      > :first-child {
        border-radius: 100%;
        width: 24px;
        height: 24px;
        object-fit: contain;
        margin-right: 5px;
      }
      > .notification-title {
        font-size: 14px;
      }
    }
    > .notification-time {
      ${({
        theme,
      }: {
        icon?: string;
        theme?: ITheme;
        imageSet?: boolean;
      }) => css`
        filter: ${!theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
      `};
      align-self: flex-start;
      padding: 8px 4px 4px;
      > p {
        font-size: 10px;
      }
    }
  }
  > .notification-contents {
    ${({ theme }: { icon?: string; theme?: ITheme; imageSet?: boolean }) => css`
      filter: ${!theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
    `};
    padding: 8px;
    margin-top: 10px;
    margin-bottom: 10px;
    > p {
      font-size: 12px;
      font-family: sans-serif;
    }
  }
`;
