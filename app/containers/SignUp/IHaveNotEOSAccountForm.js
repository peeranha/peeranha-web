import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import dangerIcon from 'images/dangerIcon.svg?inline';
import downloadIcon from 'images/download.svg?inline';

import { required } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import TextareaField from 'components/FormFields/TextareaField';
import SubmitButton from 'components/Button/Contained/InfoLarge';
import YouNeedEosAccount from 'components/SignUpWrapper/YouNeedEosAccount';
import Checkbox from 'components/Input/Checkbox';

import SignUp from './index';
import messages from './messages';

import {
  EOS_ACTIVE_PRIVATE_KEY_FIELD,
  EOS_OWNER_PRIVATE_KEY_FIELD,
  STORE_KEY_FIELD,
  MASTER_KEY_FIELD,
  WHY_DO_YOU_LIKE_US_FIELD,
  PASSWORD_FIELD,
  PASSWORD_CONFIRM_FIELD,
  I_SAVE_MASTER_KEY_FIELD,
  I_ACCEPT_PRIVACY_POLICY_FIELD,
} from './constants';

import { Link, Div, validatePassword } from './IHaveEOSAccountForm';

const IHaveNotEOSAccountForm = ({
  handleSubmit,
  change,
  iSaveMasterKeyValue,
  iAcceptPolicyValue,
  eosActivePrevValue,
}) => (
  <YouNeedEosAccount>
    <SignUp>
      {({
        iHaveNotEosAccount,
        locale,
        iHaveNotEosAccountProcessing,
        keys: { activeKey, ownerKey, masterKey, linkToDownloadAllKeys },
        getAllKeys,
      }) => {
        const translate = translationMessages[locale];

        if (activeKey && activeKey !== eosActivePrevValue) {
          change(EOS_ACTIVE_PRIVATE_KEY_FIELD, activeKey.private);
          change(EOS_OWNER_PRIVATE_KEY_FIELD, ownerKey.private);
          change(MASTER_KEY_FIELD, masterKey);
        }

        return (
          <form onSubmit={handleSubmit(iHaveNotEosAccount)}>
            <Div primary>
              <Field
                name={EOS_ACTIVE_PRIVATE_KEY_FIELD}
                disabled
                readOnly
                label={translate[messages.eosActivePrivateKey.id]}
                component={TextInputField}
                validate={[required]}
                warn={[required]}
                isRefreshable
                onClick={getAllKeys}
              />
              <Field
                name={EOS_OWNER_PRIVATE_KEY_FIELD}
                disabled
                readOnly
                label={translate[messages.eosOwnerPrivateKey.id]}
                component={TextInputField}
                validate={[required]}
                warn={[required]}
                isRefreshable
                onClick={getAllKeys}
              />
              <div className="mb-3">
                <Field
                  name={STORE_KEY_FIELD}
                  disabled={iHaveNotEosAccountProcessing}
                  label={translate[messages.storeThisKey.id]}
                  component={Checkbox}
                />
              </div>
              <Field
                name={MASTER_KEY_FIELD}
                label={translate[messages.masterKey.id]}
                component={TextInputField}
                validate={[required]}
                warn={[required]}
                readOnly
                disabled
              />

              <div className="d-flex align-items-center mb-3">
                <img
                  width="20px"
                  className="mr-2"
                  src={dangerIcon}
                  alt="dangerIcon"
                />
                <FormattedMessage {...messages.youHaveToSaveKeys} />
              </div>

              <div className="mb-3">
                <Link
                  href={linkToDownloadAllKeys}
                  download="info.txt"
                  className="d-flex align-items-center"
                >
                  <img
                    width="20px"
                    className="mr-2"
                    src={downloadIcon}
                    alt="downloadIcon"
                  />
                  <FormattedMessage {...messages.downloadKeys} />
                </Link>
              </div>
            </Div>
            <Div>
              <Field
                name={PASSWORD_FIELD}
                disabled={iHaveNotEosAccountProcessing}
                label={translate[messages.password.id]}
                component={TextInputField}
                type="password"
              />
            </Div>
            <Div>
              <Field
                name={PASSWORD_CONFIRM_FIELD}
                disabled={iHaveNotEosAccountProcessing}
                label={translate[messages.confirmPassword.id]}
                component={TextInputField}
                type="password"
              />
            </Div>
            <Div>
              <Field
                name={WHY_DO_YOU_LIKE_US_FIELD}
                disabled={iHaveNotEosAccountProcessing}
                label={translate[messages.whyYouLikeUs.id]}
                component={TextareaField}
              />
            </Div>
            <Div className="mb-4">
              <Field
                name={I_SAVE_MASTER_KEY_FIELD}
                disabled={iHaveNotEosAccountProcessing}
                label={translate[messages.iSaveMasterKey.id]}
                component={Checkbox}
              />
            </Div>
            <Div className="mb-4">
              <Field
                name={I_ACCEPT_PRIVACY_POLICY_FIELD}
                disabled={iHaveNotEosAccountProcessing}
                label={
                  <Link href={routes.privacyPolicy()} target="_blank">
                    {translate[messages.iAcceptPrivacyPolicy.id]}
                  </Link>
                }
                component={Checkbox}
              />
            </Div>
            <Div>
              <SubmitButton
                disabled={
                  !iSaveMasterKeyValue ||
                  !iAcceptPolicyValue ||
                  iHaveNotEosAccountProcessing
                }
                className="w-100"
              >
                <FormattedMessage {...messages.verify} />
              </SubmitButton>
            </Div>
          </form>
        );
      }}
    </SignUp>
  </YouNeedEosAccount>
);

IHaveNotEOSAccountForm.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  iSaveMasterKeyValue: PropTypes.bool,
  iAcceptPolicyValue: PropTypes.bool,
  eosActivePrevValue: PropTypes.string,
};

const formName = 'IHaveNotEOSAccountForm';

/* eslint import/no-mutable-exports: 0 */
let FormClone = reduxForm({
  form: formName,
})(IHaveNotEOSAccountForm);

FormClone = connect(
  /* istanbul ignore next */ state => {
    const form = state.toJS().form[formName] || { values: {} };

    return {
      iSaveMasterKeyValue: form.values
        ? form.values[I_SAVE_MASTER_KEY_FIELD]
        : false,
      iAcceptPolicyValue: form.values
        ? form.values[I_ACCEPT_PRIVACY_POLICY_FIELD]
        : false,
      eosActivePrevValue: form.values
        ? form.values[EOS_ACTIVE_PRIVATE_KEY_FIELD]
        : false,
      validate: props => validatePassword(props),
      warn: props => validatePassword(props),
    };
  },
)(FormClone);

export default FormClone;
