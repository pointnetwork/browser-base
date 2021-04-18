import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { FileProgressContainer } from './style';
import { LogItem } from '~/renderer/views/console/components/Terminal/style';

import store from '../../store';
import * as moment from 'dayjs';
import { IFileProgress } from '~/renderer/views/console/store/data';

const FileProgress = observer(() => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const item =
    store.progressQueue.length > 0
      ? store.progressQueue[store.progressQueue.length - 1]
      : null;

  React.useEffect(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
  }, [store.progressQueue.length]);
  return (
    <FileProgressContainer ref={ref}>
      <ul>
        {item && (
          <LogItem>
            <p className="timestamp">
              [{moment(item.timestamp).format('hh:mm:ss')}]
            </p>
            <div className="content multiline">
              {item.data?.map((data, k) => (
                <DisplayProgress key={k} data={data} />
              ))}
            </div>
          </LogItem>
        )}
      </ul>
    </FileProgressContainer>
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

export default FileProgress;
