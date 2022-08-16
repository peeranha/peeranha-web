import React, { memo, useCallback } from 'react';
import { Field } from 'redux-form/immutable';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { COMMUNITY_TYPE } from './constants';
import CommunityTypeField from './CommunityTypeField';

const CommunityTypeForm = ({ change }) => {
  const { t } = useTranslation();
  const onChange = useCallback(val => change(COMMUNITY_TYPE, val[0]), []);

  return (
    <>
      <Field
        name={COMMUNITY_TYPE}
        component={CommunityTypeField}
        disabled={false}
        onChange={onChange}
        label={t('createCommunity.communityType')}
        tip={t('createCommunity.communityTypeTip')}
        splitInHalf
      />

      <br />
    </>
  );
};

CommunityTypeForm.propTypes = {
  change: PropTypes.func,
};

export default memo(CommunityTypeForm);
