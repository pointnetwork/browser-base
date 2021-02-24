import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ThemeProvider } from 'styled-components';

import { StyledApp } from './style';
import store from '../../store';
import { ipcRenderer } from 'electron';
import { UIStyle } from '~/renderer/mixins/default-styles';
import { Notification } from '../Notification';
import { ICON_MESSAGING, ICON_SEARCH } from '~/renderer/constants';

export const App = observer(() => {
  return (
    <ThemeProvider theme={{ ...store.theme }}>
      <StyledApp style={{ minHeight: '100vh' }} visible>
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'This demo is slick'}
        />
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'Point Browser should be great'}
        />
        <Notification
          title={'Search'}
          icon={ICON_SEARCH}
          message={'Your search results have returned'}
        />
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'This demo is slick'}
        />
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'This demo is slick'}
        />
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'This demo is slick'}
        />
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'This demo is slick'}
        />
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'This demo is slick'}
        />
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'This demo is slick'}
        />
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'This demo is slick'}
        />
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'This demo is slick'}
        />
        <Notification
          title={'Message'}
          icon={ICON_MESSAGING}
          message={'This demo is slick'}
        />
        <UIStyle />
      </StyledApp>
    </ThemeProvider>
  );
});
