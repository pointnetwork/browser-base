import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ThemeProvider } from 'styled-components';
import { Wrapper } from './style';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import Terminal from '~/renderer/views/console/components/Terminal';

export default observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <div>
        <WebUIStyle />
        <Wrapper fullSize={true}>
          <h1>Console</h1>
          <Terminal />
        </Wrapper>
      </div>
    </ThemeProvider>
  );
});
