import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { TerminalContainer } from './style';
import store from '../../store';

export default observer(() => {
  return <TerminalContainer></TerminalContainer>;
});
