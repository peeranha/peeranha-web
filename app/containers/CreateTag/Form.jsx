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

export const Form = ({
  createTagLoading,
  createTag,
  handleSubmit,
  translations,
  communities,
}) => (
  <FormBox onSubmit={handleSubmit(createTag)}>
    <Field
      className={isSingleCommunityWebsite() ? 'd-none' : ''}
      name={FORM_COMMUNITY}
      component={CommunityField}
      disabled={createTagLoading}
      label={translations[messages.community.id]}
      tip={translations[messages.communityTip.id]}
      options={communities}
      validate={[requiredForObjectField]}
      warn={[requiredForObjectField]}
      splitInHalf
    />

    <Field
      disabled={createTagLoading}
      name={NAME_FIELD}
      component={TextInputField}
      label={translations[messages.name.id]}
      tip={translations[messages.nameTip.id]}
      validate={[strLength2x15, required, valueHasNotBeInList]}
      warn={[strLength2x15, required, valueHasNotBeInList]}
      splitInHalf
    />

    <Field
      disabled={createTagLoading}
      name={DESCRIPTION_FIELD}
      component={TextareaField}
      label={translations[messages.descriptionField.id]}
      tip={translations[messages.descriptionFieldTip.id]}
      validate={[strLength20x1000, required]}
      warn={[strLength20x1000, required]}
      splitInHalf
    />

    <Button type="submit" disabled={createTagLoading}>
      {translations[messages.createTag.id]}
    </Button>
  </FormBox>
);

Form.propTypes = {
  createTagLoading: PropTypes.bool,
  createTag: PropTypes.func,
  handleSubmit: PropTypes.func,
  translations: PropTypes.object,
  communities: PropTypes.array,
};

let FormClone = reduxForm({
  form: FORM_NAME,
  onSubmitFail: errors => scrollToErrorField(errors),
})(Form);

FormClone = connect((state, { communities, communityId }) => ({
  valueHasNotBeInListValidate: (
    state?.toJS()?.form?.[FORM_NAME]?.values?.[FORM_COMMUNITY]?.tags ?? []
  ).map(x => x.name),
  initialValues: {
    [FORM_COMMUNITY]: getFollowedCommunities(communities, [communityId])[0],
  },
}))(FormClone);

export default React.memo(FormClone);
