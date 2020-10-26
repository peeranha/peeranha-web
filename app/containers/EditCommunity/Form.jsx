import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import { ExtendedBase } from 'components/Base/AvatarBase';

import AvatarField from 'components/FormFields/AvatarField';
import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';

import {
  imageValidation,
  required,
  strLength3x20,
  strLength15x250,
  strLength20x1000,
  strLength100Max,
  validateURL,
} from 'components/FormFields/validate';

import FormBox from 'components/Form';
import LargeButton from 'components/Button/Contained/InfoLarge';

import { scrollToErrorField } from 'utils/animation';

import messages from './messages';

import {
  COMM_AVATAR_FIELD,
  COMM_NAME_FIELD,
  COMM_MAIN_DESCRIPTION_FIELD,
  COMM_OFFICIAL_SITE_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  EDIT_COMMUNITY_BUTTON,
  EDIT_COMMUNITY_FORM,
} from './constants';

const EditCommunityForm = ({
  communityId,
  communityLoading,
  editCommunityDispatch,
  handleSubmit,
  intl,
}) => {
  const editCommunity = useCallback(
    values => {
      const communityData = {
        avatar: values.get(COMM_AVATAR_FIELD),
        name: values.get(COMM_NAME_FIELD),
        description: values.get(COMM_SHORT_DESCRIPTION_FIELD),
        officialSite: values.get(COMM_OFFICIAL_SITE_FIELD),
        main_description: values.get(COMM_MAIN_DESCRIPTION_FIELD),
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
          label={intl.formatMessage(messages.communityTitle)}
          splitInHalf
          tip={intl.formatMessage(messages.communityTitleTip)}
        />

        <Field
          name={COMM_SHORT_DESCRIPTION_FIELD}
          component={TextInputField}
          validate={[strLength15x250, required]}
          warn={[strLength15x250, required]}
          disabled={communityLoading}
          label={intl.formatMessage(messages.shortDescription)}
          splitInHalf
          tip={intl.formatMessage(messages.shortDescriptionTip)}
        />

        <Field
          name={COMM_OFFICIAL_SITE_FIELD}
          component={TextInputField}
          validate={[validateURL, strLength100Max]}
          warn={[validateURL]}
          disabled={communityLoading}
          label={intl.formatMessage(messages.officialSite)}
          placeholder="https://example.com"
          splitInHalf
          tip={intl.formatMessage(messages.officialSiteTip)}
        />

        <Field
          name={COMM_MAIN_DESCRIPTION_FIELD}
          component={TextareaField}
          validate={[strLength20x1000, required]}
          warn={[strLength20x1000, required]}
          disabled={communityLoading}
          label={intl.formatMessage(messages.whyWeNeedIt)}
          splitInHalf
          tip={intl.formatMessage(messages.whyWeNeedItTip)}
        />

        <LargeButton
          id={EDIT_COMMUNITY_BUTTON}
          type="submit"
          disabled={communityLoading}
        >
          {intl.formatMessage(messages.editCommunity)}
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
  intl: intlShape.isRequired,
};

const FormClone = reduxForm({
  enableReinitialize: true,
  form: EDIT_COMMUNITY_FORM,
  onSubmitFail: errors => {
    scrollToErrorField(errors);
  },
})(EditCommunityForm);

export default injectIntl(
  connect((_, { community }) => ({
    initialValues: community
      ? {
          [COMM_AVATAR_FIELD]: community.avatar,
          [COMM_NAME_FIELD]: community.name,
          [COMM_SHORT_DESCRIPTION_FIELD]: community.description,
          [COMM_OFFICIAL_SITE_FIELD]: community.officialSite,
          [COMM_MAIN_DESCRIPTION_FIELD]: community.main_description,
        }
      : {},
  }))(FormClone),
);
