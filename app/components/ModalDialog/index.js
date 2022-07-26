/* eslint no-empty: 0, no-unused-expressions: 0 */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { TEXT_SECONDARY_LIGHT } from 'style-constants';
import CloseIcon from 'icons/Close';

import ModalStyled from './ModalStyled';
import Blanket from './Blanket';

export const modalRoot = document.getElementById('modal');
export const el = document.createElement('div');

export const ModalDialog = ({ children, show, closeModal }) => {
  useEffect(
    () => {
      try {
        if (show && modalRoot.childElementCount === 0) {
          document.getElementsByTagName('body')[0].style.position = 'fixed';
          modalRoot.appendChild(el);
        } else if (!show && modalRoot.childElementCount !== 0) {
          document.getElementsByTagName('body')[0].style.position = 'relative';
          modalRoot.removeChild(el);
        }
      } catch (err) {}
    },
    [show],
  );

  if (!show) return null;

  return ReactDOM.createPortal(
    <React.Fragment>
      <ModalStyled>
        <div className="d-flex justify-content-end">
          <CloseIcon
            fill={TEXT_SECONDARY_LIGHT}
            size={[16, 16]}
            onClick={closeModal}
          />
        </div>
        <div className="modal-children">{children}</div>
      </ModalStyled>
      <Blanket onClick={closeModal} />
    </React.Fragment>,
    el,
  );
};

ModalDialog.propTypes = {
  show: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.any,
};

export default React.memo(ModalDialog);
