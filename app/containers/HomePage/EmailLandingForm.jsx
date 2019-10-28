import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';

import { validateEmail, strLength254Max } from 'components/FormFields/validate';

import DefaultInput from './DefaultInput';
import Button from './ContainedButton';

import { EMAIL_FIELD } from './constants';
import messages from './messages';

const FormColumnStyle = `
  flex-direction: column;
  align-items: stretch;

  div:nth-child(1) {
    flex: 1;
    margin-right: 0px;
  }

  div:nth-child(2) {
    flex: 1;
    margin-right: 0px;
  }

  div:nth-child(3) {
    flex: 1;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: baseline;

  div:nth-child(1) {
    flex: 2;
    min-width: 0;
    margin-right: 10px;
  }

  div:nth-child(2) {
    flex: 1;
  }

  ${x => (x.modal ? FormColumnStyle : ``)};

  @media only screen and (max-width: 992px) {
    ${FormColumnStyle};
  }
`;

const EmailLandingForm = ({
  handleSubmit,
  button,
  emailChecking,
  checkEmail,
  translations,
  modal,
}) => (
  <Form onSubmit={handleSubmit(checkEmail)} modal={modal}>
    <Field
      disabled={emailChecking}
      placeholder={translations[messages.email.id]}
      name={EMAIL_FIELD}
      component={DefaultInput}
      validate={[validateEmail, strLength254Max]}
      warn={[validateEmail, strLength254Max]}
    />

    <div className="d-flex">
      <Button disabled={emailChecking}>
        <FormattedMessage {...button} />
      </Button>
    </div>
  </Form>
);

EmailLandingForm.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  checkEmail: PropTypes.func,
  translations: PropTypes.object,
  button: PropTypes.object,
  emailChecking: PropTypes.bool,
  modal: PropTypes.bool,
};

export default reduxForm({})(EmailLandingForm);
