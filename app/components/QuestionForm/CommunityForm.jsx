import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { isSingleCommunityWebsite } from 'utils/communityManagement';

import {
  requiredForObjectField,
  requiredMinReputation,
  requiredNotBanned,
} from 'components/FormFields/validate';
import CommunityField from 'components/FormFields/CommunityField';

import { FORM_COMMUNITY, FORM_TAGS } from './constants';

const single = isSingleCommunityWebsite();

const CommunityForm = ({
  communities,
  communityId,
  change,
  questionLoading,
  disableCommForm,
  isHasRoleGlobal,
  isCommunityModerator,
  isEditForm,
  isPostAuthor,
}) => {
  const { t } = useTranslation();
  const onChange = useCallback(() => change(FORM_TAGS, ''), [change]);

  return (
    <Field
      className={single ? 'd-none' : ''}
      name={FORM_COMMUNITY}
      component={CommunityField}
      onChange={onChange}
      disabled={questionLoading || disableCommForm}
      label={t('common.communityLabel')}
      tip={t('common.communityTip')}
      options={communities}
      validate={[requiredForObjectField, requiredNotBanned, requiredMinReputation]}
      warn={[requiredForObjectField, requiredNotBanned, requiredMinReputation]}
      splitInHalf
      communityId={communityId}
      isHasRoleGlobal={isHasRoleGlobal}
      isCommunityModerator={isCommunityModerator}
      isEditForm={isEditForm}
      isPostAuthor={isPostAuthor}
    />
  );
};

CommunityForm.propTypes = {
  change: PropTypes.func,
  questionLoading: PropTypes.bool,
  disableCommForm: PropTypes.bool,
  communities: PropTypes.array,
};

export default memo(CommunityForm);
