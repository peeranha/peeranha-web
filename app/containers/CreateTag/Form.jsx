import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';
import { selectExistingTags } from 'containers/Tags/selectors';

import { getFollowedCommunities, isSingleCommunityWebsite } from 'utils/communityManagement';
import { scrollToErrorField } from 'utils/animation';

import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import CommunityField from 'components/FormFields/CommunityField';
import Button from 'components/Button/Contained/InfoLarge';
import FormBox from 'components/Form';

import {
  required,
  strLength2x25,
  strLength20x1000,
  requiredForObjectField,
  valueHasNotBeInList,
} from 'components/FormFields/validate';

import { NAME_FIELD, DESCRIPTION_FIELD, FORM_COMMUNITY, FORM_NAME } from './constants';

export const Form = ({
  tagFormLoading,
  submitAction,
  handleSubmit,
  communities,
  getSuggestedTagsDispatch,
  isEditTagForm,
}) => {
  const { t } = useTranslation();
  const onChange = (value) => {
    if (value) {
      getSuggestedTagsDispatch(value.id);
    }
  };

  return (
    <FormBox onSubmit={handleSubmit(submitAction)}>
      <Field
        className={isSingleCommunityWebsite() ? 'd-none' : ''}
        name={FORM_COMMUNITY}
        component={CommunityField}
        disabled={isEditTagForm ? true : tagFormLoading}
        label={t('tags.community')}
        tip={t('tags.communityTip')}
        options={communities}
        validate={[requiredForObjectField]}
        warn={[requiredForObjectField]}
        splitInHalf
        onChange={onChange}
      />

      <Field
        disabled={tagFormLoading}
        name={NAME_FIELD}
        component={TextInputField}
        label={t('tags.name')}
        tip={t('tags.nameTip')}
        validate={[strLength2x25, required, valueHasNotBeInList]}
        warn={[strLength2x25, required, valueHasNotBeInList]}
        splitInHalf
      />

      <Field
        disabled={tagFormLoading}
        name={DESCRIPTION_FIELD}
        component={TextareaField}
        label={t('tags.descriptionField')}
        tip={t('tags.descriptionFieldTip')}
        validate={[strLength20x1000, required]}
        warn={[strLength20x1000, required]}
        splitInHalf
      />

      <Button type="submit" disabled={tagFormLoading}>
        {isEditTagForm ? t('tags.saveTag') : t('tags.createTag')}
      </Button>
    </FormBox>
  );
};
Form.propTypes = {
  tagFormLoading: PropTypes.bool,
  submitAction: PropTypes.func,
  handleSubmit: PropTypes.func,
  communities: PropTypes.array,
  getSuggestedTagsDispatch: PropTypes.func,
};

let FormClone = reduxForm({
  form: FORM_NAME,
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(Form);

FormClone = connect((state, { communities, communityId, isEditTagForm, editTagData }) => {
  const existingTags = selectExistingTags()(state);
  // map state to props for editTag form
  if (isEditTagForm) {
    const { communityId, tagId } = editTagData;
    const communityTags = Array.isArray(existingTags) ? existingTags : existingTags[communityId];
    const selectedTag = communityTags.find((tag) => tag.id === tagId);

    const selectedCommunity = communities.find((comm) => comm.id === communityId);

    return {
      valueHasNotBeInListValidate: communityTags
        .filter((tag) => tag.id !== tagId)
        .map((tag) => tag.name?.toLowerCase())
        .concat((state?.toJS()?.tags?.suggestedTags ?? []).map((tag) => tag.name?.toLowerCase())),
      initialValues: {
        [FORM_COMMUNITY]: selectedCommunity,
        [NAME_FIELD]: selectedTag?.name,
        [DESCRIPTION_FIELD]: selectedTag?.description,
      },
      enableReinitialize: true,
    };
  }

  // map state to props for createTag form
  return {
    valueHasNotBeInListValidate: (
      existingTags[state?.toJS()?.form?.[FORM_NAME]?.values?.[FORM_COMMUNITY]?.id] ?? []
    )
      .map((tag) => tag.name?.toLowerCase())
      .concat((state?.toJS()?.tags?.suggestedTags ?? []).map((tag) => tag.name?.toLowerCase())),
    initialValues: {
      [FORM_COMMUNITY]: getFollowedCommunities(communities, [communityId])[0],
    },
  };
})(FormClone);

export default React.memo(FormClone);
