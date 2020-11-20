import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  SUPERPOWER_PREDICTION_FORM,
  MIN_BET_PREDICTION,
  MAX_BET_PREDICTION,
} from './constants';
import {
  BORDER_TRANSPARENT,
  TEXT_WARNING_LIGHT,
  SECONDARY_SPECIAL,
  TEXT_LIGHT,
  TEXT_PRIMARY,
} from 'style-constants';

import messages from './messages';

import {
  strLength15x100,
  required,
  maxByteLength,
  withoutDoubleSpace,
} from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import { InputWrapper, InputProgressBar } from './Form';
import Span from 'components/Span';

const PredictionContainer = styled.div`
  margin-bottom: 25px;
`;

const PredictionLabel = styled.p`
  margin-bottom: 11px;
  font-size: 16px;
  font-weight: bold;
`;

const PredictionValue = styled.span`
  padding: 4px 13px 7px;
  margin-right: 15px;
  color: ${TEXT_LIGHT};
  font-size: 24px;
  font-weight: bold;
  border-radius: 19px;
  background-color: ${SECONDARY_SPECIAL};
`;

const ExtraLabel = styled.span`
  position: absolute;
  top: 3px;
  left: ${({ left }) => left || 0}%;
  color: ${TEXT_WARNING_LIGHT};
  font-size: 16px;
  font-weight: bold;
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
      value: `×${MIN_BET_PREDICTION + i}`,
      left: i * 100 / (MAX_BET_PREDICTION - MIN_BET_PREDICTION),
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

const PredictionForm = ({ value }) => {
  const extraPosition = (MAX_BET_PREDICTION - MIN_BET_PREDICTION - 1) * 100 / (MAX_BET_PREDICTION - MIN_BET_PREDICTION);
  const progressWidth = (value - MIN_BET_PREDICTION) * 100 / (MAX_BET_PREDICTION - MIN_BET_PREDICTION);

  return (
    <>
      <PredictionContainer>
        <PredictionLabel>Prediction</PredictionLabel>
        <div className="d-flex align-items-center">
          <PredictionValue>{`×${value}`}</PredictionValue>
          <Span><Span color={TEXT_PRIMARY}>Promo codes for extra:</Span> 4</Span>
        </div>
      </PredictionContainer>
      <InputWrapper extraPosition={extraPosition}>
        <Field
          name={SUPERPOWER_PREDICTION_FORM}
          component={TextInputField}
          disabled={true}
          label={<FormattedMessage {...messages.formSuperPowerPrediction} />}
          // validate={[withoutDoubleSpace, strLength15x100, maxByteLength, required]}
          // warn={[strLength15x100, required]}
          value={`x${value}`}
        />
        <ExtraLabel left={extraPosition}>Extra</ExtraLabel>
        {separators(MAX_BET_PREDICTION - MIN_BET_PREDICTION + 1)}
        <InputProgressBar width={progressWidth} />
      </InputWrapper>
    </>
  );
}

PredictionForm.propTypes = {
  value: PropTypes.number,
};

export default memo(PredictionForm);
