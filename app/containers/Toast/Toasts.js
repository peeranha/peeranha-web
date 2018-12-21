import React from 'react';
import PropTypes from 'prop-types';

import Toast from './Toast';
import ToastBox from './ToastBox';
import toastTypes from './toastTypes';

const Toasts = props => (
  <ToastBox location={props.location}>
    {props.toasts.map(item => (
      <Toast
        type={item.type}
        key={item.toastKey}
        data-key={item.toastKey}
        onClick={props.removeToast}
      >
        <div className="status">
          <img src={toastTypes[item.type].icon} alt="status" />
        </div>
        <div className="content">{item.text}</div>
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
