/**
 *
 * Modal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import { closeModalWindow } from './actions';
import { makeSelectContent, makeSelectModalSize } from './selectors';
import reducer from './reducer';
import { MODAL_ID } from './constants';

/* eslint-disable react/prefer-stateless-function */
export class Modal extends React.Component {
  componentWillUnmount = () => {
    this.props.closeModalWindowDispatch();
  };

  render() {
    const { content } = this.props;

    return (
      <div
        id={MODAL_ID}
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
          <div className="modal-content">{content}</div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  content: PropTypes.string.isRequired,
  closeModalWindowDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  modalSize: makeSelectModalSize(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    closeModalWindowDispatch: () => dispatch(closeModalWindow()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'modal', reducer });

export default compose(
  withReducer,
  withConnect,
)(Modal);
