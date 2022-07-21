/**
 *
 * EosioProvider
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose, bindActionCreators } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';

import { redirectRoutesForSCM } from 'routes-config';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import LoadingIndicator from 'components/LoadingIndicator/HeightWidthCentered';

import { initEosio } from './actions';
import { makeSelectInitializing, makeSelectEos } from './selectors';
import reducer from './reducer';
import saga from './saga';

export const EosioProvider = ({ children, initEOSIO, initializing, eos }) => {
  useEffect(() => {
    const { pathname, hash } = window.location;
    const single = isSingleCommunityWebsite();
    if (single && pathname !== '/') {
      if (redirectRoutesForSCM.find(route => route.startsWith(pathname))) {
        const path =
          process.env.ENV === 'dev'
            ? `https://testpeeranha.io${pathname}${hash}`
            : `${process.env.APP_LOCATION}${pathname}${hash}`;
        window.open(path, '_parent');
      } else initEOSIO();
    } else {
      initEOSIO();
    }
  }, []);

  return <div>{!initializing && eos ? children : <LoadingIndicator />}</div>;
};

EosioProvider.propTypes = {
  initEOSIO: PropTypes.func,
  children: PropTypes.element,
  initializing: PropTypes.bool,
  eos: PropTypes.object,
};

const withConnect = connect(
  createStructuredSelector({
    initializing: makeSelectInitializing(),
    eos: makeSelectEos(),
  }),
  dispatch => ({
    initEOSIO: bindActionCreators(initEosio, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'eosioProvider', reducer });
const withSaga = injectSaga({ key: 'eosioProvider', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EosioProvider);
