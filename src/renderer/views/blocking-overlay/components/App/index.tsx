import * as React from 'react';
import { observer } from 'mobx-react-lite';
import store from '../../store';

import { Wrapper } from './style';

import { createOverlayCanvas } from '~/renderer/views/blocking-overlay/utils';

const randomSeed =
  'E0E33413070B2EFF4E31E799A8951E28595494A64979DC4E35D9E2E355617360';

export default observer(() => {
  const ref = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  React.useEffect(() => {
    if (!ref.current || store.screenDims.width === 0) return;
    const canvas = createOverlayCanvas(
      randomSeed,
      store.screenDims.height,
      store.screenDims.width,
    );
    ref.current.appendChild(canvas);
  }, [store.screenDims]);

  return <Wrapper ref={ref} />;
});
