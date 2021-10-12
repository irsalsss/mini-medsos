import { notification } from 'antd';
import qs from 'qs';

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

export const urlToParams = (url) => {
  return qs.parse(url, { ignoreQueryPrefix: true })
}