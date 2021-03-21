import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp } from './style';
import { QuickMenu } from '../QuickMenu';
import store from '../../store';
import { UIStyle } from '~/renderer/mixins/default-styles';
import { ipcRenderer, remote } from 'electron';

export const App = observer(() => {
  React.useEffect(() => {
    window.onblur = () => {
      ipcRenderer.send(`dialog-blur-${remote.getCurrentWebContents().id}`);
    };
  }, []);
  return (
    <ThemeProvider
      theme={{ ...store.theme, dark: store.theme['dialog.lightForeground'] }}
    >
      <StyledApp>
        <UIStyle />
        <QuickMenu />
      </StyledApp>
    </ThemeProvider>
  );
});
