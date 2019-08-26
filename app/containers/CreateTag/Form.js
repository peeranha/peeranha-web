import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form/immutable';

import { getFollowedCommunities } from 'utils/communityManagement';

import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import CommunityField from 'components/FormFields/CommunityField';
import Button from 'components/Button/Contained/InfoLarge';

import {
  required,
  strLength2x15,
  strLength20x1000,
  requiredForObjectField,
} from 'components/FormFields/validate';

import {
  NAME_FIELD,
  DESCRIPTION_FIELD,
  FORM_COMMUNITY,
  FORM_NAME,
} from './constants';

import messages from './messages';

export const Form = /* istanbul ignore next */ ({
  createTagLoading,
  createTag,
  handleSubmit,
  translations,
  communities,
  formValues,
  change,
}) => {
  change(FORM_COMMUNITY, formValues[FORM_COMMUNITY]);

  return (
    <form onSubmit={handleSubmit(createTag)}>
      <div>
        <Field
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
          validate={[strLength2x15, required]}
          warn={[strLength2x15, required]}
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
      </div>

      <div>
        <Button className="my-3" disabled={createTagLoading}>
          {translations[messages.createTag.id]}
        </Button>
      </div>
    </form>
  );
};

Form.propTypes = {
  createTagLoading: PropTypes.bool,
  createTag: PropTypes.func,
  handleSubmit: PropTypes.func,
  translations: PropTypes.object,
  communities: PropTypes.array,
  formValues: PropTypes.object,
  change: PropTypes.func,
};

let FormClone = reduxForm({
  form: FORM_NAME,
})(Form);

FormClone = connect(
  /* istanbul ignore next */ (state, props) => {
    const { communities, communityId } = props;

    const form = state.toJS().form[FORM_NAME];

    return {
      formValues: form ? form.values : {},
      initialValues: {
        [FORM_COMMUNITY]: getFollowedCommunities(communities, [communityId])[0],
      },
    };
  },
)(FormClone);

export default React.memo(FormClone);
