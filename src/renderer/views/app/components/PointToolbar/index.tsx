import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { StyledToolbar, StyledToolbarWrapper, PointAmount } from './style';
import {
  ICON_DRIVE,
  ICON_MESSAGING,
  ICON_SOCIAL,
  ICON_WALLET,
  ICON_NOTIFICATION,
} from '~/renderer/constants';
import store from '~/renderer/views/app/store';
import { ToolbarButton } from '~/renderer/views/app/components/ToolbarButton';
import { ipcRenderer } from 'electron';
import { getWebUIURL } from '~/common/webui';

const setTabUrl = (url: string) => {
  console.log('setTabData', url);
  ipcRenderer.send(`set-tab-${store.windowId}`, {
    url,
    active: true,
  });
};

const goToWebUIPage = (name: string) => () => {
  setTabUrl(getWebUIURL(name));
};

const onNotificationClick = async (e: React.MouseEvent<HTMLDivElement>) => {
  const { right, bottom } = e.currentTarget.getBoundingClientRect();
  ipcRenderer.send(
    `show-notifications-dialog-${store.windowId}`,
    right, //  5 for padding
    bottom,
  );
};

export const PointToolbar = observer(() => {
  return (
    <StyledToolbarWrapper>
      <StyledToolbar>
        <PointAmount>
          <h2>100.00</h2>
          <p>POINT</p>
        </PointAmount>
        <ToolbarButton
          onClick={goToWebUIPage('wallet')}
          disabled={false}
          size={16}
          icon={ICON_WALLET}
          style={{ marginLeft: 6 }}
        />
        <ToolbarButton
          onClick={goToWebUIPage('storage')}
          disabled={false}
          size={16}
          icon={ICON_DRIVE}
          style={{ marginLeft: 6 }}
        />
        <ToolbarButton
          disabled={true}
          size={16}
          icon={ICON_SOCIAL}
          style={{ marginLeft: 6 }}
        />
        <ToolbarButton
          onClick={goToWebUIPage('messaging')}
          disabled={false}
          size={16}
          icon={ICON_MESSAGING}
          style={{ marginLeft: 6 }}
        />
      </StyledToolbar>
      <StyledToolbar>
        <ToolbarButton
          toggled={store.dialogsVisibility['notifications']}
          onMouseDown={onNotificationClick}
          disabled={false}
          size={16}
          icon={ICON_NOTIFICATION}
        />
      </StyledToolbar>
    </StyledToolbarWrapper>
  );
});

// const PointIcon = ({ src }: { src: string }) => {
//   return (
//     <PointToolIcon>
//       <Icon
//         autoInvert
//         disabled={false}
//         opacity={100}
//         size={20}
//         style={{
//           backgroundImage: `url(${src})`,
//           height: '20px',
//           width: '20px',
//         }}
//       />
//     </PointToolIcon>
//   );
// };
