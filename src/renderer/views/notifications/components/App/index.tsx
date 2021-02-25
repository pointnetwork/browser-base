import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp } from './style';
import store from '../../store';
import { UIStyle } from '~/renderer/mixins/default-styles';
import { Notifications } from '~/renderer/views/notifications/components/Notifications';

export const App = observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp style={{ minHeight: '100vh' }} visible>
        <Notifications />
        <UIStyle />
      </StyledApp>
    </ThemeProvider>
  );
});
