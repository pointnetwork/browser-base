import * as React from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { NotificationWrapper, CloseNotificationButtonWrapper } from './style';
import { Icon } from '~/renderer/views/app/components/ToolbarButton/style';
import { ICON_CLOSE_X } from '~/renderer/constants';
import { REMOVE_ANIM_MS } from './style';

export const Notification = observer(
  ({
    title,
    icon,
    message,
    removeSelf,
  }: {
    title: string;
    icon: string;
    message: string;
    removeSelf: () => void;
  }) => {
    const [removed, setRemoved] = React.useState(false);
    const [removeUp, setRemoveUp] = React.useState(false);

    React.useEffect(() => {
      if (!removed) return null;
      const timeout = setTimeout(() => setRemoveUp(true), REMOVE_ANIM_MS);
      return () => clearTimeout(timeout);
    }, [removed]);

    React.useEffect(() => {
      if (!removeUp) return null;
      const timeout = setTimeout(() => removeSelf(), REMOVE_ANIM_MS);
      return () => clearTimeout(timeout);
    }, [removeUp]);

    return (
      <NotificationWrapper className={cn({ removeUp })}>
        <div className="overflow-wrapper">
          <div className={cn('wrapper', { removed })}>
            <div className="notification-top">
              <div className="notification-title-area">
                <Icon
                  size={20}
                  disabled={false}
                  opacity={100}
                  autoInvert={true}
                  style={{ backgroundImage: `url(${icon}` }}
                />
                <h4 className="notification-title">{title}</h4>
              </div>
              <div className="notification-time">
                <p>Just Now</p>
              </div>
            </div>
            <div className="notification-contents">
              <p>{message}</p>
            </div>
          </div>
        </div>
        <CloseNotificationButtonWrapper>
          <button
            onMouseDown={() => setRemoved(true)}
            style={{ backgroundImage: `url(${ICON_CLOSE_X}` }}
          />
        </CloseNotificationButtonWrapper>
      </NotificationWrapper>
    );
  },
);
