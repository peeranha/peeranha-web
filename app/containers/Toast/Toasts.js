import React from 'react';
import PropTypes from 'prop-types';
import Toast from './Toast';
import ToastBox from './ToastBox';

const Toasts = props => (
  <ToastBox location={props.location}>
    {props.toasts.map(item => (
      <Toast
        type={item.type}
        key={item.toastKey}
        data-key={item.toastKey}
        onClick={props.removeToast}
      >
        {item.text}
      </Toast>
    ))}
  </ToastBox>
);

Toasts.propTypes = {
  location: PropTypes.string,
  toasts: PropTypes.array,
  removeToast: PropTypes.func,
};

export default Toasts;
