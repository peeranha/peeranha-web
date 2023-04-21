import injectReducer from 'utils/injectReducer';
import { bindActionCreators, compose } from 'redux';
import { WalletProvider } from '@suiet/wallet-kit';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setWallet } from 'containers/SuiProvider/actions';
import reducer from './reducer';

const SuiProvider = ({ children, setWalletDispatch, wallet }) => {
  useEffect(() => {
    setWalletDispatch(wallet);
  }, [setWalletDispatch, wallet]);
  return <WalletProvider>{children}</WalletProvider>;
};

const withConnect = connect(null, (dispatch) => ({
  setWalletDispatch: bindActionCreators(setWallet, dispatch),
}));

const withReducer = injectReducer({ key: 'suiProvider', reducer });

export default compose(withReducer, withConnect)(SuiProvider);
