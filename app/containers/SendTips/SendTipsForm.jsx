import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isMobile from 'ismobilejs';
import { bindActionCreators } from 'redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';
import { CURRENCIES, WALLETS } from 'wallet-config';
import { scrollToErrorField } from 'utils/animation';
import { getCookie } from 'utils/cookie';

import _get from 'lodash/get';
import _cloneDeep from 'lodash/cloneDeep';

import H4 from 'components/H4';
import TextInputField from 'components/FormFields/TextInputField';
import NumberInputField from 'components/FormFields/NumberInputField';
import Button from 'components/Button/Contained/InfoLarge';

import { required, valueHasToBeLessThan } from 'components/FormFields/validate';

import { makeSelectEos } from '../EosioProvider/selectors';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import messages from '../Profile/messages';

import {
  EOS_SEND_TO_ACCOUNT_FIELD,
  AMOUNT_FIELD,
  PASSWORD_FIELD,
  CURRENCY_FIELD,
  WALLET_FIELD,
  EOS_SEND_FROM_ACCOUNT_FIELD,
  TIPS_PRESELECT,
} from './constants';

import {
  removeSelectedAccounts,
  removeTipsEosServices,
  selectKeycatAccount,
  selectScatterAccount,
} from './actions';

import {
  selectedAccountProcessingSelector,
  selectedScatterAccountSelector,
  selectedKeycatAccountSelector,
} from './selectors';

import CurrencyField from './CurrencyField';

