import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { StyledToolbar, PointToolIcon, PointAmount } from './style';
import { Icon } from '../ToolbarButton/style';
import {
  ICON_BACK,
  ICON_DRIVE,
  ICON_MESSAGING,
  ICON_SOCIAL,
  ICON_WALLET,
} from '~/renderer/constants';
import store from '~/renderer/views/app/store';
import { ToolbarButton } from '~/renderer/views/app/components/ToolbarButton';
import { ipcRenderer } from 'electron';
import { getWebUIURL } from '~/common/webui';

const addNewTab = (url: string) => {
  console.log('addNewTab', url);
  ipcRenderer.send(`add-tab-${store.windowId}`, {
    url,
    active: true,
  });
};

const goToWebUIPage = (name: string) => () => {
  addNewTab(getWebUIURL(name));
};

export const PointToolbar = observer(() => {
  return (
    <StyledToolbar>
      <PointAmount>
        <h2>100.00</h2>
        <p>PN</p>
      </PointAmount>
      <ToolbarButton
        onClick={goToWebUIPage('wallet')}
        disabled={false}
        size={16}
        icon={ICON_WALLET}
        style={{ marginLeft: 6 }}
      />
      <ToolbarButton
        disabled={false}
        size={16}
        icon={ICON_DRIVE}
        style={{ marginLeft: 6 }}
      />
      <ToolbarButton
        disabled={false}
        size={16}
        icon={ICON_SOCIAL}
        style={{ marginLeft: 6 }}
      />
      <ToolbarButton
        disabled={false}
        size={16}
        icon={ICON_MESSAGING}
        style={{ marginLeft: 6 }}
      />
    </StyledToolbar>
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
