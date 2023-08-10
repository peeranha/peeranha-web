import injectReducer from 'utils/injectReducer';
import { bindActionCreators, compose } from 'redux';
import { WalletProvider } from '@suiet/wallet-kit';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setWallet, setTransactionList } from 'containers/SuiProvider/actions';
import reducer from './reducer';
import { initSetter } from 'utils/sui/sui';

const SuiProvider = ({ children, setWalletDispatch, wallet, setTransactionListDispatch }) => {
  useEffect(() => {
    setWalletDispatch(wallet);
    initSetter(setTransactionListDispatch);
  }, [setTransactionListDispatch, setWalletDispatch, wallet]);
  return <WalletProvider>{children}</WalletProvider>;
};

const withConnect = connect(null, (dispatch) => ({
  setWalletDispatch: bindActionCreators(setWallet, dispatch),
  setTransactionListDispatch: bindActionCreators(setTransactionList, dispatch),
}));

const withReducer = injectReducer({ key: 'suiProvider', reducer });

export default compose(withReducer, withConnect)(SuiProvider);
