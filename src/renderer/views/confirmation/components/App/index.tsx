import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp, Wrapper, Title } from './style';
import store from '../../store';
import { UIStyle } from '~/renderer/mixins/default-styles';

const onConfirm = () => {
  store.confirmCurrent();
};
const onReject = () => {
  store.rejectCurrent();
};

export const App = observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp visible>
        <Wrapper>
          <Title>
            <h1>Confirmation Area</h1>
          </Title>
          <section>Display Confirmation info</section>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onReject}>reject</button>
        </Wrapper>
        <UIStyle />
      </StyledApp>
    </ThemeProvider>
  );
});
