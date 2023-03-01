import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import { BORDER_SECONDARY, BORDER_RADIUS_M } from 'style-constants';
import { calculateNewBoost } from 'utils/walletManagement';
import Label from 'components/FormFields/Label';

import { CURRENT_STAKE_FORM } from './constants';

import { InputWrapper } from './Form';
import { getFormattedNum3 } from 'utils/numbers';

const PredictedBoost = styled.div`
  height: 45px;
  padding: 9px 42px 9px 14px;
  font-size: 20px;
  font-weight: bold;
  border: 1px solid ${BORDER_SECONDARY};
  border-radius: ${BORDER_RADIUS_M};
`;

const PredictionForm = ({ formValues, userBoostStat }) => {
  const { t } = useTranslation();
  const [predictedBoost] = calculateNewBoost(
    userBoostStat,
    Number(formValues[CURRENT_STAKE_FORM]),
  );
  return (
    <InputWrapper isPrediction>
      <Label>{t('boost.formBoostPrediction')}</Label>
      <PredictedBoost>{getFormattedNum3(predictedBoost)}</PredictedBoost>
    </InputWrapper>
  );
};

PredictionForm.propTypes = {
  locale: PropTypes.string,
  formValues: PropTypes.object,
  maxStake: PropTypes.number,
};

export default memo(PredictionForm);
