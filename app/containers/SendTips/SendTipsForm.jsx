import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import isMobile from 'ismobilejs';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
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
import Label from 'components/FormFields/Label';

import { required, valueHasToBeLessThan } from 'components/FormFields/validate';

import {
  EOS_SEND_TO_ACCOUNT_FIELD,
  AMOUNT_FIELD,
  PASSWORD_FIELD,
  CURRENCY_FIELD,
  WALLET_FIELD,
  EOS_SEND_FROM_ACCOUNT_FIELD,
  TIPS_PRESELECT,
} from './constants';

import CurrencyField from './CurrencyField';
import messages from '../Profile/messages';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import { TEXT_PRIMARY } from '../../style-constants';
import {
  removeSelectedAccount,
  removeTipsEosService,
  selectAccount,
} from './actions';
import {
  selectedAccountProcessingSelector,
  selectedAccountSelector,
} from './selectors';
import { makeSelectEos } from '../EosioProvider/selectors';

const B = styled.button`
  padding-bottom: 6px;
  margin-left: 5px;
  color: ${TEXT_PRIMARY};
  cursor: pointer;
`;

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
  fromAccountValue,
  selectedAccount,
  selectAccountDispatch,
  removeTipsEosServiceDispatch,
  removeSelectedAccountDispatch,
  sendTipsProcessing,
  selectedAccountProcessing,
  isPeer,
  wallets,
  withScatter,
  tipsPreselect,
}) => {
  const changeCurrency = value => {
    change(CURRENCY_FIELD, value);
    change(
      WALLET_FIELD,
      CURRENCIES[value.name].wallets[profile && !withScatter ? 0 : 1],
    );
    change(EOS_SEND_TO_ACCOUNT_FIELD, cryptoAccounts[value.name]);
    const amount = _get(tipsPreselect, [AMOUNT_FIELD, value.name], null);

    if (amount) {
      change(AMOUNT_FIELD, amount);
    }
  };

  const changeWallet = value => {
    if (!withScatter) {
      change(WALLET_FIELD, value);
      change(
        EOS_SEND_FROM_ACCOUNT_FIELD,
        value.name === WALLETS.PEERANHA.name
          ? fromAccountValue
          : selectedAccount,
      );
    }
  };

  useEffect(
    () => () => {
      removeSelectedAccountDispatch();
      removeTipsEosServiceDispatch();
    },
    [],
  );
  useEffect(
    () => {
      change(EOS_SEND_FROM_ACCOUNT_FIELD, selectedAccount);
      return undefined;
    },
    [selectedAccount],
  );
  useEffect(
    () => {
      if (
        (walletValue &&
          walletValue.name !== WALLETS.SCATTER_SQRL_WOMBAT.name) ||
        withScatter
      ) {
        change(EOS_SEND_FROM_ACCOUNT_FIELD, fromAccountValue);
      }
      return undefined;
    },
    [fromAccountValue, walletValue],
  );

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
          />

          {!withScatter && (
            <div className="d-flex">
              <Label>
                {translationMessages[locale][messages.sendFromAccount.id]}
              </Label>
              {!isPeer && (
                <B onClick={selectAccountDispatch} type="button">
                  <FormattedMessage
                    {...messages[
                      selectedAccount ? 'changeAccount' : 'chooseAccount'
                    ]}
                  />
                </B>
              )}
            </div>
          )}

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
  wallets: PropTypes.arrayOf(PropTypes.object),
  sendTipsProcessing: PropTypes.bool,
  walletValue: PropTypes.object,
  currencyValue: PropTypes.object,
  change: PropTypes.func,
  tipsPreselect: PropTypes.object,
  cryptoAccounts: PropTypes.object,
  currencies: PropTypes.array,
  profile: PropTypes.object,
  fromAccountValue: PropTypes.string,
  selectedAccount: PropTypes.string,
  selectAccountDispatch: PropTypes.func,
  selectedAccountProcessing: PropTypes.bool,
  removeTipsEosServiceDispatch: PropTypes.func,
  removeSelectedAccountDispatch: PropTypes.func,
};

export const formName = 'SendTipsForm';

let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(SendTipsForm);

FormClone = connect(
  (state, { cryptoAccounts: cryptoAccs, account }) => {
    const profile = makeSelectProfileInfo()(state);
    const { withScatter } = makeSelectEos()(state);

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
    const fromAccountValue = _get(profile, 'user', null);
    const tipsPreselect = JSON.parse(getCookie(TIPS_PRESELECT) || null);

    const isPeer = !!(
      walletValue &&
      walletValue.name === WALLETS.PEERANHA.name &&
      profile
    );
    const isMobileDevice = isMobile(window.navigator).any;
    const mobileWallets = [];
    Object.entries(WALLETS).forEach(([key, value]) => {
      WALLETS[key].isMobile && mobileWallets.push(value);
    });

    let wallets = [];
    if (currencyValue) {
      const walletsToFilter = isMobileDevice
        ? mobileWallets
        : currencyValue.wallets;
      wallets = walletsToFilter.filter(
        wallet =>
          !(wallet.name === WALLETS.PEERANHA.name && (!profile || withScatter)),
      );
    }

    const initialValues = {
      [CURRENCY_FIELD]: tipsPreselect
        ? CURRENCIES[tipsPreselect[CURRENCY_FIELD]]
        : CURRENCIES[initialCurrency],
      [WALLET_FIELD]: tipsPreselect
        ? Object.values(WALLETS).find(
            ({ name }) => name === tipsPreselect[WALLET_FIELD],
          )
        : _get(
            CURRENCIES,
            [initialCurrency, 'wallets', profile && !withScatter ? 0 : 1],
            wallets[0],
          ),
      [EOS_SEND_TO_ACCOUNT_FIELD]: cryptoAccounts[initialCurrency],
      [EOS_SEND_FROM_ACCOUNT_FIELD]: fromAccountValue,
      [AMOUNT_FIELD]: tipsPreselect
        ? _get(tipsPreselect, [AMOUNT_FIELD, tipsPreselect[CURRENCY_FIELD]], '')
        : '',
    };

    return {
      isPeer,
      profile,
      wallets,
      withScatter,
      walletValue,
      tipsPreselect,
      currencyValue,
      cryptoAccounts,
      fromAccountValue,
      selectedAccount: selectedAccountSelector()(state),
      currencies: Object.keys(cryptoAccounts).map(name => CURRENCIES[name]),
      selectedAccountProcessing: selectedAccountProcessingSelector()(state),
      enableReinitialize: true,
      initialValues: {
        ...initialValues,
        [WALLET_FIELD]:
          wallets.length === 1 ? wallets[0] : initialValues[WALLET_FIELD],
      },
    };
  },
  dispatch => ({
    selectAccountDispatch: bindActionCreators(selectAccount, dispatch),
    removeSelectedAccountDispatch: bindActionCreators(
      removeSelectedAccount,
      dispatch,
    ),
    removeTipsEosServiceDispatch: bindActionCreators(
      removeTipsEosService,
      dispatch,
    ),
  }),
)(FormClone);

export default React.memo(FormClone);
