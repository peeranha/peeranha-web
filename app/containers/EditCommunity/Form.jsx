import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import {
  imageValidation,
  required,
  strLength3x20,
  strLength15x250,
  strLength100Max,
  validateURL,
} from 'components/FormFields/validate';

import FormBox from 'components/Form';
import LargeButton from 'components/Button/Contained/InfoLarge';
import { ExtendedBase } from 'components/Base/AvatarBase';
import AvatarField from 'components/FormFields/AvatarField';
import TextInputField from 'components/FormFields/TextInputField';

import { scrollToErrorField } from 'utils/animation';

import {
  COMM_AVATAR_FIELD,
  COMM_NAME_FIELD,
  COMM_OFFICIAL_SITE_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  EDIT_COMMUNITY_BUTTON,
  EDIT_COMMUNITY_FORM,
} from './constants';
import { COMMUNITY_TYPE } from '../CreateCommunity/constants';
import BloggerModeForm from '../CreateCommunity/BloggerModeForm';

const EditCommunityForm = ({
  communityId,
  communityLoading,
  editCommunityDispatch,
  handleSubmit,
  formValues,
  initialValues,
}) => {
  const { t } = useTranslation();
  const editCommunity = useCallback(
    values => {
      const communityData = {
        avatar: values.get(COMM_AVATAR_FIELD),
        name: values.get(COMM_NAME_FIELD),
        description: values.get(COMM_SHORT_DESCRIPTION_FIELD),
        website: values.get(COMM_OFFICIAL_SITE_FIELD),
        isBlogger: !!parseInt(values.get(COMMUNITY_TYPE)),
      };

      editCommunityDispatch(communityId, communityData);
    },
    [communityId, editCommunityDispatch],
  );

  return (
    <ExtendedBase>
      <Field
        name={COMM_AVATAR_FIELD}
        component={AvatarField}
        validate={[imageValidation, required]}
        warn={[imageValidation, required]}
        disabled={communityLoading}
      />

      <FormBox onSubmit={handleSubmit(editCommunity)}>
        <Field
          name={COMM_NAME_FIELD}
          component={TextInputField}
          validate={[strLength3x20, required]}
          warn={[strLength3x20, required]}
          disabled={communityLoading}
          label={t('createCommunity.communityTitle')}
          splitInHalf
          tip={t('createCommunity.communityTitleTip')}
        />

        <Field
          name={COMM_SHORT_DESCRIPTION_FIELD}
          component={TextInputField}
          validate={[strLength15x250, required]}
          warn={[strLength15x250, required]}
          disabled={communityLoading}
          label={t('createCommunity.shortDescription')}
          splitInHalf
          tip={t('createCommunity.shortDescriptionTip')}
        />

        <Field
          name={COMM_OFFICIAL_SITE_FIELD}
          component={TextInputField}
          validate={[validateURL, strLength100Max]}
          warn={[validateURL]}
          disabled={communityLoading}
          label={t('createCommunity.website')}
          placeholder="https://example.com"
          splitInHalf
          tip={t('createCommunity.websiteTip')}
        />

        {+formValues[COMMUNITY_TYPE] ? (
          <BloggerModeForm
            disabled={communityLoading}
            formValues={formValues}
            initialValues={initialValues}
          />
        ) : null}

        <LargeButton
          id={EDIT_COMMUNITY_BUTTON}
          type="submit"
          disabled={communityLoading}
        >
          {t('common.editCommunityDesc.editCommunity')}
        </LargeButton>
      </FormBox>
    </ExtendedBase>
  );
};

EditCommunityForm.propTypes = {
  communityId: PropTypes.number.isRequired,
  communityLoading: PropTypes.bool.isRequired,
  editCommunityDispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const FormClone = reduxForm({
  enableReinitialize: true,
  form: EDIT_COMMUNITY_FORM,
  onSubmitFail: errors => {
    scrollToErrorField(errors);
  },
})(EditCommunityForm);

export default connect((state, { community }) => ({
  formValues: state.toJS()?.form[EDIT_COMMUNITY_FORM]?.values ?? {},
  initialValues: community
    ? {
        [COMM_AVATAR_FIELD]: community.avatar,
        [COMM_NAME_FIELD]: community.name,
        [COMM_SHORT_DESCRIPTION_FIELD]: community.description,
        [COMM_OFFICIAL_SITE_FIELD]: community.website,
        [COMMUNITY_TYPE]: community.isBlogger ? 1 : 0,
      }
    : {},
}))(FormClone);