/* eslint indent: 0 */
const SendTipsForm = ({
  handleSubmit,
  change,
  sendTips,
  locale,
  account,
  currencyValue,
  walletValue,
  cryptoAccounts,
  currencies,
  profile,
  loggedUserAccount,
  selectedScatterAccount,
  selectedKeycatAccount,
  selectScatterAccountDispatch,
  selectKeycatAccountDispatch,
  removeTipsEosServicesDispatch,
  removeSelectedAccountsDispatch,
  sendFromAccountFieldValue,
  sendTipsProcessing,
  selectedAccountProcessing,
  isPeer,
  wallets,
  withScatter,
  withKeycat,
  tipsPreselect,
}) => {
  const isPeeranhaWalletSelected = walletValue?.name === WALLETS.PEERANHA.name;
  const isKeycatWalletSelected = walletValue?.name === WALLETS.KEYCAT.name;
  const isScatterWalletSelected =
    walletValue?.name === WALLETS.SCATTER_SQRL_WOMBAT.name ||
    walletValue?.name === WALLETS.WOMBAT.name;

  // set user account to EOS_SEND_FROM_ACCOUNT_FIELD
  useEffect(
    () => {
      // user logged with email
      if (isPeeranhaWalletSelected) {
        change(EOS_SEND_FROM_ACCOUNT_FIELD, loggedUserAccount);
      }

      // scatter operations
      if (isScatterWalletSelected && withScatter && !selectedScatterAccount) {
        change(EOS_SEND_FROM_ACCOUNT_FIELD, loggedUserAccount);
      }
      if (
        isScatterWalletSelected &&
        ((withScatter && selectedScatterAccount) || !withScatter)
      ) {
        change(EOS_SEND_FROM_ACCOUNT_FIELD, selectedScatterAccount);
      }

      // keycat operations
      if (isKeycatWalletSelected && withKeycat && !selectedKeycatAccount) {
        change(EOS_SEND_FROM_ACCOUNT_FIELD, loggedUserAccount);
      }
      if (
        isKeycatWalletSelected &&
        ((withKeycat && selectedKeycatAccount) || !withKeycat)
      ) {
        change(EOS_SEND_FROM_ACCOUNT_FIELD, selectedKeycatAccount);
      }
    },
    [walletValue, selectedScatterAccount, selectedKeycatAccount],
  );

  useEffect(
    () => () => {
      removeSelectedAccountsDispatch();
      removeTipsEosServicesDispatch();
    },
    [],
  );

  const changeCurrency = value => {
    change(CURRENCY_FIELD, value);
    change(
      WALLET_FIELD,
      CURRENCIES[value.name].wallets[
        profile && !withScatter && !withKeycat ? 0 : 1
      ],
    );
    change(EOS_SEND_TO_ACCOUNT_FIELD, cryptoAccounts[value.name]);
    const amount = _get(tipsPreselect, [AMOUNT_FIELD, value.name], null);

    if (amount) {
      change(AMOUNT_FIELD, amount);
    }
  };

  const changeWallet = value => {
    if (!withScatter && !withKeycat) {
      change(WALLET_FIELD, value);
    }
  };

  const disabled = sendTipsProcessing || selectedAccountProcessing;

  return (
    <div>
      <H4 className="text-center pb-3">
        <FormattedMessage {...commonMessages.sendTip} />
      </H4>

      <form onSubmit={handleSubmit(sendTips)}>
        <Field
          name={CURRENCY_FIELD}
          onChange={changeCurrency}
          disabled={disabled}
          label={translationMessages[locale][commonMessages.chooseCrypto.id]}
          component={CurrencyField}
          options={currencies}
          validate={[required]}
          warn={[required]}
        />

        <Field
          name={EOS_SEND_TO_ACCOUNT_FIELD}
          disabled={disabled || !!account}
          label={translationMessages[locale][messages.sendToAccount.id]}
          component={TextInputField}
          validate={[required]}
          warn={[required]}
        />

        <>
          <Field
            name={WALLET_FIELD}
            onChange={changeWallet}
            disabled={disabled}
            label={translationMessages[locale][commonMessages.chooseWallet.id]}
            options={wallets}
            component={CurrencyField}
            validate={[required]}
            warn={[required]}
            sendFromAccountFieldValue={sendFromAccountFieldValue}
            selectScatterAccount={selectScatterAccountDispatch}
            selectKeycatAccount={selectKeycatAccountDispatch}
            locale={locale}
            isPeer={isPeer}
            isKeycatWalletSelected={isKeycatWalletSelected}
            isScatterWalletSelected={isScatterWalletSelected}
          />

          <Field
            name={EOS_SEND_FROM_ACCOUNT_FIELD}
            component={TextInputField}
            validate={[required]}
            warn={[required]}
            disabled
          />
        </>

        <Field
          name={AMOUNT_FIELD}
          disabled={disabled}
          label={translationMessages[locale][commonMessages.amount.id]}
          component={NumberInputField}
          dotRestriction={_get(currencyValue, 'precision', 6)}
          validate={!isPeer ? [required] : [required, valueHasToBeLessThan]}
          warn={!isPeer ? [required] : [required, valueHasToBeLessThan]}
        />

        {isPeer && (
          <Field
            name={PASSWORD_FIELD}
            disabled={disabled}
            label={translationMessages[locale][commonMessages.password.id]}
            component={TextInputField}
            validate={required}
            warn={required}
            type="password"
          />
        )}

        <Button
          disabled={sendTipsProcessing}
          onClick={handleSubmit(sendTips)}
          className="w-100 mb-3"
        >
          <FormattedMessage {...commonMessages.submit} />
        </Button>
      </form>
    </div>
  );
};

SendTipsForm.propTypes = {
  handleSubmit: PropTypes.func,
  sendTips: PropTypes.func,
  locale: PropTypes.string,
  account: PropTypes.string,
  isPeer: PropTypes.bool,
  withScatter: PropTypes.bool,
  withKeycat: PropTypes.bool,
  wallets: PropTypes.arrayOf(PropTypes.object),
  sendTipsProcessing: PropTypes.bool,
  walletValue: PropTypes.object,
  currencyValue: PropTypes.object,
  change: PropTypes.func,
  tipsPreselect: PropTypes.object,
  cryptoAccounts: PropTypes.object,
  currencies: PropTypes.array,
  profile: PropTypes.object,
  loggedUserAccount: PropTypes.string,
  selectedScatterAccount: PropTypes.string,
  selectedKeycatAccount: PropTypes.string,
  sendFromAccountFieldValue: PropTypes.string,
  selectScatterAccountDispatch: PropTypes.func,
  selectKeycatAccountDispatch: PropTypes.func,
  selectedAccountProcessing: PropTypes.bool,
  removeTipsEosServicesDispatch: PropTypes.func,
  removeSelectedAccountsDispatch: PropTypes.func,
};

export const formName = 'SendTipsForm';

let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(SendTipsForm);

