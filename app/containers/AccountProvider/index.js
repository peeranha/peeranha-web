import { useWallet } from '@suiet/wallet-kit';
import { setWallet } from 'containers/SuiProvider/actions';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DAEMON } from 'utils/constants';
import { isSuiBlockchain } from 'utils/sui';

import reducer from './reducer';
import saga from './saga';
import { getCurrentAccount, getCurrentSuiAccount } from './actions';
import { selectLastUpdate } from './selectors';
import { UPDATE_ACC_PERIOD } from './constants';

export const AccountProvider = ({
  children,
  lastUpdate,
  getCurrentAccountDispatch,
  getCurrentSuiAccountDispatch,
  setWalletDispatch,
}) => {
  if (isSuiBlockchain()) {
    const wallet = useWallet();
    useEffect(() => {
      setWalletDispatch(wallet);
      getCurrentSuiAccountDispatch(wallet);
    }, [wallet]);
  } else {
    useEffect(() => {
      getCurrentAccountDispatch();

      setInterval(() => {
        const diff = Date.now() - lastUpdate;

        if (diff > UPDATE_ACC_PERIOD) {
          getCurrentAccountDispatch();
        }
      }, UPDATE_ACC_PERIOD / 5);
    }, []);
  }

  return children;
};

AccountProvider.propTypes = {
  getCurrentAccountDispatch: PropTypes.func,
  children: PropTypes.object,
  lastUpdate: PropTypes.number,
};

export default compose(
  injectReducer({ key: 'accountProvider', reducer }),
  injectSaga({ key: 'accountProvider', saga, mode: DAEMON }),
  connect(
    createStructuredSelector({
      lastUpdate: selectLastUpdate(),
    }),
    (dispatch) => ({
      getCurrentAccountDispatch: bindActionCreators(getCurrentAccount, dispatch),
      getCurrentSuiAccountDispatch: bindActionCreators(getCurrentSuiAccount, dispatch),
      setWalletDispatch: bindActionCreators(setWallet, dispatch),
    }),
  ),
)(AccountProvider);
