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
import { IConfirmation, ITxObj } from '~/interfaces/confirmation';

const testClickHandler = () => {
  ipcRenderer.invoke('wallet-send-funds', {
    link: window.location.href,
    confirmationRequest: 'test confirmation request',
    requestTarget: 'tester',
    logo: 'img',
    txObj: {
      amount: 10,
      address: '0xC01011611e3501C6b3F6dC4B6d3FE644d21aB301',
    },
    windowId: ipcRenderer.sendSync('get-window-id'), //  dummy value
  } as IConfirmation);
};

const sendClickHandler = (inputs: ITxObj) => {
  ipcRenderer.invoke('wallet-send-funds', {
    link: window.location.href,
    confirmationRequest: 'test confirmation request',
    requestTarget: 'tester',
    logo: 'img',
    txObj: {
      amount: inputs.amount,
      address: inputs.address,
    },
    windowId: ipcRenderer.sendSync('get-window-id'), //  dummy value
  } as IConfirmation);
};
export default observer(() => {
  const [inputs, setInputs] = React.useState({ address: '', amount: '' });

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
          <div className="inputs-wrapper">
            <h6>Send Funds</h6>
            <p>Address</p>
            <textarea
              placeholder={'Address'}
              value={inputs.address}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setInputs((prevState) => {
                  return {
                    ...prevState,
                    address: value,
                  };
                });
              }}
            />
            <p>Amount</p>
            <input
              placeholder={'Amount'}
              value={inputs.amount}
              onChange={(e) => {
                const value = e.currentTarget.value;
                setInputs((prevState) => ({
                  ...prevState,
                  amount: value,
                }));
              }}
            />
            <button
              onClick={() =>
                sendClickHandler({
                  amount: Number(inputs.amount),
                  address: inputs.address,
                })
              }
            >
              Send Point
            </button>
          </div>
          <Txs />
        </Wrapper>
      </div>
    </ThemeProvider>
  );
});
