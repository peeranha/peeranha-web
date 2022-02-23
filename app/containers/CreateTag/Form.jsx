import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import {
  getFollowedCommunities,
  isSingleCommunityWebsite,
} from 'utils/communityManagement';
import { scrollToErrorField } from 'utils/animation';

import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import CommunityField from 'components/FormFields/CommunityField';
import Button from 'components/Button/Contained/InfoLarge';
import FormBox from 'components/Form';

import {
  required,
  strLength2x15,
  strLength20x1000,
  requiredForObjectField,
  valueHasNotBeInList,
} from 'components/FormFields/validate';

import {
  NAME_FIELD,
  DESCRIPTION_FIELD,
  FORM_COMMUNITY,
  FORM_NAME,
} from './constants';

import messages from './messages';
import { selectExistingTags } from 'containers/Tags/selectors';

export const Form = ({
  tagFormLoading,
  submitAction,
  handleSubmit,
  translations,
  communities,
  getSuggestedTagsDispatch,
  isEditTagForm,
}) => {
  const onChange = value => {
    if (value) {
      getSuggestedTagsDispatch({ communityId: value.id });
    }
  };

  return (
    <FormBox onSubmit={handleSubmit(submitAction)}>
      <Field
        className={isSingleCommunityWebsite() ? 'd-none' : ''}
        name={FORM_COMMUNITY}
        component={CommunityField}
        disabled={isEditTagForm ? true : tagFormLoading}
        label={translations[messages.community.id]}
        tip={translations[messages.communityTip.id]}
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
        label={translations[messages.name.id]}
        tip={translations[messages.nameTip.id]}
        validate={[strLength2x15, required, valueHasNotBeInList]}
        warn={[strLength2x15, required, valueHasNotBeInList]}
        splitInHalf
      />

      <Field
        disabled={tagFormLoading}
        name={DESCRIPTION_FIELD}
        component={TextareaField}
        label={translations[messages.descriptionField.id]}
        tip={translations[messages.descriptionFieldTip.id]}
        validate={[strLength20x1000, required]}
        warn={[strLength20x1000, required]}
        splitInHalf
      />

      <Button type="submit" disabled={tagFormLoading}>
        {isEditTagForm
          ? translations[messages.editTag.id]
          : translations[messages.createTag.id]}
      </Button>
    </FormBox>
  );
};
Form.propTypes = {
  tagFormLoading: PropTypes.bool,
  submitAction: PropTypes.func,
  handleSubmit: PropTypes.func,
  translations: PropTypes.object,
  communities: PropTypes.array,
  getSuggestedTagsDispatch: PropTypes.func,
};

let FormClone = reduxForm({
  form: FORM_NAME,
  onSubmitFail: errors => scrollToErrorField(errors),
})(Form);

FormClone = connect(
  (state, { communities, communityId, isEditTagForm, editTagData }) => {
    // map state to props for editTag form
    if (isEditTagForm) {
      const { communityId, tagId } = editTagData;
      const existingTags = selectExistingTags()(state);
      const selectedTag = existingTags.find(tag => tag.id === tagId);

      const selectedCommunity = communities.find(
        comm => comm.id === communityId,
      );

      return {
        valueHasNotBeInListValidate: existingTags
          .filter(tag => tag.id !== tagId)
          .map(x => x.name?.toLowerCase())
          .concat(
            (state?.toJS()?.tags?.suggestedTags ?? []).map(x =>
              x.name?.toLowerCase(),
            ),
          ),
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
        state?.toJS()?.form?.[FORM_NAME]?.values?.[FORM_COMMUNITY]?.tags ?? []
      )
        .map(x => x.name?.toLowerCase())
        .concat(
          (state?.toJS()?.tags?.suggestedTags ?? []).map(x =>
            x.name?.toLowerCase(),
          ),
        ),
      initialValues: {
        [FORM_COMMUNITY]: getFollowedCommunities(communities, [communityId])[0],
      },
    };
  },
)(FormClone);

export default React.memo(FormClone);
