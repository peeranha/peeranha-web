/**
 *
 * ModalDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ModalWrapper from './ModalWrapper';

/* istanbul ignore next */
const Box = styled.div`
  .modal-content {
    overflow: hidden;
  }

  .modal-custom-position {
    position: absolute;
    top: ${({ customPosition }) => customPosition && customPosition.top}px;
    left: ${({ customPosition }) => customPosition && customPosition.left}px;
    margin: 0;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class ModalDialog extends React.Component {
  componentDidUpdate = () => {
    const { closeModal, show } = this.props;

    window.$(`#${this.modalId}`).modal(this.modalShow(show));
    window.$(`#${this.modalId}`).on('hide.bs.modal', closeModal);

    return true;
  };

  modalShow = show => (show && 'show') || (!show && 'hide');

  /* eslint no-underscore-dangle: 1 */
  render = /* istanbul ignore next */ () => {
    const position =
      !this.props.customPosition || window.innerWidth < 1000
        ? 'modal-dialog-centered'
        : 'modal-custom-position';

    this.modalId = Object.getPrototypeOf(
      this._reactInternalFiber.return.stateNode || 'Modal',
    ).constructor.name;

    return (
      <Box
        id={this.modalId}
        className="modal fade"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
        customPosition={this.props.customPosition}
      >
        <div className={`modal-dialog ${position}`}>
          <div className="modal-content">
            <ModalWrapper>
              {React.Children.only(this.props.children)}
            </ModalWrapper>
          </div>
        </div>
      </Box>
    );
  };
}

ModalDialog.propTypes = {
  show: PropTypes.bool,
  customPosition: PropTypes.object,
  closeModal: PropTypes.func,
  children: PropTypes.element,
};

export default ModalDialog;
