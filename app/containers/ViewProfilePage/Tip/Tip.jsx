import React from 'react';
import { bindActionCreators, compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import _isEqual from 'lodash/isEqual';
import _get from 'lodash/get';
import _pickBy from 'lodash/pickBy';
import _isEmpty from 'lodash/isEmpty';

import commonMessages from 'common-messages';

import { CURRENCIES } from 'wallet-config';
import { FormattedMessage } from 'react-intl';
import H4 from 'components/H4';
import ContainedButton from 'components/Button/Contained/InfoLarge';
import OutlinedButton from 'components/Button/Outlined/InfoLarge';
import { BORDER_SECONDARY, TEXT_SECONDARY_LIGHT } from 'style-constants';

import reducer from './reducer';
import saga from './saga';

import AccountField from '../AccountField';

import profileMessages from '../../Profile/messages';
import { saveCryptoAccounts } from './actions';
import { DAEMON } from '../../../utils/constants';
import { selectIsSaveCryptoAccountsProcessing } from './selectors';
import {
  isTelosNameAvailable,
  validateTelosName,
} from '../../../components/FormFields/validate';
import { selectEos } from '../../EosioProvider/selectors';
import messages from '../../ErrorPage/blockchainErrors';

const Container = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    margin-bottom: 14px;
  }
`;

const Base = styled.div`
  padding: 20px 30px;
  background-color: var(--color-white);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Form = styled.form`
  width: 100%;
  max-width: 541px;
  margin-top: 15px;
  padding: 0 30px;

  @media only screen and (max-width: 576px) {
    padding: 0;
  }
`;

const DivTable = styled.div`
  width: 100%;

  > div,
  > div {
    width: 100% !important;
  }
`;

const DivHeader = styled.div`
  font-size: 14px !important;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  width: 100%;

  > div {
    display: flex;
    align-items: center;
    padding: 0 0 0 10px !important;
    font-weight: 400 !important;
    color: ${TEXT_SECONDARY_LIGHT}!important;
  }

  @media only screen and (max-width: 355px) {
    display: none;
  }
`;

const HeadCryptoColumn = styled.div`
  width: 160px;
`;

const HeadAccountColumn = styled.div`
  width: 100%;
  max-width: 380px;
`;

const DivBody = styled.div`
  width: 100%;
`;

const BodyRow = styled.div`
  border: 1px solid ${BORDER_SECONDARY};
  display: inline-flex;
  width: 100%;
  :not(:last-child) {
    border-bottom: 0;
  }

  @media only screen and (max-width: 355px) {
    display: flex;
    flex-direction: column;
    max-width: 379px;
  }
`;

const BodyCryptoColumn = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 8px 8px 10px;
  height: 57px;
  width: 160px;

  > img {
    height: 24px;
    width: 24px;
    margin-right: 10px;
  }
`;

const BodyAccountColumn = styled.div`
  margin-right: 0;
  width: 100%;
  max-width: 380px;
  padding: 8px 16px 8px 8px;
  align-items: center;

  > span {
    height: fit-content;
  }

  @media only screen and (max-width: 355px) {
    padding: 4px 4px 4px ${({ isMine }) => (isMine ? 4 : 8)}px;
  }
`;

const SaveCancelButtons = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 230px;

  @media only screen and (max-width: 250px) {
    width: 100%;
  }

  @media only screen and (max-width: 230px) {
    height: 104px;
    flex-direction: column;

    button {
      max-width: 92px;
    }
  }
`;

const asyncValidate = async (
  value,
  dispatch,
  { eosService, account, initialValues },
) => {
  const values = {};
  value.forEach((v, k) => {
    values[k] = v;
  });

  const filtered = Object.keys(values).filter(
    currency =>
      values[currency] &&
      values[currency] !== account &&
      initialValues.get(currency) !== values[currency],
  );

  const promises = filtered.map(async currency => {
    const isAvailable = await isTelosNameAvailable(
      eosService,
      values[currency],
    );

    return {
      [currency]: isAvailable ? messages.accountDoesNotExist : undefined,
    };
  });

  const errors = _pickBy(
    (await Promise.all(promises)).reduce(
      (acc, cur) => ({ ...acc, ...cur }),
      {},
    ),
    v => !!v,
  );

  if (!_isEmpty(errors)) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(errors);
  }

  return undefined;
};

