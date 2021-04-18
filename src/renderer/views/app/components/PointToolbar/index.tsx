import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { StyledToolbar, StyledToolbarWrapper, PointAmount } from './style';
import {
  ICON_DRIVE,
  ICON_MESSAGING,
  ICON_SOCIAL,
  ICON_WALLET,
  ICON_NOTIFICATION,
  ICON_CONFIRMATION,
  ICON_TERMINAL,
} from '~/renderer/constants';
import store from '~/renderer/views/app/store';
import { ToolbarButton } from '~/renderer/views/app/components/ToolbarButton';
import { ipcRenderer } from 'electron';
import { getWebUIURL } from '~/common/webui';
import { fixed } from '~/utils/Big';
import { formatNumber } from '~/utils/format';
import { WalletStore } from '~/renderer/views/app/store/wallet';

const setTabUrl = (url: string) => {
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
  const wallet = store.forkStore as WalletStore;
  return (
    <StyledToolbarWrapper>
      <StyledToolbar>
        <PointAmount>
          {wallet.address === '' ? (
            <p>-</p>
          ) : (
            <>
              <h2>{formatNumber(fixed(wallet.funds, 0))}</h2>
              <p>POINT</p>
            </>
          )}
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
          onMouseDown={goToWebUIPage('console')}
          disabled={false}
          size={16}
          icon={ICON_TERMINAL}
        />
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
