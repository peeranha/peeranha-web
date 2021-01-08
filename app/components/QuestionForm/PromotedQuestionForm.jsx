import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';
import styled from 'styled-components';

import arrows from 'images/arrows.svg?inline';

import {
  valueHasToBePositiveInteger,
  valueHasToBeLessThanMaxPromotingHours,
} from 'components/FormFields/validate';

import NumberInputFieldShort from 'components/FormFields/NumberInputFieldShort';
import { InputContainer } from 'components/FormFields/Wrapper';

import { FORM_PROMOTE, PROMOTE_HOUR_COST } from './constants';

import messages from './messages';

const Wrapper = styled.div`
  ${InputContainer} {
    display: flex;
    align-items: center;
  }

  input {
    padding-right: 9px;

    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      width: 10px;
      background-image: url(${arrows});
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
      opacity: 1;
    }
  }
`;

const PromotedQuestionForm = ({ questionLoading, intl, formValues }) => {
  const result = formValues[FORM_PROMOTE] ? formValues[FORM_PROMOTE] * PROMOTE_HOUR_COST : 0;

  return (
    <Wrapper>
      <Field
        name={FORM_PROMOTE}
        component={NumberInputFieldShort}
        disabled={questionLoading}
        label={intl.formatMessage(messages.promotedLabel)}
        tip={intl.formatMessage(messages.promotedTip)}
        validate={[valueHasToBePositiveInteger, valueHasToBeLessThanMaxPromotingHours]}
        warn={[valueHasToBePositiveInteger, valueHasToBeLessThanMaxPromotingHours]}
        splitInHalf
        infoText={`hours x ${PROMOTE_HOUR_COST} PEER = ${result} PEER`}
        placeholder="0"
        min="0"
        step="1"
      />
    </Wrapper>
  );
}

PromotedQuestionForm.propTypes = {
  questionLoading: PropTypes.bool,
  intl: intlShape.isRequired,
  formValues: PropTypes.object,
};

export default memo(PromotedQuestionForm);
