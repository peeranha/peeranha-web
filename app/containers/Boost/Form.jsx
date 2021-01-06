import React, { memo, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { injectIntl, FormattedMessage } from 'react-intl';

import { scrollToErrorField } from 'utils/animation';
import { getPredictedBoost } from 'utils/walletManagement';

import messages from './messages';

import {
  FORM_TYPE,
  CURRENT_STAKE_FORM,
  BOOST_PREDICTION_FORM,
} from './constants';
import {
  SECONDARY_SPECIAL,
} from 'style-constants';

import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import Tips from './Tips';
import PredictionForm from './PredictionForm';
import CurrentStakeForm, { MinStake } from './CurrentStakeForm';
import FormBox from 'components/Form';
import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import Label from 'components/FormFields/Label';
import BlockedInfoArea from 'components/BlockedInfoArea';

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

    ${({ isPrediction }) => isPrediction ? `
      :disabled {
        opacity: 1;
      }
    ` : ''}
  }

  .err + ${MinStake} {
    display: none;
  }

  .err + span + span + div {
    top: 101px;
  }
`;

export const InputProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${({ width }) => width || 0}%;
  max-width: 100%;
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
  currentStake,
  currentStakeValue,
  changeStake,
  changeStakeLoading,
  changeCurrentStake,
  maxStake,
  initialUserStake,
  onChangeCurrentStake,
  locale,
  formValues,
  nextWeekMaxStake,
  predictedBoost,
}) => {
  const f = useCallback(
    () => {
      console.log(12)
      const predictedBoost = getPredictedBoost(formValues[CURRENT_STAKE_FORM], nextWeekMaxStake)

      onChangeCurrentStake(predictedBoost.value);
    }, 
    [formValues, nextWeekMaxStake]
  );

  return (
    <div className="mb-5">
      {currentStake !== undefined && (
        <>
          <Title><FormattedMessage {...messages.formTitle} /></Title>
          <TipsBase>    
            <BaseSpecialOne className="position-relative">
              {!maxStake && (
                <BlockedInfoArea>
                  <FormattedMessage {...messages.notTokensToStake} />
                </BlockedInfoArea>
              )}

              <FormBox onSubmit={handleSubmit(changeStake)}>
                <PredictionForm
                  value={predictedBoost}
                  locale={locale}
                  formValues={formValues}
                  maxStake={nextWeekMaxStake}
                />

                <CurrentStakeForm
                  maxValue={maxStake}
                  value={+currentStakeValue}
                  onClickStakeTag={v => changeCurrentStake(v)}
                  disabled={changeStakeLoading}
                  formValues={formValues}
                  onChange={f}
                />

                <div className="mt-5">
                  <Button type="submit" className="mr-4">
                    <FormattedMessage {...messages.formSubmit} />
                  </Button>
                  <TransparentButton type="button" onClick={() => onChangeCurrentStake(initialUserStake)}>
                    <FormattedMessage {...messages.formCancel} />
                  </TransparentButton>
                </div>
              </FormBox>
            </BaseSpecialOne>

            <Tips />
          </TipsBase>
        </>
      )}
    </div>
  );
}

Form.propTypes = {
  handleSubmit: PropTypes.func,
  formValues: PropTypes.object,
  currentStakeValue: PropTypes.number,
  changeStake: PropTypes.func,
  changeStakeLoading: PropTypes.bool,
  changeCurrentStake: PropTypes.func,
  predictedBoost: PropTypes.number,
  maxStake: PropTypes.number,
  initialUserStake: PropTypes.number,
  onChangeCurrentStake: PropTypes.func,
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
        { currentStake, predictedBoost }
      ) => {
        const form = state.toJS().form[FORM_TYPE] || { values: {} };

        return {
          formValues: form.values,
          currentStakeValue: +form.values[CURRENT_STAKE_FORM],
          initialValues: {
            [BOOST_PREDICTION_FORM]: `x${predictedBoost}`,
            [CURRENT_STAKE_FORM]: currentStake ? currentStake.toString() : "",
          },
          enableReinitialize: true,
        };
      },
    )(FormClone),
  ),
);
