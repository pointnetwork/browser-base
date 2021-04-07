import { TitleWrapper } from './style';
import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

export default function Title({
  showConsole,
  setShowConsole,
}: {
  showConsole: boolean;
  setShowConsole: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <TitleWrapper>
      <h1>{showConsole ? 'Console' : 'File Status'}</h1>
      <div className="tab">
        <button onClick={() => setShowConsole((v) => !v)}>
          <p>Switch View</p>
        </button>
      </div>
    </TitleWrapper>
  );
}
