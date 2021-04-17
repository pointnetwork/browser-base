import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ThemeProvider } from 'styled-components';
import { Wrapper } from './style';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import { ipcRenderer } from 'electron';
import { fixed } from '~/utils/Big';
import Txs from '../Txs';
import { formatNumber } from '~/utils/format';

const testClickHandler = () => {
  ipcRenderer.invoke(
    'wallet-send-funds',
    {
      confirmationRequest: 'test confirmation request',
      requestTarget: 'tester',
      logo: 'img',
      windowId: ipcRenderer.sendSync('get-window-id'), //  dummy value
    },
    10,
  );
};

export default observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <header>
        <title>Point Wallet</title>
      </header>
      <div>
        <WebUIStyle />

        <Wrapper fullSize={true}>
          <h1>Point Wallet</h1>
          <div>
            <p>Funds: {formatNumber(fixed(store.funds, 0))}</p>
            <p>address: {store.address}</p>
            <button onClick={testClickHandler}>Test send 10 POINT</button>
          </div>
          <Txs />
        </Wrapper>
      </div>
    </ThemeProvider>
  );
});
