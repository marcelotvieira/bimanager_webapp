import { NotificationInstance, NotificationPlacement } from 'antd/es/notification/interface';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

type Props = {
  api: NotificationInstance;
  type: NotificationType
  info: {
    message: string,
    description: string,
    placement: NotificationPlacement,
  }
}


export const openNotification = ({api, info, type}: Props) => {
  api[type](info);
};

