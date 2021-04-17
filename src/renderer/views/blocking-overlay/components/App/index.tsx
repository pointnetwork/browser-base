import * as React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../store';

import { Wrapper } from './style';

import { createOverlayCanvas } from '~/renderer/views/blocking-overlay/utils';

export default observer(() => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  React.useEffect(() => {
    if (!ref.current || store.screenDims.width === 0 || store.randomHash === '')
      return;
    const canvas = createOverlayCanvas(
      store.randomHash,
      store.screenDims.height,
      store.screenDims.width,
    );
    ref.current.appendChild(canvas);
  }, [store.screenDims, store.randomHash]);

  return <Wrapper ref={ref} />;
});
