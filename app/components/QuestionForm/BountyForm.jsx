import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';

import TagSelector from 'components/TagSelector';

import { strLength1x5, required } from 'components/FormFields/validate';

import { FORM_BOUNTY, FORM_COMMUNITY, FORM_TAGS } from './constants';

import messages from './messages';
import NumberInputField from '../FormFields/NumberInputField';
import styled from 'styled-components';

const BountyContainer = styled.div`
  margin-top: 20px;
`;

const BountyForm = ({ questionLoading, intl, formValues, change }) => {

  const bountyDisabled = useMemo(
    () => questionLoading || !formValues?.[FORM_COMMUNITY]?.value,
    [formValues, questionLoading],
  );

  return (
    <BountyContainer>
      <Field
        name={FORM_BOUNTY}
        label={intl.formatMessage(messages.bountyLabel)}
        // tip={intl.formatMessage(messages.tagsTip)}
        tip={'lolec'}
        component={NumberInputField}
        disabled={bountyDisabled}
        // validate={[required, strLength1x5]}
        // warn={[required, strLength1x5]}
        splitInHalf
      />
    </BountyContainer>
  );
};

BountyForm.propTypes = {
  questionLoading: PropTypes.bool,
  intl: intlShape.isRequired,
  formValues: PropTypes.object,
  change: PropTypes.func,
};

export default memo(BountyForm);
