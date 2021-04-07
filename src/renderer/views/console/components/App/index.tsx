import * as React from 'react';
import { observer } from 'mobx-react-lite';

import store from '../../store';
import { ThemeProvider } from 'styled-components';
import { Wrapper } from './style';
import { WebUIStyle } from '~/renderer/mixins/default-styles';
import Terminal from '~/renderer/views/console/components/Terminal';
import Title from '~/renderer/views/console/components/Title';
import FileProgress from '~/renderer/views/console/components/FileProgress';

export default observer(() => {
  const [showConsole, setShowConsole] = React.useState<boolean>(true);
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <header>
        <title>Point Console</title>
      </header>
      <div>
        <WebUIStyle />
        <Wrapper fullSize={true}>
          <Title showConsole={showConsole} setShowConsole={setShowConsole} />
          {showConsole ? <Terminal /> : <FileProgress />}
        </Wrapper>
      </div>
    </ThemeProvider>
  );
});
