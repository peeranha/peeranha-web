import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { scrollToErrorField } from 'utils/animation';
import { singleCommunityStyles } from 'utils/communityManagement';

import { DARK_SECONDARY, BORDER_RADIUS_M } from 'style-constants';

import TipsBase from 'components/Base/TipsBase';
import { BaseSpecialOne } from 'components/Base/BaseTransparent';
import FormBox from 'components/Form';
import Button from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import Label from 'components/FormFields/Label';
import BlockedInfoArea from 'components/BlockedInfoArea';
import Tips from './Tips';
import PredictionForm from './PredictionForm';
import CurrentStakeForm, { MinStake } from './CurrentStakeForm';

import { FORM_TYPE, CURRENT_STAKE_FORM } from './constants';

const { projectBorderRadius } = singleCommunityStyles();

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

    ${({ isPrediction }) => (isPrediction ? `:disabled { opacity: 1; }` : '')};
  }

  .err + ${MinStake} {
    display: none;
  }

  .err + span + span + div {
    display: none;
  }
`;

export const InputProgressBar = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: ${projectBorderRadius
    ? `calc(100% - ${Number(BORDER_RADIUS_M.split('px')[0]) * 0.75 * 2}px)`
    : '100%'};
  max-width: 100%;
  margin-left: ${() =>
    projectBorderRadius
      ? `${Number(BORDER_RADIUS_M.split('px')[0]) * 0.75}px`
      : ''};
  height: 4px;
  background-image: ${({ width }) => `linear-gradient(
    90deg,
    ${DARK_SECONDARY} 0%,
    ${DARK_SECONDARY} ${width || 0}%,
    transparent ${width || 0}%
  )`};
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
  userBoostStat,
  handleSubmit,
  reset,
  changeStake,
  changeStakeLoading,
  changeCurrentStake,
  maxStake,
  initialUserStake,
  currentStake,
  onChangeCurrentStake,
  locale,
  formValues,
}) => {
  const { t } = useTranslation();
  const resetAction =
    initialUserStake === currentStake
      ? reset
      : () => onChangeCurrentStake(initialUserStake || 0);

  return (
    <div className="mb-5">
      {formValues[CURRENT_STAKE_FORM] !== undefined && (
        <>
          <Title>{t('boost.formTitle')}</Title>
          <TipsBase>
            <BaseSpecialOne className="position-relative">
              {!maxStake && (
                <BlockedInfoArea>{t('boost.notTokensToStake')}</BlockedInfoArea>
              )}

              <FormBox onSubmit={handleSubmit(changeStake)}>
                <PredictionForm
                  locale={locale}
                  formValues={formValues}
                  userBoostStat={userBoostStat}
                />

                <CurrentStakeForm
                  maxValue={maxStake}
                  onClickStakeTag={(v) => changeCurrentStake(v)}
                  disabled={changeStakeLoading}
                  formValues={formValues}
                  formSubmitAction={handleSubmit(changeStake)}
                  initialUserStake={initialUserStake}
                />

                <div className="mt-5">
                  <Button type="submit" className="mr-4">
                    {t('boost.formSubmit')}
                  </Button>
                  <TransparentButton type="reset" onClick={resetAction}>
                    {t('boost.formCancel')}
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
};

Form.propTypes = {
  handleSubmit: PropTypes.func,
  reset: PropTypes.func,
  formValues: PropTypes.object,
  changeStake: PropTypes.func,
  changeStakeLoading: PropTypes.bool,
  changeCurrentStake: PropTypes.func,
  maxStake: PropTypes.number,
  initialUserStake: PropTypes.number,
  onChangeCurrentStake: PropTypes.func,
  locale: PropTypes.string,
  currentStake: PropTypes.number,
  nextWeekMaxStake: PropTypes.number,
};

const FormClone = reduxForm({
  form: FORM_TYPE,
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(Form);

export default memo(
  connect((state, { currentStake }) => {
    const form = state.toJS().form[FORM_TYPE] || { values: {} };

    const currentStakeValue =
      typeof currentStake === 'number' && currentStake > 0 ? currentStake : 0;

    return {
      formValues: form.values,
      initialValues: {
        [CURRENT_STAKE_FORM]: currentStakeValue.toString(),
      },
      enableReinitialize: true,
    };
  })(FormClone),
);
