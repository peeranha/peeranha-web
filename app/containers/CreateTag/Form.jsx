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
  withoutDoubleSpace,
} from 'components/FormFields/validate';

import { NAME_FIELD, DESCRIPTION_FIELD, FORM_COMMUNITY, FORM_NAME } from './constants';

export const Form = ({
  tagFormLoading,
  submitAction,
  handleSubmit,
  communities,
  isEditTagForm,
}) => {
  const { t } = useTranslation();

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
      />

      <Field
        disabled={tagFormLoading}
        name={NAME_FIELD}
        component={TextInputField}
        label={t('tags.name')}
        tip={t('tags.nameTip')}
        validate={[withoutDoubleSpace, strLength2x25, required, valueHasNotBeInList]}
        warn={[strLength2x25, required, valueHasNotBeInList]}
        splitInHalf
      />

      <Field
        disabled={tagFormLoading}
        name={DESCRIPTION_FIELD}
        component={TextareaField}
        label={t('tags.descriptionField')}
        tip={t('tags.descriptionFieldTip')}
        validate={[withoutDoubleSpace, strLength20x1000, required]}
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
};

let FormClone = reduxForm({
  form: FORM_NAME,
  onSubmitFail: (errors) => scrollToErrorField(errors),
})(Form);

FormClone = connect((state, { communities, communityId, isEditTagForm, editTagData }) => {
  const existingTags = selectExistingTags()(state);
  const tags = Array.isArray(existingTags) ? existingTags : existingTags[communityId];
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
        .concat([].map((tag) => tag.name?.toLowerCase())),
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
    valueHasNotBeInListValidate: tags
      .map((tag) => tag.name?.toLowerCase())
      .concat([].map((tag) => tag.name?.toLowerCase())),
    initialValues: {
      [FORM_COMMUNITY]: getFollowedCommunities(communities, [communityId])[0],
    },
  };
})(FormClone);

export default React.memo(FormClone);
