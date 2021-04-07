import * as React from 'react';
import { observer } from 'mobx-react-lite';
import * as moment from 'dayjs';

import { IFileProgress } from '../../store/data';
import { TerminalContainer, LogItem } from './style';
import store from '../../store';

const Terminal = observer(() => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  // React.useEffect(() => {
  //   store.dataStore.test();
  // }, []);

  React.useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [store.logQueue.length]);

  return (
    <TerminalContainer ref={ref}>
      <ul>
        {store.logQueue.map((v) => {
          return (
            <LogItem key={v.id}>
              <p className="timestamp">
                [{moment(v.timestamp).format('hh:mm:ss')}]
              </p>
              <p className="content">{v.content}</p>
            </LogItem>
          );
        })}
      </ul>
    </TerminalContainer>
  );
});

export default Terminal;
