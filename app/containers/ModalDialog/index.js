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
    const { closeModal, show } = this.props;

    window.$(`#${this.modalId}`).modal(this.modalShow(show));
    window.$(`#${this.modalId}`).on('hide.bs.modal', closeModal);

    return true;
  };

  modalShow = show => (show && 'show') || (!show && 'hide');

  render = () => {
    /* eslint no-underscore-dangle: 1 */
    const dialogPosition = { marginTop: '-25px' };
    this.modalId = Object.getPrototypeOf(
      this._reactInternalFiber.return.stateNode,
    ).constructor.name;

    return (
      <div
        id={this.modalId}
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
  show: PropTypes.bool,
  closeModal: PropTypes.func,
  children: PropTypes.object,
};

export default ModalDialog;
