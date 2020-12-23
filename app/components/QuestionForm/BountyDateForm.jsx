import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';

import styled from 'styled-components';

import {
  required,
  valueHasToBeLessThan,
  number1x7,
  number1x24,
} from 'components/FormFields/validate';

import {
  FORM_BOUNTY_DAYS,
  FORM_BOUNTY_HOURS,
  FORM_COMMUNITY,
} from './constants';
import messages from './messages';
import NumberInputField from '../FormFields/NumberInputField';

const BountyContainer = styled.div`
  margin-top: 20px;
`;

const BountyDateForm = ({
  questionLoading,
  intl,
  formValues,
  dotRestriction,
  show,
}) => {
  const bountyDisabled = useMemo(
    () => questionLoading || !formValues?.[FORM_COMMUNITY]?.value,
    [formValues, questionLoading],
  );
  return show ? (
    <BountyContainer>
      <Field
        name={FORM_BOUNTY_DAYS}
        label={intl.formatMessage(messages.bountyDaysLabel)}
        tip={intl.formatMessage(messages.bountyDaysTip)}
        placeholder={intl.formatMessage(messages.daysPlaceholder)}
        dotRestriction={dotRestriction}
        component={NumberInputField}
        disabled={bountyDisabled}
        validate={[required, valueHasToBeLessThan, number1x7]}
        warn={[required, valueHasToBeLessThan, number1x7]}
        splitInHalf
      />
      <Field
        name={FORM_BOUNTY_HOURS}
        label={intl.formatMessage(messages.bountyHoursLabel)}
        tip={intl.formatMessage(messages.bountyHoursTip)}
        placeholder={intl.formatMessage(messages.hoursPlaceholder)}
        dotRestriction={dotRestriction}
        component={NumberInputField}
        disabled={bountyDisabled}
        validate={[required, valueHasToBeLessThan, number1x24]}
        warn={[required, valueHasToBeLessThan, number1x24]}
        splitInHalf
      />
    </BountyContainer>
  ) : null;
};

BountyDateForm.propTypes = {
  questionLoading: PropTypes.bool,
  show: PropTypes.bool,
  intl: intlShape.isRequired,
  formValues: PropTypes.object,
  dotRestriction: PropTypes.number,
};

export default memo(BountyDateForm);
