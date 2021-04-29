import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import store from '../../store';
import { TxList, Wrapper } from './style';
import { ITxData } from '~/main/fork/point/services/wallet/wallet';

export default observer(() => {
  console.log(toJS(store.txArr));
  return (
    <Wrapper>
      <h2>Transcation list</h2>
      <TxList>
        {toJS(store.txArr).map((v: ITxData) => (
          <li style={{ marginBottom: '5px' }} key={v.transactionHash}>
            <p>{v.transactionHash}</p>
            {v.from !== store.address ? (
              <p>
                {'to: '}
                {v.to}
              </p>
            ) : (
              <p>
                {'from: '}
                {v.from}
              </p>
            )}
            <p>amount: {v.value} POINT</p>
          </li>
        ))}
      </TxList>
    </Wrapper>
  );
});
