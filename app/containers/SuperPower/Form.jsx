import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { injectIntl, FormattedMessage } from 'react-intl';

import { scrollToErrorField } from 'utils/animation';

import messages from './messages';

import {
  FORM_TYPE,
  BET_TYPE_FORM,
  CURRENT_BET_FORM,
  SUPERPOWER_PREDICTION_FORM,
} from './constants';
import {
  BG_LIGHT,
  BG_WARNING_LIGHT_TRANSPARENT,
  SECONDARY_SPECIAL,
} from 'style-constants';

import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import Tips from './Tips';
import PredictionForm from './PredictionForm';
import CurrentBetForm from './CurrentBetForm';
import FormBox from 'components/Form';
import Button from 'components/Button/Contained/InfoLarge';
import Checkbox from 'components/Input/Checkbox';
import Label from 'components/FormFields/Label';

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 40px;

  ${Label} {
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;
  }

  input {
    height: 45px;
    font-size: 20px;
    font-weight: bold;
    ${({ extraPosition }) => extraPosition ? `
      background: linear-gradient(90deg, ${BG_LIGHT} ${extraPosition}%, ${BG_WARNING_LIGHT_TRANSPARENT} ${extraPosition}%);

      :disabled {
        opacity: 1;
      }
    ` : ''}
  }
`;

export const InputProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ width }) => width || 0}%;
  height: 4px;
  background-color: ${SECONDARY_SPECIAL};
`;

const Title = styled.p`
  margin-top: 15px;
  margin-bottom: 25px;
  margin-left: 25px;
  font-size: 30px;
  font-weight: 600;
  line-height: 1.2;

  @media (max-width: 768px) {
    margin-top: 20px;
    margin-bottom: 15px;
    margin-left: 15px;
    font-size: 22px;
  }
`;

const Form = ({
  handleSubmit,
  formValues,
  currentBetValue,
  changeBet,
  changeBetLoading,
  changeCurrentBet,
  superPowerPrediction,
  maxBet,
  onChangeCurrentBet,
  locale,
}) => {

  return (
    <>
      <Title><FormattedMessage {...messages.formTitle} /></Title>
      <TipsBase>
        <BaseSpecialOne>
          <FormBox onSubmit={handleSubmit(changeBet)}>
            <PredictionForm value={superPowerPrediction} locale={locale} />

            <CurrentBetForm
              maxValue={maxBet}
              value={+currentBetValue}
              onClickBetTag={v => changeCurrentBet(v)}
              disabled={changeBetLoading}
              onChange={onChangeCurrentBet}
            />

            <Field
              name={BET_TYPE_FORM}
              component={Checkbox}
              label={<FormattedMessage {...messages.formBetType} />}
              disabled={changeBetLoading}
            />
            <Button type="submit">
              <FormattedMessage {...messages.formSubmit} />
            </Button>
          </FormBox>
        </BaseSpecialOne>

        <Tips />
      </TipsBase>
    </>
  );
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  formValues: PropTypes.object,
  currentBetValue: PropTypes.number,
  changeBet: PropTypes.func,
  changeBetLoading: PropTypes.bool,
  changeCurrentBet: PropTypes.func,
  superPowerPrediction: PropTypes.number,
  maxBet: PropTypes.number,
  onChangeCurrentBet: PropTypes.func,
  locale: PropTypes.string,
};

const FormClone = reduxForm({
  form: FORM_TYPE,
  onSubmitFail: errors => scrollToErrorField(errors),
})(Form);

export default memo(
  injectIntl(
    connect(
      (
        state,
        { currentBet, superPowerPrediction }
      ) => {
        const form = state.toJS().form[FORM_TYPE] || { values: {} };

        return {
          formValues: form,
          currentBetValue: +form.values[CURRENT_BET_FORM],
          initialValues: {
            [BET_TYPE_FORM]: form.values[BET_TYPE_FORM] || false,
            [SUPERPOWER_PREDICTION_FORM]: `x${superPowerPrediction}`,
            [CURRENT_BET_FORM]: currentBet.toString(),
          },
          enableReinitialize: true,
        };
      },
      dispatch => ({}),
    )(FormClone),
  ),
);
