import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  requiredForNumericalField,
  valueHasToBeLessThan,
} from 'components/FormFields/validate';

import NumberInputField from 'components/FormFields/NumberInputField';
import Label from 'components/FormFields/Label';
import {
  SECONDARY_SPECIAL,
  TEXT_PRIMARY,
  BORDER_PRIMARY,
} from 'style-constants';
import { InputWrapper, InputProgressBar } from './Form';

import { CURRENT_STAKE_FORM } from './constants';

import { italicFont } from '../../global-styles';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

const STAKE_TAGS = [
  {
    text: '25%',
    value: 0.25,
  },
  {
    text: '50%',
    value: 0.5,
  },
  {
    text: '75%',
    value: 0.75,
  },
  {
    text: '100%',
    value: 1,
  },
];

const Stake = styled.span`
  position: absolute;
  color: ${SECONDARY_SPECIAL};
  font-size: 14px;
  top: 120px;
`;

export const MinStake = Stake.extend`
  left: 0;
`.withComponent('span');

const MaxStake = Stake.extend`
  right: 0;
`.withComponent('span');

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  margin-top: 15px;
  font-style: ${italicFont};
  font-size: 14px;
`;

const TagsLabel = styled.span`
  margin-right: 10px;
`;

const Tag = styled.button`
  margin-right: 10px;
  color: ${colors.btnColor || TEXT_PRIMARY};
  border-bottom: 1px dashed ${colors.btnColor || BORDER_PRIMARY};

  :hover {
    border-bottom-color: transparent;
  }
`;

const CurrentStakeForm = ({
  maxValue,
  onClickStakeTag,
  disabled,
  formValues,
  formSubmitAction,
  initialUserStake,
}) => {
  const { t } = useTranslation();
  const value = +formValues[CURRENT_STAKE_FORM];
  const progressWidth = value && maxValue ? (value * 100) / maxValue : 0;

  return (
    <InputWrapper>
      <Label>{t('boost.formCurrentStake')}</Label>
      <Tags>
        <TagsLabel>{t('boost.formTakeAStake')}:</TagsLabel>
        {STAKE_TAGS.map(item => (
          <Tag
            key={item.value}
            onClick={e => {
              e.preventDefault();
              onClickStakeTag(item.value);
            }}
          >
            {item.text}
          </Tag>
        ))}
        {!!initialUserStake && (
          <Tag
            onClick={e => {
              e.preventDefault();
              onClickStakeTag(0);
              setTimeout(() => formSubmitAction(), 1000);
            }}
          >
            {t('boost.formUnstakeTokens')}
          </Tag>
        )}
      </Tags>
      <Field
        name={CURRENT_STAKE_FORM}
        component={NumberInputField}
        disabled={disabled}
        dotRestriction={6}
        validate={[requiredForNumericalField, valueHasToBeLessThan]}
        warn={[requiredForNumericalField, valueHasToBeLessThan]}
        maxValue={maxValue}
        isBoost
      />
      <MinStake>0</MinStake>
      <MaxStake>{maxValue}</MaxStake>

      <InputProgressBar width={progressWidth} />
    </InputWrapper>
  );
};

CurrentStakeForm.propTypes = {
  maxValue: PropTypes.number,
  onClickStakeTag: PropTypes.func,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  formValues: PropTypes.object,
  formSubmitAction: PropTypes.func,
  initialUserStake: PropTypes.number,
};

export default memo(CurrentStakeForm);
