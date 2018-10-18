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
import $ from 'jquery';

import injectReducer from 'utils/injectReducer';
import { makeSelectContent, makeSelectModalSize } from './selectors';
import reducer from './reducer';

/* eslint-disable react/prefer-stateless-function */
export class Modal extends React.Component {
  componentDidUpdate() {
    $('#modalWindow').modal('show');
  }

  componentWillUnmount = () => {
    $('#modalWindow').modal('hide');
  };

  render() {
    const { content, modalSize } = this.props;

    return (
      <div
        id="modalWindow"
        className={`modal fade bd-example-modal-${modalSize}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className={`modal-dialog modal-${modalSize}`}>
          <div className="modal-content">{content}</div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  content: PropTypes.string.isRequired,
  modalSize: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  content: makeSelectContent(),
  modalSize: makeSelectModalSize(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
