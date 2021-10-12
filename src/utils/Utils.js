import { notification } from 'antd';

export const errorNotif = (message) => {
  notification['error']({
    message: 'Error',
    description: message,
  });
};

export const successNotif = (message) => {
  notification['success']({
    message: 'Success',
    description: message,
  });
};