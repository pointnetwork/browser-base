import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp, Wrapper } from './style';
import store from '../../store';
import { UIStyle } from '~/renderer/mixins/default-styles';

export const App = observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp visible>
        <Wrapper>
          <p>a wrapper</p>
        </Wrapper>
        <UIStyle />
      </StyledApp>
    </ThemeProvider>
  );
});
