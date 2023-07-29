import React from 'react';
import ToastMessage, {BaseToastProps} from 'react-native-toast-message';
import Toast from '../components/Toast';
import {ToastType} from '../components/Toast/Toast';

const toastConfig = {
  success: (prop: BaseToastProps) => (
    <Toast
      title={prop.text1}
      description={prop.text2}
      type={ToastType.SUCCESS}
    />
  ),
  error: (prop: BaseToastProps) => (
    <Toast title={prop.text1} description={prop.text2} type={ToastType.ERROR} />
  ),
  warn: (prop: BaseToastProps) => (
    <Toast title={prop.text1} description={prop.text2} type={ToastType.WARN} />
  ),
};
//ref={ref => ToastMessage.setRef(ref)}
export const ToastProvider = (): JSX.Element => {
  return <ToastMessage topOffset={0} config={toastConfig} />;
};

export default ToastProvider;
