import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { ICON_MESSAGING, ICON_SEARCH } from '~/renderer/constants';
import { Notification } from '~/renderer/views/notifications/components/Notification';
import { ipcRenderer } from 'electron';
import { getCurrentWindow } from '~/renderer/views/app/utils/windows';

const getWebContentsId = () => ipcRenderer.sendSync('get-webcontents-id');

interface notification {
  title: string;
  icon: string;
  message: string;
  index: number | null;
}

//  for demo purposes
const messageNoti = {
  title: 'Message',
  icon: ICON_MESSAGING,
  message: 'This demo is slick',
  index: null,
};
const defaultNotificationArray = [
  { ...messageNoti },
  {
    title: 'Message',
    icon: ICON_MESSAGING,
    message: 'Point Browser should be great',
  },
  {
    title: 'Search',
    icon: ICON_SEARCH,
    message: 'Your search results have returned',
  },
  ...Array(10).fill(messageNoti),
];

// TODO
//  move all this logic into MobX store

export const Notifications = observer(() => {
  const [notificationArray, setNotificationArray] = React.useState(
    [...defaultNotificationArray].map((value: notification, i) => ({
      ...value,
      index: i,
    })),
  );

  const removeNotification = React.useCallback((index) => {
    setNotificationArray((prevValue: notification[]) => {
      return prevValue.filter((value) => value.index !== index);
    });
  }, []);

  React.useEffect(() => {
    if (notificationArray.length > 0) return;
    ipcRenderer.send(`hide-${getWebContentsId()}`);
  }, [notificationArray]);
  return (
    <>
      {notificationArray.map((v: notification) => {
        return (
          <Notification
            key={v.index}
            icon={v.icon}
            message={v.message}
            title={v.title}
            removeSelf={() => removeNotification(v.index)}
          />
        );
      })}
    </>
  );
});
