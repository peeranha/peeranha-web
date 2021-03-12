import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { intlShape } from 'react-intl';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import { requiredForObjectField } from 'components/FormFields/validate';
import CommunityField from 'components/FormFields/CommunityField';

import { FORM_COMMUNITY, FORM_TAGS } from './constants';

import messages from './messages';

const single = isSingleCommunityWebsite();

const CommunityForm = ({
  intl,
  communities,
  change,
  questionLoading,
  disableCommForm,
}) => {
  const onChange = useCallback(() => change(FORM_TAGS, ''), [change]);

  return (
    <Field
      className={single ? 'd-none' : ''}
      name={FORM_COMMUNITY}
      component={CommunityField}
      onChange={onChange}
      disabled={questionLoading || disableCommForm}
      label={intl.formatMessage(messages.communityLabel)}
      tip={intl.formatMessage(messages.communityTip)}
      options={communities}
      validate={[requiredForObjectField]}
      warn={[requiredForObjectField]}
      splitInHalf
    />
  );
};

CommunityForm.propTypes = {
  change: PropTypes.func,
  questionLoading: PropTypes.bool,
  disableCommForm: PropTypes.bool,
  communities: PropTypes.array,
  intl: intlShape.isRequired,
};

export default memo(CommunityForm);
