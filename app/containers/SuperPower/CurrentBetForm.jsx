import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  strLength15x100,
  required,
  maxByteLength,
  withoutDoubleSpace,
} from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import { InputWrapper, InputProgressBar } from './Form';

import { CURRENT_BET_FORM } from './constants';
import { SECONDARY_SPECIAL } from 'style-constants';

import messages from './messages';

const Bet = styled.span`
  position: absolute;
  bottom: -20px;
  color: ${SECONDARY_SPECIAL};
  font-size: 14px;
`;

const MinBet = Bet.extend`
  left: 0;
`.withComponent('span');

const MaxBet = Bet.extend`
  right: 0;
`.withComponent('span');

const CurrentBetForm = ({ value, maxValue }) => {
  const progressWidth = value * 100 / maxValue;

  return (
    <InputWrapper>
      <Field
        name={CURRENT_BET_FORM}
        component={TextInputField}
        disabled={false}
        label={<FormattedMessage {...messages.formCurrentBet} />}
        // validate={[withoutDoubleSpace, strLength15x100, maxByteLength, required]}
        // warn={[strLength15x100, required]}
      />
      <MinBet>0</MinBet>
      <MaxBet>{maxValue}</MaxBet>

      <InputProgressBar width={progressWidth} />
    </InputWrapper>
  );
}

CurrentBetForm.propTypes = {
  value: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func,
};

export default memo(CurrentBetForm);
