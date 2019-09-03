/**
 *
 * ShowActiveKey
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';

import Modal from 'components/ModalDialog';

import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import ShowActiveKeyForm from './ShowActiveKeyForm';

import {
  showActiveKey,
  showActiveKeyModal,
  hideActiveKeyModal,
} from './actions';

/* eslint-disable react/prefer-stateless-function */
export class ShowActiveKey extends React.PureComponent {
  render() /* istanbul ignore next */ {
    const {
      showActiveKeyDispatch,
      hideActiveKeyModalDispatch,
      children,
      showActiveKeyModalDispatch,
      showModal,
      showActiveKeyProcessing,
      locale,
    } = this.props;

    return (
      <React.Fragment>
        <Modal show={showModal} closeModal={hideActiveKeyModalDispatch}>
          <ShowActiveKeyForm
            locale={locale}
            showActiveKey={showActiveKeyDispatch}
            showActiveKeyProcessing={showActiveKeyProcessing}
          />
        </Modal>

        <button onClick={showActiveKeyModalDispatch}>{children}</button>
      </React.Fragment>
    );
  }
}

ShowActiveKey.propTypes = {
  showActiveKeyDispatch: PropTypes.func,
  hideActiveKeyModalDispatch: PropTypes.func,
  showActiveKeyModalDispatch: PropTypes.func,
  children: PropTypes.any,
  showActiveKeyProcessing: PropTypes.bool,
  showModal: PropTypes.bool,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: makeSelectLocale(),
  showModal: selectors.selectShowModal(),
  showActiveKeyProcessing: selectors.selectShowActiveKeyProcessing(),
});

function mapDispatchToProps(dispatch) /* istanbul ignore next */ {
  return {
    showActiveKeyDispatch: (...args) => dispatch(showActiveKey(args)),
    showActiveKeyModalDispatch: () => dispatch(showActiveKeyModal()),
    hideActiveKeyModalDispatch: () => dispatch(hideActiveKeyModal()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'showActiveKey', reducer });
const withSaga = injectSaga({ key: 'showActiveKey', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShowActiveKey);
