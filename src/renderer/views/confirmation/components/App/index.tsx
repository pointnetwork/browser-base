import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp, Wrapper, Title } from './style';
import store from '../../store';
import { UIStyle } from '~/renderer/mixins/default-styles';
import { ITxObj } from '~/interfaces/confirmation';
import { TxObjWrapper } from './style';

const onConfirm = () => {
  store.confirmCurrent();
};
const onReject = () => {
  store.rejectCurrent();
};

export const App = observer(() => {
  const confirmObj = store.getCurrentConfirmation();
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp visible>
        <Wrapper>
          <Title>
            <h1>Confirmation Area</h1>
          </Title>
          <div>
            {confirmObj.id} - {confirmObj.confirmationRequest}
          </div>
          <div>RequestTarget - {confirmObj.requestTarget}</div>
          <DisplayTxObj txObj={confirmObj.txObj} />
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onReject}>reject</button>
        </Wrapper>
        <UIStyle />
      </StyledApp>
    </ThemeProvider>
  );
});

// TODO : no idea why I have to add eslint disable to the below lines
const DisplayTxObj: React.FunctionComponent<Record<'txObj', ITxObj>> = ({
  // eslint-disable-next-line react/prop-types
  txObj,
}) => {
  return (
    <TxObjWrapper>
      {/* eslint-disable-next-line react/prop-types */}
      <p>Address: {txObj.address}</p>
      {/* eslint-disable-next-line react/prop-types */}
      <p>Amount: {txObj.amount} POINT</p>
    </TxObjWrapper>
  );
};