const Tip = ({
  className,
  handleSubmit,
  changed,
  reset,
  profile,
  isMine,
  saveCryptoAccountsDispatch,
  cryptoAccounts,
  isSaveCryptoAccountsProcessing,
  valid,
}) => {
  const saveAccounts = form =>
    saveCryptoAccountsDispatch({
      cryptoAccounts: _pickBy(form.toJS(), value => !_isEmpty(value)),
      resetForm: reset,
      profile,
    });
  const display = changed && valid;

  return (
    <Container className={className} style={{ marginTop: '10px' }}>
      <Base>
        <H4>
          <FormattedMessage {...commonMessages.tip} />
        </H4>
        <FormattedMessage {...profileMessages.tipText} />
        <Form>
          <DivTable className={changed ? 'mb-4' : ''}>
            <DivHeader>
              <HeadCryptoColumn className="pl-2">
                <FormattedMessage {...profileMessages.crypto} />
              </HeadCryptoColumn>
              <HeadAccountColumn>
                <FormattedMessage {...profileMessages.account} />
              </HeadAccountColumn>
            </DivHeader>
            <DivBody>
              {Object.keys(CURRENCIES).map(currency => {
                const { logo, name } = CURRENCIES[currency];
                return (
                  <BodyRow key={currency}>
                    <BodyCryptoColumn>
                      <img src={logo} alt={`${name}_logo`} />
                      <p>{name}</p>
                    </BodyCryptoColumn>
                    <BodyAccountColumn
                      isMine={isMine}
                      className="d-flex justify-content-start"
                    >
                      {isMine ? (
                        <Field
                          name={name}
                          component={AccountField}
                          validate={[validateTelosName]}
                          disabled={isSaveCryptoAccountsProcessing}
                        />
                      ) : (
                        <span>{cryptoAccounts[name]}</span>
                      )}
                    </BodyAccountColumn>
                  </BodyRow>
                );
              })}
            </DivBody>
          </DivTable>
          {display && (
            <SaveCancelButtons>
              <ContainedButton
                onClick={handleSubmit(saveAccounts)}
                disabled={isSaveCryptoAccountsProcessing}
              >
                <FormattedMessage {...profileMessages.saveButton} />
              </ContainedButton>
              <OutlinedButton
                onClick={reset}
                disabled={isSaveCryptoAccountsProcessing}
              >
                <FormattedMessage {...commonMessages.cancel} />
              </OutlinedButton>
            </SaveCancelButtons>
          )}
        </Form>
      </Base>
    </Container>
  );
};

Tip.propTypes = {
  isMine: PropTypes.bool,
  changed: PropTypes.bool,
  isSaveCryptoAccountsProcessing: PropTypes.bool,
  className: PropTypes.string,
  reset: PropTypes.func,
  handleSubmit: PropTypes.func,
  saveCryptoAccountsDispatch: PropTypes.func,
  profile: PropTypes.object,
  account: PropTypes.string,
  cryptoAccounts: PropTypes.object,
  valid: PropTypes.bool,
};

const FORM_NAME = 'tip_form';

export default compose(
  injectReducer({ key: 'editCryptoAccounts', reducer }),
  injectSaga({
    key: 'editCryptoAccounts',
    saga,
    mode: DAEMON,
    disableEject: true,
  }),
  connect(
    (state, { profile, account }) => {
      const isSaveCryptoAccountsProcessing = selectIsSaveCryptoAccountsProcessing()(
        state,
      );
      const form = state.get('form').toJS();
      const cryptoAccounts = _get(profile, ['profile', 'cryptoAccounts'], {});

      const isMine = account && account === profile.user;
      const { values } = _get(form, FORM_NAME, {
        values: cryptoAccounts,
      });

      if (!cryptoAccounts[CURRENCIES.PEER.name]) {
        cryptoAccounts[CURRENCIES.PEER.name] = profile.user;
      }
      if (!cryptoAccounts[CURRENCIES.TLOS.name]) {
        cryptoAccounts[CURRENCIES.TLOS.name] = profile.user;
      }

      return {
        isMine,
        enableReinitialize: true,
        initialValues: cryptoAccounts,
        isSaveCryptoAccountsProcessing,
        cryptoAccounts: values,
        changed: isMine && !_isEqual(values, cryptoAccounts),
        eosService: selectEos(state),
      };
    },
    dispatch => ({
      saveCryptoAccountsDispatch: bindActionCreators(
        saveCryptoAccounts,
        dispatch,
      ),
    }),
  ),
  reduxForm({
    form: FORM_NAME,
    touchOnChange: true,
    asyncBlurFields: Object.keys(CURRENCIES).map(
      currency => CURRENCIES[currency].name,
    ),
    shouldAsyncValidate: ({ syncValidationPasses }) => syncValidationPasses,
    asyncValidate,
  }),
)(Tip);