const formSelector = formValueSelector(formName);

FormClone = connect(
  (state, { cryptoAccounts: cryptoAccs, account }) => {
    const profile = makeSelectProfileInfo()(state);
    const { withScatter, withKeycat } = makeSelectEos()(state);

    const cryptoAccounts = _cloneDeep(cryptoAccs);
    const formValues = _get(state.toJS(), ['form', formName, 'values'], {});

    if (!cryptoAccounts[CURRENCIES.PEER.name]) {
      cryptoAccounts[CURRENCIES.PEER.name] = account;
    }
    if (!cryptoAccounts[CURRENCIES.TLOS.name]) {
      cryptoAccounts[CURRENCIES.TLOS.name] = account;
    }

    const initialCurrency = Object.keys(cryptoAccounts)[0];
    const currencyValue = _get(formValues, CURRENCY_FIELD, null);
    const walletValue = _get(formValues, WALLET_FIELD, null);
    const loggedUserAccount = _get(profile, 'user', null);
    const tipsPreselect = JSON.parse(getCookie(TIPS_PRESELECT) || null);

    const isPeer = !!(
      walletValue &&
      walletValue.name === WALLETS.PEERANHA.name &&
      profile
    );
    const isMobileDevice = isMobile(window.navigator).any;
    const mobileWallets = [];
    Object.entries(WALLETS).forEach(([key, value]) => {
      if (WALLETS[key].isMobile) mobileWallets.push(value);
    });

    let wallets = [];
    if (currencyValue) {
      const walletsToFilter = isMobileDevice
        ? mobileWallets
        : currencyValue.wallets;

      wallets = walletsToFilter.filter(
        wallet =>
          !(
            wallet.name === WALLETS.PEERANHA.name &&
            (!profile || withScatter || withKeycat)
          ),
      );
    }

    const getInitialWallet = () => {
      if (profile && !withScatter && !withKeycat)
        return CURRENCIES[initialCurrency].wallets[0];
      if (withScatter) return CURRENCIES[initialCurrency].wallets[1];
      if (withKeycat) return CURRENCIES[initialCurrency].wallets[2];

      // default value
      return wallets[0];
    };

    const initialValues = {
      [CURRENCY_FIELD]: tipsPreselect
        ? CURRENCIES[tipsPreselect[CURRENCY_FIELD]]
        : CURRENCIES[initialCurrency],
      [WALLET_FIELD]: tipsPreselect
        ? Object.values(WALLETS).find(
            ({ name }) => name === tipsPreselect[WALLET_FIELD],
          )
        : getInitialWallet(),
      [EOS_SEND_TO_ACCOUNT_FIELD]: cryptoAccounts[initialCurrency],
      [AMOUNT_FIELD]: tipsPreselect
        ? _get(tipsPreselect, [AMOUNT_FIELD, tipsPreselect[CURRENCY_FIELD]], '')
        : '',
    };

    const sendFromAccountFieldValue = formSelector(
      state,
      EOS_SEND_FROM_ACCOUNT_FIELD,
    );

    return {
      isPeer,
      profile,
      wallets,
      withScatter,
      withKeycat,
      walletValue,
      tipsPreselect,
      currencyValue,
      cryptoAccounts,
      loggedUserAccount,
      sendFromAccountFieldValue,
      selectedScatterAccount: selectedScatterAccountSelector()(state),
      selectedKeycatAccount: selectedKeycatAccountSelector()(state),
      currencies: Object.keys(cryptoAccounts).map(name => CURRENCIES[name]),
      selectedAccountProcessing: selectedAccountProcessingSelector()(state),
      enableReinitialize: true,
      initialValues,
    };
  },
  dispatch => ({
    selectScatterAccountDispatch: bindActionCreators(
      selectScatterAccount,
      dispatch,
    ),
    selectKeycatAccountDispatch: bindActionCreators(
      selectKeycatAccount,
      dispatch,
    ),
    removeSelectedAccountsDispatch: bindActionCreators(
      removeSelectedAccounts,
      dispatch,
    ),
    removeTipsEosServicesDispatch: bindActionCreators(
      removeTipsEosServices,
      dispatch,
    ),
  }),
)(FormClone);

export default React.memo(FormClone);
