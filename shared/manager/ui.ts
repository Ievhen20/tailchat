import { buildRegFn } from './buildRegFn';

/**
 * 通用UI api设置
 */

type ToastsType = 'info' | 'success' | 'error' | 'warning';
export const [showToasts, setToasts] =
  buildRegFn<(message: string, type?: ToastsType) => void>('toasts');

/**
 * 一个封装方法, 用于直接抛出错误
 * @param error 错误信息
 */
export function showErrorToasts(error: Error) {
  let msg = '';
  if (error instanceof Error) {
    msg = error.message;
  } else {
    msg = String(error);
  }

  showToasts(msg, 'error');
}

interface AlertOptions {
  message: React.ReactNode;
  onConfirm?: () => void | Promise<void>;
}
export const [showAlert, setAlert] =
  buildRegFn<(options: AlertOptions) => void>('alert');
