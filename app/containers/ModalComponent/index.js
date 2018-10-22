/**
 *
 * ModalComponent
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable react/prefer-stateless-function */
export class ModalComponent extends React.Component {
  render = () => (
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
        style={{ marginTop: '-25px' }}
      >
        <div className="modal-content">
          {React.Children.only(this.props.children)}
        </div>
      </div>
    </div>
  );
}

ModalComponent.propTypes = {
  modalId: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};

export default ModalComponent;
