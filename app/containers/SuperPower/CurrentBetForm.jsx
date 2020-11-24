import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  numberValue,
  required,
} from 'components/FormFields/validate';
import TextInputField from 'components/FormFields/TextInputField';
import Label from 'components/FormFields/Label';
import { InputWrapper, InputProgressBar } from './Form';

import { CURRENT_BET_FORM } from './constants';
import {
  SECONDARY_SPECIAL,
  TEXT_PRIMARY,
  BORDER_PRIMARY,
} from 'style-constants';

import messages from './messages';

const BET_TAGS = [
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
  }
];

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

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  margin-top: 15px;
  font-style: italic;
  font-size: 14px;
`;

const TagsLabel = styled.span`
  margin-right: 10px;
`;

const Tag = styled.button`
  margin-right: 10px;
  color: ${TEXT_PRIMARY};
  border-bottom: 1px dashed ${BORDER_PRIMARY};

  :hover {
    border-bottom-color: transparent;
  }
`;

const CurrentBetForm = ({ value, maxValue, onClickBetTag, disabled, onChange }) => {
  const progressWidth = value ? value * 100 / maxValue : 0;

  return (
    <InputWrapper>
      <Label><FormattedMessage {...messages.formCurrentBet} /></Label>
      <Tags>
        <TagsLabel><FormattedMessage {...messages.formTakeABet} />:</TagsLabel>
        {BET_TAGS.map(item => <Tag key={item.value} onClick={() => onClickBetTag(item.value)}>{item.text}</Tag>)}
      </Tags>
      <Field
        name={CURRENT_BET_FORM}
        component={TextInputField}
        disabled={disabled}
        onChange={onChange}
        // validate={[numberValue, required]}
        // warn={[numberValue, required]}
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
  onClickBetTag: PropTypes.func,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};

export default memo(CurrentBetForm);
