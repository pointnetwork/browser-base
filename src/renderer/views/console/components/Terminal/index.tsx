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
              {typeof v.content === 'string' ? (
                <p className="content">{v.content}</p>
              ) : (
                <div className="content multiline">
                  {v.content?.map((data, k) => (
                    <DisplayProgress key={k} data={data} />
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
const PROGRESS_HEIGHT = 16;
const DisplayProgress = ({ data }: { data: IFileProgress }) => {
  return (
    <>
      {data.progress === 100 ? (
        <span>
          {data.filename} - {data.status}
        </span>
      ) : (
        <>
          <p>
            {data.filename} - {data.status}
          </p>
          <ProgressBar percent={data.progress} />
        </>
      )}
    </>
  );
};

const ProgressBar = ({ percent }: { percent: number }) => {
  return (
    <div
      className="progress"
      style={{
        width: '100%',
        position: 'relative',
        height: `${PROGRESS_HEIGHT}px`,
        border: '1px solid white',
      }}
    >
      <div
        style={{
          width: `${percent}%`,
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          backgroundColor: '#666',
        }}
      >
        <p>{percent}%</p>
      </div>
    </div>
  );
};

export default Terminal;
