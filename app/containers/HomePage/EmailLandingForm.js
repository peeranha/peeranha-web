import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Field, reduxForm } from 'redux-form/immutable';
import styled from 'styled-components';

import { getValueFromSearchString } from 'utils/url';

import { validateEmail } from 'components/FormFields/validate';

import DefaultInput from './DefaultInput';
import Button from './ContainedButton';

import { EMAIL_FIELD, REFCODE_FIELD } from './constants';
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
    min-width: 0;
    margin-right: 10px;
  }

  div:nth-child(3) {
    flex: 1;
  }

  ${x => (x.modal ? FormColumnStyle : ``)};

  @media only screen and (max-width: 992px) {
    ${FormColumnStyle};
  }
`;

const EmailLandingForm = /* istanbul ignore next */ ({
  handleSubmit,
  button,
  sendEmailLoading,
  sendEmail,
  translations,
  modal,
}) => (
  <Form onSubmit={handleSubmit(sendEmail)} modal={modal}>
    <Field
      disabled={sendEmailLoading}
      placeholder={translations[messages.email.id]}
      name={EMAIL_FIELD}
      component={DefaultInput}
      validate={[validateEmail]}
      warn={[validateEmail]}
    />

    <Field
      disabled={sendEmailLoading}
      name={REFCODE_FIELD}
      component={DefaultInput}
      placeholder={translations[messages.refCode.id]}
    />

    <div className="d-flex">
      <Button disabled={sendEmailLoading} typeAttr="submit">
        <FormattedMessage {...button} />
      </Button>
    </div>
  </Form>
);

EmailLandingForm.propTypes = {
  handleSubmit: PropTypes.func,
  change: PropTypes.func,
  sendEmail: PropTypes.func,
  translations: PropTypes.object,
  button: PropTypes.object,
  sendEmailLoading: PropTypes.bool,
  modal: PropTypes.bool,
};

const FormClone = reduxForm({})(EmailLandingForm);

export default connect(
  /* istanbul ignore next */ () => ({
    initialValues: {
      [REFCODE_FIELD]: getValueFromSearchString(
        window.location.search,
        'refcode',
      ),
    },
  }),
)(FormClone);
