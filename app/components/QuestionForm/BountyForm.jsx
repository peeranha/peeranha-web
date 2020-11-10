import React, { memo, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';
//////////////////////////////////////////import currencyPeerImage from 'images/currencyPeer.svg?inline';
import TagSelector from 'components/TagSelector';

import { strLength1x5, required, valueHasToBeLessThan } from 'components/FormFields/validate';

import { FORM_BOUNTY, FORM_COMMUNITY, FORM_TAGS } from './constants';

import messages from './messages';
import NumberInputField from '../FormFields/NumberInputField';
import styled from 'styled-components';
import { getFormattedNum3 } from '../../utils/numbers';
import { translationMessages } from '../../i18n';
import commonMessages from '../../common-messages';
import _get from 'lodash/get';

const BountyContainer = styled.div`
  margin-top: 20px;
`;

const BountyForm = ({ questionLoading, intl, formValues, change }) => {
  const bountyDisabled = useMemo(
    () => questionLoading || !formValues?.[FORM_COMMUNITY]?.value,
    [formValues, questionLoading],
  );
  // debugger;
  return (
    <BountyContainer>
      <Field
        name={FORM_BOUNTY}
        label={intl.formatMessage(messages.bountyLabel)}
        tip={intl.formatMessage(messages.bountyTip)}
        placeholder={getFormattedNum3(0)}
        component={NumberInputField}
        disabled={bountyDisabled}
        validate={[required, valueHasToBeLessThan]}
        warn={[required, valueHasToBeLessThan]}
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
