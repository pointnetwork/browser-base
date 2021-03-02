import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp, Wrapper, Title } from './style';
import store from '../../store';
import { UIStyle } from '~/renderer/mixins/default-styles';

export const App = observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp visible>
        <Wrapper>
          <Title>
            <h1>Confirmation Area</h1>
          </Title>
          <section>Display Confirmation info</section>
        </Wrapper>
        <UIStyle />
      </StyledApp>
    </ThemeProvider>
  );
});
