import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';

import styled from 'styled-components';

import { valueHasToBeLessThan } from 'components/FormFields/validate';

import {
  FORM_BOUNTY_DAYS,
  FORM_BOUNTY_HOURS,
  FORM_COMMUNITY,
} from './constants';
import messages from './messages';
import NumberInputField from '../FormFields/NumberInputField';
import { required } from '../FormFields/validate';

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
        tip={intl.formatMessage(messages.bountyTip)}
        placeholder="Days"
        dotRestriction={dotRestriction}
        component={NumberInputField}
        disabled={bountyDisabled}
        validate={[required, valueHasToBeLessThan]}
        warn={[required, valueHasToBeLessThan]}
        splitInHalf
      />
      <Field
        name={FORM_BOUNTY_HOURS}
        label={intl.formatMessage(messages.bountyHoursLabel)}
        tip={intl.formatMessage(messages.bountyTip)}
        placeholder="Hours"
        dotRestriction={dotRestriction}
        component={NumberInputField}
        disabled={bountyDisabled}
        validate={[required, valueHasToBeLessThan]}
        warn={[required, valueHasToBeLessThan]}
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
