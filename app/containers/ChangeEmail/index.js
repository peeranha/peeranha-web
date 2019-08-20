/**
 *
 * ChangeEmail
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Modal from 'components/ModalDialog';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import ChangeEmailForm from './ChangeEmailForm';

import {
  changeEmail,
  showChangeEmailModal,
  hideChangeEmailModal,
} from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ChangeEmail extends React.PureComponent {
  render() {
    const {
      changeEmailDispatch,
      hideChangeEmailModalDispatch,
      children,
      showChangeEmailModalDispatch,
      showModal,
      changeEmailProcessing,
      locale,
    } = this.props;

    return (
      <React.Fragment>
        <Modal show={showModal} closeModal={hideChangeEmailModalDispatch}>
          <ChangeEmailForm
            locale={locale}
            changeEmail={changeEmailDispatch}
            changeEmailProcessing={changeEmailProcessing}
          />
        </Modal>

        <button onClick={showChangeEmailModalDispatch}>{children}</button>
      </React.Fragment>
    );
  }
}

ChangeEmail.propTypes = {
  changeEmailDispatch: PropTypes.func,
  hideChangeEmailModalDispatch: PropTypes.func,
  showChangeEmailModalDispatch: PropTypes.func,
  children: PropTypes.any,
  changeEmailProcessing: PropTypes.bool,
  showModal: PropTypes.bool,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  showModal: selectors.selectShowModal(),
  changeEmailProcessing: selectors.selectChangeEmailProcessing(),
});

function mapDispatchToProps(dispatch) {
  return {
    changeEmailDispatch: (...args) => dispatch(changeEmail(args)),
    showChangeEmailModalDispatch: () => dispatch(showChangeEmailModal()),
    hideChangeEmailModalDispatch: () => dispatch(hideChangeEmailModal()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'showChangeEmail', reducer });
const withSaga = injectSaga({ key: 'showChangeEmail', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ChangeEmail);
