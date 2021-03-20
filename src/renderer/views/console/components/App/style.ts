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
`;
