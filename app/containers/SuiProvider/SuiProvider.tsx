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
    const loadScriptByURL = (id, url, callback) => {
      const isScriptExist = document.getElementById(id);

      if (!isScriptExist) {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        script.onload = () => {
          if (callback) callback();
        };
        document.body.appendChild(script);
      }

      if (isScriptExist && callback) callback();
    };

    loadScriptByURL(
      'recaptcha-key',
      `https://www.google.com/recaptcha/api.js?render=${process.env.RECAPTCHA_SITE_KEY}`,
      () => {
        console.log('Script loaded!');
      },
    );
  }, []);

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
