import * as React from 'react';
import { observer } from 'mobx-react-lite';
import * as moment from 'dayjs';

import { TerminalContainer, LogItem } from './style';
import store from '../../store';

const Terminal = observer(() => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  React.useEffect(() => {
    store.dataStore.test();
  }, []);

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
              {typeof v.content === 'string' ? (
                <p className="content">{v.content}</p>
              ) : (
                <div className="content multiline">
                  {v.content.map((logLine, k) => (
                    <p key={k}>{logLine}</p>
                  ))}
                </div>
              )}
            </LogItem>
          );
        })}
      </ul>
    </TerminalContainer>
  );
});
export default Terminal;
