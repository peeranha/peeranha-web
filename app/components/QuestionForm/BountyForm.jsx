import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';

import styled from 'styled-components';

import { valueHasToBeLessThan } from 'components/FormFields/validate';

import { FORM_BOUNTY, FORM_COMMUNITY } from './constants';
import messages from './messages';
import NumberInputField from '../FormFields/NumberInputField';
import { getFormattedNum3 } from '../../utils/numbers';

const BountyContainer = styled.div`
  margin-top: 20px;
`;

const BountyForm = ({ questionLoading, intl, formValues, dotRestriction }) => {
  const bountyDisabled = useMemo(
    () => questionLoading || !formValues?.[FORM_COMMUNITY]?.value,
    [formValues, questionLoading],
  );

  return (
    <BountyContainer>
      <Field
        name={FORM_BOUNTY}
        label={intl.formatMessage(messages.bountyLabel)}
        tip={intl.formatMessage(messages.bountyTip)}
        placeholder={getFormattedNum3(0)}
        dotRestriction={dotRestriction}
        component={NumberInputField}
        disabled={bountyDisabled}
        validate={[valueHasToBeLessThan]}
        warn={[valueHasToBeLessThan]}
        splitInHalf
      />
    </BountyContainer>
  );
};

BountyForm.propTypes = {
  questionLoading: PropTypes.bool,
  intl: intlShape.isRequired,
  formValues: PropTypes.object,
  dotRestriction: PropTypes.number,
};

export default memo(BountyForm);
