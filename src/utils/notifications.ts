import { Notification, NotificationConstructorOptions } from 'electron';

export function showSimpleNotification(
  title: string,
  body: string,
  options?: Partial<NotificationConstructorOptions>,
  permenant?: boolean,
) {
  const notification = {
    title: title,
    body: body,
    silent: true,
    ...options,
  };
  const noti = new Notification(notification);
  noti.show();
  if (!permenant) {
    setTimeout(() => {
      noti.close();
    }, 5000);
  }
}
