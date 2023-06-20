import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import { isSingleCommunityWebsite, singleSubcommunity } from 'utils/communityManagement';

import { requiredForObjectField, requiredMinReputation } from 'components/FormFields/validate';
import CommunityField from 'components/FormFields/CommunityField';

import { FORM_COMMUNITY, FORM_TAGS } from './constants';

const single = isSingleCommunityWebsite();
const subcommunityIds = singleSubcommunity();

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
      className={single && !subcommunityIds?.length ? 'd-none' : ''}
      name={FORM_COMMUNITY}
      component={CommunityField}
      onChange={onChange}
      disabled={questionLoading || disableCommForm}
      label={t('common.communityLabel')}
      tip={t('common.communityTip')}
      options={communities}
      validate={[requiredForObjectField, requiredMinReputation]}
      warn={[requiredForObjectField, requiredMinReputation]}
      splitInHalf
      communityId={communityId}
      isHasRoleGlobal={isHasRoleGlobal}
      isCommunityModerator={isCommunityModerator}
      isEditForm={isEditForm}
      isPostAuthor={isPostAuthor}
      subcommunityIds={subcommunityIds}
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
