import styled, { css } from 'styled-components';
import { POINT_TOOLBAR_HEIGHT } from '~/constants/design';
import { ITheme } from '~/interfaces';

export const StyledToolbar = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  align-items: center;
  flex-flow: row;
  color: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: ${POINT_TOOLBAR_HEIGHT}px;
  padding: 5px;

  ${({ theme }: { theme: ITheme }) => css`
    background-color: ${theme['toolbar.backgroundColor']};
    border-bottom: 1px solid ${theme['toolbar.bottomLine.backgroundColor']};
  `};
`;

export const PointToolIcon = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 4px;
  > img {
    width: 20px;
    height: 20px;
  }
  &:not(first-child) {
    margin-left: 10px;
  }
`;

export const PointAmount = styled.div`
  margin-left: 4px;
  margin-right: 4px;
  display: flex;
  align-items: flex-end;
  padding: 4px 8px;
  color: white;
  border: 2px #ddd solid;
  border-radius: 12px;
  > h2 {
    font-size: 16px;
    margin-right: 2px;
  }
  > p {
    font-size: 11px;
  }
`;
