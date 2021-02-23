import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { StyledToolbar, PointToolIcon } from './style';
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

export const PointToolbar = observer(() => {
  return (
    <StyledToolbar>
      <ToolbarButton
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
