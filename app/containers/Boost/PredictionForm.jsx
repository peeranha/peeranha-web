import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import {
  BORDER_TRANSPARENT,
  SECONDARY_SPECIAL,
  BORDER_SECONDARY,
  BORDER_RADIUS_M,
} from 'style-constants';
import { calculateNewBoost, getPredictedBoost } from 'utils/walletManagement';
import Label from 'components/FormFields/Label';

import {
  MIN_STAKE_PREDICTION,
  MAX_STAKE_PREDICTION,
  CURRENT_STAKE_FORM,
} from './constants';

import messages from './messages';

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
  background-color: ${({ onlyNumbers }) =>
    onlyNumbers ? BORDER_TRANSPARENT : SECONDARY_SPECIAL};

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
  const separatorsList = [];

  for (let i = 0; i < amount; i += 1) {
    separatorsList.push({
      value: `×${MIN_STAKE_PREDICTION + i}`,
      left: (i * 100) / (MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION),
    });
  }

  return (
    <>
      {separatorsList.map((x, i) => (
        <Separator
          key={x.value}
          left={x.left}
          data-value={x.value}
          onlyNumbers={i === 0 || i === separatorsList.length - 1}
        />
      ))}
    </>
  );
};

const PredictionForm = ({ locale, formValues, userBoostStat }) => {
  const [predictedBoost] = calculateNewBoost(
    userBoostStat,
    Number(formValues[CURRENT_STAKE_FORM]),
  );
  return (
    <InputWrapper isPrediction>
      <Label>
        {translationMessages[locale][messages.formBoostPrediction.id]}
      </Label>
      <PredictedBoost>{predictedBoost}</PredictedBoost>
      {/*{separators(MAX_STAKE_PREDICTION - MIN_STAKE_PREDICTION + 1)}*/}
      {/*<InputProgressBar width={progressWidth} />*/}
    </InputWrapper>
  );
};

PredictionForm.propTypes = {
  locale: PropTypes.string,
  formValues: PropTypes.object,
  maxStake: PropTypes.number,
};

export default memo(PredictionForm);
