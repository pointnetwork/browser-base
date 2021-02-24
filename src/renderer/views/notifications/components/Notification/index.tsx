import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { NotificationWrapper } from './style';
import { Icon } from '~/renderer/views/app/components/ToolbarButton/style';

export const Notification = observer(
  ({
    title,
    icon,
    message,
  }: {
    title: string;
    icon: string;
    message: string;
  }) => {
    return (
      <NotificationWrapper>
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
      </NotificationWrapper>
    );
  },
);
