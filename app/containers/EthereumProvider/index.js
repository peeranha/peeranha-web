import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import { redirectRoutesForSCM } from 'routes-config';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import LoadingIndicator from 'components/LoadingIndicator/HeightWidthCentered';

import { initEthereum } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectEthereum, makeSelectInitializing } from './selectors';

export const EthereumProvider = ({
  children,
  initEthereumDispatch,
  initializing,
  ethereum,
}) => {
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
      } else initEthereumDispatch();
    } else {
      initEthereumDispatch();
    }
  }, []);

  return (
    <div>{!initializing && ethereum ? children : <LoadingIndicator />}</div>
  );
};

EthereumProvider.propTypes = {
  initEthereum: PropTypes.func,
  children: PropTypes.element,
  initializing: PropTypes.bool,
  ethereum: PropTypes.object,
};

const withConnect = connect(
  createStructuredSelector({
    initializing: makeSelectInitializing(),
    ethereum: makeSelectEthereum(),
  }),
  dispatch => ({
    initEthereumDispatch: bindActionCreators(initEthereum, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'ethereumProvider', reducer });
const withSaga = injectSaga({ key: 'ethereumProvider', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EthereumProvider);
