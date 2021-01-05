import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';
import styled from 'styled-components';

import { valueHasToBeLessThan } from 'components/FormFields/validate';

import NumberInputField from '../FormFields/NumberInputField';

import { FORM_BOUNTY, FORM_COMMUNITY } from './constants';

import messages from './messages';
import { valueCannotBeLessThenPrev } from '../FormFields/validate';

const BountyContainer = styled.div`
  margin-top: 20px;
`;

const BountyForm = ({ questionLoading, intl, formValues }) => {
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
        placeholder={0}
        dotRestriction={0}
        component={NumberInputField}
        disabled={bountyDisabled}
        validate={[valueHasToBeLessThan, valueCannotBeLessThenPrev]}
        warn={[valueHasToBeLessThan, valueCannotBeLessThenPrev]}
        splitInHalf
      />
    </BountyContainer>
  );
};

BountyForm.propTypes = {
  questionLoading: PropTypes.bool,
  intl: intlShape.isRequired,
  formValues: PropTypes.object,
};

export default memo(BountyForm);
