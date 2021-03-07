import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ThemeProvider } from 'styled-components';
import { Wrapper } from './style';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import { ipcRenderer } from 'electron';
import { fixed } from '~/utils/Big';

const testClickHandler = () => {
  console.log('testClickHandle');
  ipcRenderer.invoke(
    'wallet-send-funds',
    {
      id: '1',
      confirmationRequest: 'test confirmation request',
      requestTarget: 'tester',
      logo: 'img',
    },
    10,
  );
};

export default observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <div>
        <WebUIStyle />

        <Wrapper fullSize={true}>
          <h1>Point Wallet</h1>
          <div>
            <p>Funds: {fixed(store.funds, 1)}</p>
            <p>address: {store.address}</p>
            <button onClick={testClickHandler}>Test send 10 POINT</button>
          </div>
        </Wrapper>
      </div>
    </ThemeProvider>
  );
});
