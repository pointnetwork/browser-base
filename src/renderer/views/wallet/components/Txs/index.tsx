import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import store from '../../store';
import { TxList, Wrapper } from './style';

export default observer(() => {
  console.log(toJS(store.txArr));
  return (
    <Wrapper>
      <h2>Transcation list</h2>
      <TxList>
        {toJS(store.txArr).map((v) => (
          <li key={v}>{v}</li>
        ))}
      </TxList>
    </Wrapper>
  );
});
