import React, { memo, useCallback } from 'react';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';

import { COMMUNITY_TYPE } from './constants';
import messages from './messages';
import CommunityTypeField from './CommunityTypeField';

const CommunityTypeForm = ({ change, intl }) => {
  const onChange = useCallback(val => {
    return change(COMMUNITY_TYPE, val[0]);
  }, []);

  return (
    <>
      <Field
        name={COMMUNITY_TYPE}
        component={CommunityTypeField}
        disabled={false}
        onChange={onChange}
        label={intl.formatMessage(messages.communityType)}
        tip={intl.formatMessage(messages.communityTypeTip)}
        splitInHalf
      />

      <br />
    </>
  );
};

CommunityTypeForm.propTypes = {
  change: PropTypes.func,
  intl: intlShape.isRequired,
};

export default memo(CommunityTypeForm);
