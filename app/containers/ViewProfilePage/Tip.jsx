import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Field, reduxForm } from 'redux-form/immutable';

import _isEqual from 'lodash/isEqual';
import _isEmpty from 'lodash/isEmpty';

import { CURRENCIES } from 'wallet-config';
import { FormattedMessage } from 'react-intl';

import H3 from 'components/H3';
import ContainedButton from 'components/Button/Contained/InfoLarge';
import OutlinedButton from 'components/Button/Outlined/InfoLarge';

import commonMessages from 'common-messages';

import profileMessages from '../Profile/messages';
import { BaseStyled } from './SettingsOfUser';
import AccountField from './AccountField';
import { BORDER_SECONDARY, TEXT_SECONDARY_LIGHT } from '../../style-constants';

const Form = styled.form`
  @media only screen and (max-width: 660px) {
    width: 100%;
  }
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
`;

// const Table = styled.table``;

const THead = styled.thead`
  width: 100%;
  @media only screen and (max-width: 576px) {
    display: none;
  }
`;

const THeadTR = styled.tr`
  font-size: 14px !important;
  height: 30px;
  display: flex;
  justify-content: flex-start;
  width: 100%;
  > td {
    display: flex;
    align-items: center;
    padding: 0 0 0 10px !important;
    font-weight: 400 !important;
    color: ${TEXT_SECONDARY_LIGHT}!important;
  }
`;

const THeadCrypto = styled.td`
  width: 160px;
`;

const THeadAccount = styled.td`
  @media only screen and (max-width: 660px) {
    width: 100%;
  }
`;

const TBody = styled.tbody`
  width: fit-content;
`;

const TBodyTrTdCrypto = styled.td`
  display: flex;
  align-items: center;
  padding: 10px !important;
  height: 57px !important;
  width: 160px;

  > img {
    height: 24px;
    width: 24px;
    margin-right: 10px;
  }
`;

const TBodyTrTdAccount = styled.td`
  margin-right: 0 !important;

  @media only screen and (max-width: 660px) {
    width: 100%;
  }

  @media only screen and (max-width: 576px) {
    display: inline-block;
  }
`;

const TBodyTR = styled.tr`
  border: 1px solid ${BORDER_SECONDARY};
  display: inline-flex;

  :not(:last-child) {
    border-bottom: 0;
  }

  @media only screen and (max-width: 660px) {
    width: 100%;
  }

  @media only screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
    max-width: 379px;

    > td {
      padding: 0;
    }
  }
`;

const Base = styled.div`
  width: 100%;
  max-width: 571px;
  padding-right: 0 !important;
`;

const Tip = ({ className, handleSubmit, changed, reset }) => (
  <BaseStyled className={className} id="tip" style={{ marginTop: '10px' }}>
    <div className="d-inline-block">
      <H3>
        <FormattedMessage {...commonMessages.tip} />
      </H3>
      <FormattedMessage {...profileMessages.tipText} />
    </div>
    <Base className="d-inline-block">
      <Form onSubmit={handleSubmit}>
        <table className={changed ? 'mb-4' : ''}>
          <THead>
            <THeadTR>
              <THeadCrypto className="pl-2">
                <FormattedMessage {...profileMessages.crypto} />
              </THeadCrypto>
              <THeadAccount>
                <FormattedMessage {...profileMessages.account} />
              </THeadAccount>
            </THeadTR>
          </THead>
          <TBody>
            {Object.keys(CURRENCIES).map(currency => {
              const { logo, name } = CURRENCIES[currency];
              return (
                <TBodyTR key={currency}>
                  <TBodyTrTdCrypto>
                    <img src={logo} alt={`${name}_logo`} />
                    <p>{name}</p>
                  </TBodyTrTdCrypto>
                  <TBodyTrTdAccount className="p-2 pr-3 d-flex justify-content-start">
                    <Field name={`${name}_FIELD`} component={AccountField} />
                  </TBodyTrTdAccount>
                </TBodyTR>
              );
            })}
          </TBody>
        </table>
        {changed && (
          <Div>
            <ContainedButton>Save</ContainedButton>
            <OutlinedButton onClick={reset}>Cancel</OutlinedButton>
          </Div>
        )}
      </Form>
    </Base>
  </BaseStyled>
);

Tip.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  className: PropTypes.string,
  changed: PropTypes.bool,
};

const FORM_NAME = 'tip_form';

export default compose(
  connect(state => {
    const form = state.get('form').toJS();

    const { values, initial } = !_isEmpty(form)
      ? form[FORM_NAME]
      : { values: null, initial: null };

    return {
      enableReinitialize: true,
      initialValues: {
        PEER_FIELD: 'my_peer_account',
      },
      changed: !_isEqual(values, initial),
    };
  }),
  reduxForm({
    form: FORM_NAME,
  }),
)(Tip);
