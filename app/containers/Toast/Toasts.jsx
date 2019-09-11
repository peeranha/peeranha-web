import React from 'react';
import PropTypes from 'prop-types';

import Toast from './Toast';
import ToastBox from './ToastBox';
import toastTypes from './toastTypes';

const Toasts = ({ location, toasts, removeToast }) => (
  <ToastBox location={location}>
    {toasts.map(item => (
      <Toast
        type={item.type}
        key={item.toastKey}
        data-key={item.toastKey}
        onClick={removeToast}
      >
        <img className="mr-3" src={toastTypes[item.type].icon} alt="status" />
        <span className="flex-grow-1">{item.text}</span>
      </Toast>
    ))}
  </ToastBox>
);

Toasts.propTypes = {
  location: PropTypes.string,
  toasts: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  removeToast: PropTypes.func,
};

export default Toasts;
