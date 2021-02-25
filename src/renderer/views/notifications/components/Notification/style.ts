import styled, { css } from 'styled-components';
import { ITheme } from '~/interfaces';

export const REMOVE_ANIM_MS = 200;
export const NotificationWrapper = styled.div`
  position: relative;
  max-height: 100px;
  height: 100px;
  transition: all ${REMOVE_ANIM_MS}ms ease-in-out;
  &.removeUp {
    max-height: 0;
    margin-bottom: 0;
  }
  > .overflow-wrapper {
    position: relative;
    overflow-x: hidden;
    max-height: 100px;
    height: 100px;
    > .wrapper {
      transition: all ${REMOVE_ANIM_MS}ms ease-in-out;
      left: 0;
      &.removed {
        left: 200%;
      }

      ${({
        theme,
      }: {
        icon?: string;
        theme?: ITheme;
        imageSet?: boolean;
      }) => css`
        filter: ${!theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
      `};
      position: absolute;
      top: 0;
      background-color: rgba(32, 32, 32, 0.95);
      width: calc(100% - 10px);
      height: 100%;
      padding: 4px;
      border: 2px #444 solid;
      border-radius: 10px;
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
            filter: ${!theme['pages.lightForeground']
              ? 'invert(100%)'
              : 'none'};
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
            filter: ${!theme['pages.lightForeground']
              ? 'invert(100%)'
              : 'none'};
          `};
          align-self: flex-start;
          padding: 8px 4px 4px;
          > p {
            font-size: 10px;
          }
        }
      }
      > .notification-contents {
        ${({
          theme,
        }: {
          icon?: string;
          theme?: ITheme;
          imageSet?: boolean;
        }) => css`
          filter: ${!theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
        `};
        padding: 8px;
        display: flex;
        flex-flow: column;
        justify-contents: space-around;
        > p {
          font-size: 12px;
          font-family: sans-serif;
        }
      }
    }
  }
`;

export const CloseNotificationButtonWrapper = styled.div`
  position: absolute;
  z-index: 10;
  opacity: 0;
  left: -5px;
  top: -5px;
  transition: all 0.3s ease-in-out;
  &:hover {
    opacity: 100;
  }
  width: 20px;
  height: 20px;
  padding-bottom: 5px;
  padding-right: 5px;
  > button {
    cursor: pointer;
    ${({ theme }: { icon?: string; theme?: ITheme; imageSet?: boolean }) => css`
      filter: ${theme['pages.lightForeground'] ? 'invert(100%)' : 'none'};
    `};
    width: 15px;
    height: 15px;

    border-radius: 100%;
    border: 1px solid #999;
    display: flex;
    justify-items: center;
    align-items: center;

    background-color: #ddd;
  }
`;
