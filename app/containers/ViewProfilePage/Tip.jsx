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

import H4 from 'components/H4';
import ContainedButton from 'components/Button/Contained/InfoLarge';
import OutlinedButton from 'components/Button/Outlined/InfoLarge';

import commonMessages from 'common-messages';

import profileMessages from '../Profile/messages';
import AccountField from './AccountField';
import { BORDER_SECONDARY, TEXT_SECONDARY_LIGHT } from '../../style-constants';

const Form = styled.form`
  width: 100%;
  max-width: 541px;
  margin-top: 15px;
`;

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;

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

const Table = styled.table`
  width: 100%;

  > thead,
  > tbody {
    width: 100% !important;
  }
`;

const THead = styled.thead`
  @media only screen and (max-width: 355px) {
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
  width: 100%;
  max-width: 380px;
`;

const TBody = styled.tbody`
  width: 100%;
`;

const TBodyTrTdCrypto = styled.td`
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

  @media only screen and (max-width: 576px) {
    height: 47px;
  }
`;

const TBodyTrTdAccount = styled.td`
  margin-right: 0;
  width: 100%;
  max-width: 380px;
  padding: 8px 16px 8px 8px;

  @media only screen and (max-width: 576px) {
    height: 47px;
    padding: 4px 12px 4px 4px;
  }

  @media only screen and (max-width: 355px) {
    padding: 4px 4px 4px 4px;
  }
`;

const TBodyTR = styled.tr`
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

const Base = styled.div`
  padding: 20px 30px;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  h4 {
    padding: 23px 27px;
  }
`;

const Tip = ({ className, handleSubmit, changed, reset, profile, account }) => {
  const isMine = account && account === profile.user;
  return (
    <Container className={className} style={{ marginTop: '10px' }}>
      <H4>
        <FormattedMessage {...commonMessages.tip} />
      </H4>
      <Base>
        <FormattedMessage {...profileMessages.tipText} />
        <Form onSubmit={handleSubmit}>
          <Table className={changed ? 'mb-4' : ''}>
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
                    <TBodyTrTdAccount className="d-flex justify-content-start">
                      {isMine ? (
                        <Field
                          name={`${name}_FIELD`}
                          component={AccountField}
                        />
                      ) : (
                        <p>my_account</p>
                      )}
                    </TBodyTrTdAccount>
                  </TBodyTR>
                );
              })}
            </TBody>
          </Table>
          {changed && (
            <Div>
              <ContainedButton>Save</ContainedButton>
              <OutlinedButton onClick={reset}>Cancel</OutlinedButton>
            </Div>
          )}
        </Form>
      </Base>
    </Container>
  );
};

Tip.propTypes = {
  changed: PropTypes.bool,
  className: PropTypes.string,
  reset: PropTypes.func,
  handleSubmit: PropTypes.func,
  profile: PropTypes.object,
  account: PropTypes.string,
};

const FORM_NAME = 'tip_form';

export default compose(
  connect(state => {
    const form = state.get('form').toJS();

    const { values, initial } = !_isEmpty(form)
      ? form[FORM_NAME]
      : { values: null, initial: null };

    return {
      values: values || initial,
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
