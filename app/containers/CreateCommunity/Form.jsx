import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, FormSection } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import { TEXT_SECONDARY_LIGHT } from 'style-constants';

import icoTag from 'images/icoTag.svg?inline';
import closeIcon from 'images/close.svg?external';

import { formatStringToHtmlId, scrollToErrorField } from 'utils/animation';
import { showPopover } from 'utils/popover';

import { ExtendedBase } from 'components/Base/AvatarBase';

import Wrapper from 'components/FormFields/Wrapper';
import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import AvatarField from 'components/FormFields/AvatarField';

import Icon from 'components/Icon';
import FormBox from 'components/Form';
import LargeButton from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';

import {
  strLength3x20,
  required,
  strLength20x1000,
  strLength15x250,
  imageValidation,
  valueHasNotBeInListMoreThanOneTime,
} from 'components/FormFields/validate';

import messages from './messages';

import {
  FORM_NAME,
  COMM_AVATAR_FIELD,
  COMM_NAME_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  COMM_MAIN_DESCRIPTION_FIELD,
  TAG_NAME_FIELD,
  TAG_DESCRIPTION_FIELD,
  TAG_SECTION,
  CREATE_COMMUNITY_BUTTON,
} from './constants';

const MIN_TAGS_NUMBER = 5;
const MAX_TAGS_NUMBER = 25;
const DEFAULT_TAGS_ARRAY = [];

const ADD_TAG_BUTTON_ID = 'add-tag-to-new-community';

/* eslint no-plusplus: 0 */
for (let i = 0; i < MIN_TAGS_NUMBER; i++) {
  DEFAULT_TAGS_ARRAY.push(i);
}

// TODO: return language for multi lang.

const CreateCommunityForm = ({
  handleSubmit,
  createCommunity,
  createCommunityLoading,
  translations,
  change,
}) => {
  const [tags, changeTags] = useState(DEFAULT_TAGS_ARRAY);

  const removeTag = e => {
    const { key } = e.currentTarget.dataset;
    const index = tags.findIndex(x => x === +key);

    // clear tag in redux-form
    change(`tags.${TAG_SECTION}_${key}`, null);

    // clear array
    const tagsCopy = [...tags];
    tagsCopy.splice(index, 1);

    changeTags(tagsCopy);
  };

  const addTag = () => {
    if (tags.length < MAX_TAGS_NUMBER) {
      changeTags([...tags, tags[tags.length - 1] + 1]);
    }

    if (tags.length === MAX_TAGS_NUMBER) {
      showPopover(
        ADD_TAG_BUTTON_ID,
        translations[messages.maxTagsNumberReached.id],
      );
    }
  };

  return (
    <ExtendedBase>
      <Field
        name={COMM_AVATAR_FIELD}
        component={AvatarField}
        validate={[imageValidation, required]}
        warn={[imageValidation, required]}
        disabled={createCommunityLoading}
      />

      <FormBox onSubmit={handleSubmit(createCommunity)}>
        <Field
          disabled={createCommunityLoading}
          name={COMM_NAME_FIELD}
          component={TextInputField}
          label={translations[messages.communityTitle.id]}
          validate={[strLength3x20, required]}
          warn={[strLength3x20, required]}
          tip={translations[messages.communityTitleTip.id]}
          splitInHalf
        />

        <Field
          disabled={createCommunityLoading}
          name={COMM_SHORT_DESCRIPTION_FIELD}
          component={TextInputField}
          label={translations[messages.shortDescription.id]}
          validate={[strLength15x250, required]}
          warn={[strLength15x100, required]}
          tip={translations[messages.shortDescriptionTip.id]}
          splitInHalf
        />

        <Field
          disabled={createCommunityLoading}
          name={COMM_MAIN_DESCRIPTION_FIELD}
          component={TextareaField}
          label={translations[messages.whyWeNeedIt.id]}
          validate={[strLength20x1000, required]}
          warn={[strLength20x1000, required]}
          tip={translations[messages.whyWeNeedItTip.id]}
          splitInHalf
        />

        <div>
          <Wrapper label={translations[messages.tags.id]} splitInHalf>
            <FormattedMessage
              {...messages.tagsAreNeeded}
              values={{ max: MAX_TAGS_NUMBER, min: MIN_TAGS_NUMBER }}
            />
          </Wrapper>

          <FormSection name="tags">
            {tags.map((x, index) => (
              <FormSection
                key={x}
                name={`${TAG_SECTION}_${x}`}
                id={formatStringToHtmlId(`${TAG_SECTION}_${x}`)}
              >
                {index >= MIN_TAGS_NUMBER && (
                  <button
                    type="button"
                    data-key={x}
                    onClick={removeTag}
                    tabIndex="-1"
                  >
                    <Icon
                      width="14"
                      icon={closeIcon}
                      color={TEXT_SECONDARY_LIGHT}
                    />
                  </button>
                )}

                <Field
                  disabled={createCommunityLoading}
                  name={TAG_NAME_FIELD}
                  component={TextInputField}
                  placeholder={translations[messages.tagTitle.id]}
                  validate={[
                    strLength3x20,
                    required,
                    valueHasNotBeInListMoreThanOneTime,
                  ]}
                  warn={[
                    strLength3x20,
                    required,
                    valueHasNotBeInListMoreThanOneTime,
                  ]}
                  tip={translations[messages.tagTitleTip.id]}
                  splitInHalf
                  insideOfSection
                />

                <Field
                  disabled={createCommunityLoading}
                  name={TAG_DESCRIPTION_FIELD}
                  component={TextareaField}
                  placeholder={translations[messages.tagDescription.id]}
                  validate={[strLength20x1000, required]}
                  warn={[strLength20x1000, required]}
                  tip={translations[messages.tagDescriptionTip.id]}
                  splitInHalf
                />
              </FormSection>
            ))}
          </FormSection>
        </div>

        <TransparentButton
          className="d-flex align-items-center"
          type="button"
          onClick={addTag}
          tabIndex="-1"
          id={ADD_TAG_BUTTON_ID}
        >
          <img className="mr-2" src={icoTag} alt="icoTag" />
          <FormattedMessage {...messages.oneMoreTag} />
        </TransparentButton>

        <LargeButton
          disabled={createCommunityLoading}
          type="submit"
          id={CREATE_COMMUNITY_BUTTON}
        >
          {translations[messages.createCommunity.id]}
        </LargeButton>
      </FormBox>
    </ExtendedBase>
  );
};

CreateCommunityForm.propTypes = {
  handleSubmit: PropTypes.func,
  createCommunity: PropTypes.func,
  createCommunityLoading: PropTypes.bool,
  translations: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  change: PropTypes.func,
};

/* eslint import/no-mutable-exports: 0, consistent-return: 0 */
let FormClone = reduxForm({
  form: FORM_NAME,
  onSubmitFail: err => {
    const errors = {
      ...err,
      ...err.tags,
    };

    delete errors.tags;

    scrollToErrorField(errors);
  },
})(CreateCommunityForm);

FormClone = connect(state => {
  const form = state.toJS().form[FORM_NAME] || { values: {} };

  if (form.values && form.values.tags) {
    const { tags } = form.values;
    const tagNames = Object.keys(tags)
      .filter(x => tags[x])
      .map(x => tags[x][TAG_NAME_FIELD]);

    return {
      valueHasNotBeInListValidate: tagNames,
    };
  }
})(FormClone);

export default FormClone;
