/**
 *
 * ModalDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import ModalWrapper from './ModalWrapper';

/* eslint-disable react/prefer-stateless-function */
export class ModalDialog extends React.Component {
  componentDidUpdate = () => {
    const { modalId, show, closeModal } = this.props;

    if (modalId && show) {
      window.$(`#${modalId}`).modal(show);
    }

    window.$(`#${modalId}`).on('hide.bs.modal', () => {
      closeModal();
    });
  };

  render = () => {
    const dialogPosition = { marginTop: '-25px' };

    return (
      <div
        id={this.props.modalId}
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          style={dialogPosition}
        >
          <div className="modal-content">
            <ModalWrapper>
              {React.Children.only(this.props.children)}
            </ModalWrapper>
          </div>
        </div>
      </div>
    );
  };
}

ModalDialog.propTypes = {
  modalId: PropTypes.string.isRequired,
  show: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.object.isRequired,
};

export default ModalDialog;
