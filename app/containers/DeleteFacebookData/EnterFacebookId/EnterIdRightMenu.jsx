import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { translationMessages } from 'i18n';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import letterImg from 'images/facebook-logo.svg?inline';

import { requiredNonZeroInteger } from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import SubmitButton from 'components/Button/Contained/InfoLarge';

import { ENTER_FB_USER_ID_FORM, FACEBOOK_USER_ID_FIELD } from '../constants';
import messages from '../messages';
import { P, Form } from '../index';

const Img = styled.img`
  width: 150px;
`;

const EnterIdRightMenu = ({
  handleSubmit,
  checkFacebookId,
  locale,
  processing,
}) => (
  <>
    <div className="text-center">
      <Img src={letterImg} alt="check your email" />
      <P className="text-center py-2">
        <FormattedMessage {...messages.enterYourFacebookId} />
      </P>
    </div>
    <Form onSubmit={handleSubmit(checkFacebookId)}>
      <Field
        name={FACEBOOK_USER_ID_FIELD}
        disabled={processing}
        label={translationMessages[locale][messages.facebookUserId.id]}
        component={TextInputField}
        validate={[requiredNonZeroInteger]}
        warn={[requiredNonZeroInteger]}
      />

      <SubmitButton disabled={processing} className="w-100">
        <FormattedMessage {...messages.checkId} />
      </SubmitButton>
    </Form>
  </>
);

EnterIdRightMenu.propTypes = {
  handleSubmit: PropTypes.func,
  verifyEmail: PropTypes.func,
  sendAnotherCode: PropTypes.func,
  locale: PropTypes.string,
  emailVerificationProcessing: PropTypes.bool,
};

export default reduxForm({
  form: ENTER_FB_USER_ID_FORM,
})(EnterIdRightMenu);
