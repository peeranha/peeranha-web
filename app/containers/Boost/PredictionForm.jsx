import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import {
  BOOST_PREDICTION_FORM,
  MIN_STAKE_PREDICTION,
  MAX_STAKE_PREDICTION,
} from './constants';
import {
  BORDER_TRANSPARENT,
  SECONDARY_SPECIAL,
} from 'style-constants';

import messages from './messages';

import TextInputField from 'components/FormFields/TextInputField';
import { InputWrapper, InputProgressBar } from './Form';

const Separator = styled.span`
  position: absolute;
  bottom: 0;
  left: ${({ left }) => left || 0}%;
  width: 1px;
  height: 45px;
  background-color: ${({ onlyNumbers }) => onlyNumbers ? BORDER_TRANSPARENT : SECONDARY_SPECIAL};

  ::after {
    content: attr(data-value);
    position: absolute;
    bottom: -20px;
    left: -7px;
    width: 20px;
    color: ${SECONDARY_SPECIAL};
    font-size: 14px;
  }
`;

const separators = amount => {
  const separators = [];

  for(let i = 0; i < amount; i++) {
    separators.push({
      value: `×${MIN_STAKE_PREDICTION + i}`,
      left: i * 100 / (MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION),
    })
  }

  return (
    <>
      {separators.map((x, i) => (
        <Separator
          key={i}
          left={x.left}
          data-value={x.value}
          onlyNumbers={i === 0 || i === separators.length - 1}
        />
      ))}
    </>
  );
}

const PredictionForm = ({ locale, value }) => {
  const progressWidth = value ? (value - MIN_STAKE_PREDICTION) * 100 / (MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION) : 0;

  return (
    <InputWrapper isPrediction>
      <Field
        name={BOOST_PREDICTION_FORM}
        component={TextInputField}
        disabled={true}
        label={translationMessages[locale][messages.formBoostPrediction.id]}
      />
      {separators(MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION + 1)}
      <InputProgressBar width={progressWidth} />
    </InputWrapper>
  );
}

PredictionForm.propTypes = {
  value: PropTypes.number,
  locale: PropTypes.string,
};

export default memo(PredictionForm);
