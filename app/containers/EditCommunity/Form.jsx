import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
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
import Checkbox from 'components/Input/Checkbox';
import { ExtendedBase } from 'components/Base/AvatarBase';
import AvatarField from 'components/FormFields/AvatarField';
import TextInputField from 'components/FormFields/TextInputField';

import { scrollToErrorField } from 'utils/animation';

import messages from './messages';

import {
  ABOUT_FIELD,
  COMM_AVATAR_FIELD,
  COMM_NAME_FIELD,
  COMM_OFFICIAL_SITE_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  EDIT_COMMUNITY_BUTTON,
  EDIT_COMMUNITY_FORM,
} from './constants';
import TypeForm from '../CreateCommunity/QuestionsTypeForm';
import {
  COMM_BANNER_FIELD,
  FACEBOOK_LINK_FIELD,
  FORM_TYPE,
  HIGHLIGHT_COLOR_FIELD,
  INSTAGRAM_LINK_FIELD,
  COMMUNITY_TYPE,
  MAIN_COLOR_FIELD,
  VK_LINK_FIELD,
  YOUTUBE_LINK_FIELD,
} from '../CreateCommunity/constants';
import CommunityTypeForm from '../CreateCommunity/CommunityTypeForm';
import AboutForm from '../CreateCommunity/AboutForm';
import BloggerModeForm from '../CreateCommunity/BloggerModeForm';

const EditCommunityForm = ({
  communityId,
  communityLoading,
  editCommunityDispatch,
  handleSubmit,
  intl,
  change,
  formValues,
  initialValues,
  locale,
  isModerator,
}) => {
  const editCommunity = useCallback(
    values => {
      const communityData = {
        avatar: values.get(COMM_AVATAR_FIELD),
        name: values.get(COMM_NAME_FIELD),
        description: values.get(COMM_SHORT_DESCRIPTION_FIELD),
        about: values.get(ABOUT_FIELD),
        officialSite: values.get(COMM_OFFICIAL_SITE_FIELD),
        questionsType: parseInt(values.get(FORM_TYPE)),
        isBlogger: !!parseInt(values.get(COMMUNITY_TYPE)),
        banner: values.get(COMM_BANNER_FIELD),
        facebook: values.get(FACEBOOK_LINK_FIELD),
        instagram: values.get(INSTAGRAM_LINK_FIELD),
        youtube: values.get(YOUTUBE_LINK_FIELD),
        vk: values.get(VK_LINK_FIELD),
        main_color: values.get(MAIN_COLOR_FIELD),
        highlight_color: values.get(HIGHLIGHT_COLOR_FIELD),
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

        <AboutForm
          formValues={formValues}
          intl={intl}
          isProfileSaving={communityLoading}
          name={ABOUT_FIELD}
        />

        {isModerator && (
          <TypeForm
            locale={locale}
            change={change}
            formValues={formValues}
            intl={intl}
          />
        )}

        <CommunityTypeForm change={change} intl={intl} />

        {+formValues[COMMUNITY_TYPE] ? (
          <BloggerModeForm
            disabled={communityLoading}
            formValues={formValues}
            intl={intl}
            initialValues={initialValues}
          />
        ) : null}

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
  connect((state, { community }) => ({
    formValues: state.toJS()?.form[EDIT_COMMUNITY_FORM]?.values ?? {},
    initialValues: community
      ? {
          [COMM_AVATAR_FIELD]: community.avatar,
          [COMM_NAME_FIELD]: community.name,
          [COMM_SHORT_DESCRIPTION_FIELD]: community.description,
          [ABOUT_FIELD]: community.about,
          [COMM_OFFICIAL_SITE_FIELD]: community.officialSite,
          [FORM_TYPE]: community.questionsType,
          [COMMUNITY_TYPE]: community.isBlogger ? 1 : 0,
          [COMM_BANNER_FIELD]: community.banner,
          [FACEBOOK_LINK_FIELD]: community.socialLinks.facebook,
          [INSTAGRAM_LINK_FIELD]: community.socialLinks.instagram,
          [YOUTUBE_LINK_FIELD]: community.socialLinks.youtube,
          [VK_LINK_FIELD]: community.socialLinks.vk,
          [MAIN_COLOR_FIELD]: community.colors.main,
          [HIGHLIGHT_COLOR_FIELD]: community.colors.highlight,
        }
      : {},
  }))(FormClone),
);
