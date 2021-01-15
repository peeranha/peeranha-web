import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import {
  MIN_STAKE_PREDICTION,
  MAX_STAKE_PREDICTION,
  CURRENT_STAKE_FORM,
} from './constants';
import {
  BORDER_TRANSPARENT,
  SECONDARY_SPECIAL,
  BORDER_SECONDARY,
  BORDER_RADIUS_M,
} from 'style-constants';

import { getPredictedBoost } from 'utils/walletManagement';

import messages from './messages';

import Label from 'components/FormFields/Label';
import { InputWrapper, InputProgressBar } from './Form';

const PredictedBoost = styled.div`
  height: 45px;
  padding: 9px 42px 9px 14px;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid ${BORDER_SECONDARY};
  border-radius: ${BORDER_RADIUS_M};
`;

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

const PredictionForm = ({ locale, formValues, maxStake }) => {
  const predictedBoost = useMemo(
    () => getPredictedBoost(formValues[CURRENT_STAKE_FORM], maxStake), 
    [formValues, maxStake]
  );
  const { value, text } = predictedBoost;

  const progressWidth = value ? (value - MIN_STAKE_PREDICTION) * 100 / (MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION) : 0;

  return (
    <InputWrapper isPrediction>
      <Label>{translationMessages[locale][messages.formBoostPrediction.id]}</Label>
      <PredictedBoost>{text}</PredictedBoost>
      {separators(MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION + 1)}
      <InputProgressBar width={progressWidth} />
    </InputWrapper>
  );
}

PredictionForm.propTypes = {
  locale: PropTypes.string,
  formValues: PropTypes.object,
  maxStake: PropTypes.number,
};

export default memo(PredictionForm);
