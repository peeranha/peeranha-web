import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';

import commonMessages from 'common-messages';
import { CURRENCIES, WALLETS } from 'wallet-config';
import { scrollToErrorField } from 'utils/animation';

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
} from './constants';

import CurrencyField from './CurrencyField';
import messages from '../Profile/messages';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';
import { TEXT_PRIMARY } from '../../style-constants';
import { removeSelectedAccount, selectAccount } from './actions';
import {
  selectedAccountProcessingSelector,
  selectedAccountSelector,
} from './selectors';

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
  sendTipsProcessing,
  account,
  currencyValue,
  cryptoAccounts,
  currencies,
  profile,
  fromAccountValue,
  selectedAccount,
  selectAccountDispatch,
  removeSelectedAccountDispatch,
  selectedAccountProcessing,
  isPeer,
}) => {
  const changeCurrency = value => {
    change(CURRENCY_FIELD, value);
    change(WALLET_FIELD, CURRENCIES[value.name].wallets[profile ? 0 : 1]);
    change(EOS_SEND_TO_ACCOUNT_FIELD, cryptoAccounts[value.name]);
  };

  const changeWallet = value => {
    change(WALLET_FIELD, value);
    change(
      EOS_SEND_FROM_ACCOUNT_FIELD,
      value.name === WALLETS.PEERANHA.name ? fromAccountValue : selectedAccount,
    );
  };

  useEffect(() => () => removeSelectedAccountDispatch(), []);
  useEffect(
    () => {
      change(EOS_SEND_FROM_ACCOUNT_FIELD, selectedAccount);
      return undefined;
    },
    [selectedAccount],
  );
  useEffect(
    () => {
      change(EOS_SEND_FROM_ACCOUNT_FIELD, fromAccountValue);
      return undefined;
    },
    [fromAccountValue],
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
            options={
              currencyValue
                ? currencyValue.wallets.filter(
                    wallet =>
                      !(wallet.name === WALLETS.PEERANHA.name && !profile),
                  )
                : null
            }
            component={CurrencyField}
            validate={[required]}
            warn={[required]}
          />

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
  sendTipsProcessing: PropTypes.bool,
  walletValue: PropTypes.object,
  currencyValue: PropTypes.object,
  change: PropTypes.func,
  cryptoAccounts: PropTypes.object,
  currencies: PropTypes.array,
  profile: PropTypes.object,
  fromAccountValue: PropTypes.string,
  selectedAccount: PropTypes.string,
  selectAccountDispatch: PropTypes.func,
  selectedAccountProcessing: PropTypes.bool,
  removeSelectedAccountDispatch: PropTypes.func,
};

const formName = 'SendTipsForm';

let FormClone = reduxForm({
  form: formName,
  onSubmitFail: errors => scrollToErrorField(errors),
})(SendTipsForm);

FormClone = connect(
  (state, { cryptoAccounts, account }) => {
    const form = state.toJS().form[formName] || { values: {} };
    const profile = makeSelectProfileInfo()(state);
    const selectedAccount = selectedAccountSelector()(state);
    if (!cryptoAccounts[CURRENCIES.PEER.name]) {
      // eslint-disable-next-line no-param-reassign
      cryptoAccounts[CURRENCIES.PEER.name] = account;
    }
    if (!cryptoAccounts[CURRENCIES.TLOS.name]) {
      // eslint-disable-next-line no-param-reassign
      cryptoAccounts[CURRENCIES.TLOS.name] = account;
    }

    const initialCurrency = Object.keys(cryptoAccounts)[0];
    const currencyValue = form.values[CURRENCY_FIELD];
    const walletValue = form.values[WALLET_FIELD];

    const isPeer = !!(
      walletValue &&
      walletValue.name === WALLETS.PEERANHA.name &&
      profile
    );
    const fromAccountValue = profile ? profile.user : null;

    return {
      isPeer,
      profile,
      cryptoAccounts,
      selectedAccount,
      fromAccountValue,
      currencies: Object.keys(cryptoAccounts).map(name => CURRENCIES[name]),
      selectedAccountProcessing: selectedAccountProcessingSelector()(state),
      currencyValue,
      enableReinitialize: true,
      initialValues: {
        [CURRENCY_FIELD]: CURRENCIES[initialCurrency],
        [WALLET_FIELD]: CURRENCIES[initialCurrency].wallets[profile ? 0 : 1],
        [EOS_SEND_TO_ACCOUNT_FIELD]: cryptoAccounts[initialCurrency],
        [EOS_SEND_FROM_ACCOUNT_FIELD]: null,
      },
    };
  },
  dispatch => ({
    selectAccountDispatch: bindActionCreators(selectAccount, dispatch),
    removeSelectedAccountDispatch: bindActionCreators(
      removeSelectedAccount,
      dispatch,
    ),
  }),
)(FormClone);

export default React.memo(FormClone);
