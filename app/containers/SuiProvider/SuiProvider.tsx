import injectReducer from 'utils/injectReducer';
import { bindActionCreators, compose } from 'redux';
import { WalletProvider } from '@suiet/wallet-kit';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setWallet, setTransactionList } from 'containers/SuiProvider/actions';
import reducer from './reducer';
import { initSetter } from 'utils/sui/sui';
import { selectEmailLoginData } from 'containers/SuiProvider/selectors';
import { createStructuredSelector } from 'reselect';

const SuiProvider = ({
  children,
  setWalletDispatch,
  wallet,
  setTransactionListDispatch,
  emailLoginData,
}) => {
  useEffect(() => {
    if (emailLoginData) {
      setWalletDispatch(emailLoginData);
    } else {
      setWalletDispatch(wallet);
    }
    initSetter(setTransactionListDispatch);
  }, [
    setTransactionListDispatch,
    setWalletDispatch,
    JSON.stringify(wallet),
    JSON.stringify(emailLoginData),
  ]);
  return <WalletProvider>{children}</WalletProvider>;
};

const withConnect = connect(
  createStructuredSelector({
    emailLoginData: selectEmailLoginData(),
  }),
  (dispatch) => ({
    setWalletDispatch: bindActionCreators(setWallet, dispatch),
    setTransactionListDispatch: bindActionCreators(setTransactionList, dispatch),
  }),
);

const withReducer = injectReducer({ key: 'suiProvider', reducer });

export default compose(withReducer, withConnect)(SuiProvider);
