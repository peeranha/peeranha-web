import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm, FormSection } from 'redux-form/immutable';
import { useTranslation } from 'react-i18next';

import {
  PEER_PRIMARY_COLOR,
  PEER_WARNING_COLOR,
  TEXT_SECONDARY_LIGHT,
} from 'style-constants';

import icoTag from 'images/icoTag.svg?inline';
import closeIcon from 'images/close.svg?external';

import { formatStringToHtmlId, scrollToErrorField } from 'utils/animation';
import { showPopover } from 'utils/popover';

import {
  required,
  strLength2x15,
  strLength3x20,
  strLength20x1000,
  strLength15x250,
  strLength100Max,
  imageValidation,
  valueHasNotBeInListMoreThanOneTime,
  validateURL,
} from 'components/FormFields/validate';

import { ExtendedBase } from 'components/Base/AvatarBase';
import Wrapper from 'components/FormFields/Wrapper';
import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import AvatarField from 'components/FormFields/AvatarField';
import { IconSm } from 'components/Icon/IconWithSizes';
import FormBox from 'components/Form';
import LargeButton from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';

import {
  FORM_NAME,
  COMMUNITY_TYPE,
  COMM_AVATAR_FIELD,
  COMM_NAME_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  COMM_OFFICIAL_SITE_FIELD,
  TAG_NAME_FIELD,
  TAG_DESCRIPTION_FIELD,
  TAG_SECTION,
  CREATE_COMMUNITY_BUTTON,
  MAIN_COLOR_FIELD,
  HIGHLIGHT_COLOR_FIELD,
  FORM_TYPE,
  ANY_TYPE,
} from './constants';

import BloggerModeForm from './BloggerModeForm';

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
  change,
  formValues,
}) => {
  const { t } = useTranslation();
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
      showPopover(ADD_TAG_BUTTON_ID, t('createCommunity.maxTagsNumberReached'));
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
          label={t('createCommunity.communityTitle')}
          validate={[strLength3x20, required]}
          warn={[strLength3x20, required]}
          tip={t('createCommunity.communityTitleTip')}
          splitInHalf
        />

        <Field
          disabled={createCommunityLoading}
          name={COMM_SHORT_DESCRIPTION_FIELD}
          component={TextInputField}
          label={t('createCommunity.shortDescription')}
          validate={[strLength15x250, required]}
          warn={[strLength15x250, required]}
          tip={t('createCommunity.shortDescriptionTip')}
          splitInHalf
        />

        <Field
          disabled={createCommunityLoading}
          name={COMM_OFFICIAL_SITE_FIELD}
          component={TextInputField}
          label={t('createCommunity.website')}
          validate={[validateURL, strLength100Max]}
          warn={[validateURL]}
          placeholder="https://example.com"
          tip={t('createCommunity.websiteTip')}
          splitInHalf
        />

        {+formValues[COMMUNITY_TYPE] ? (
          <BloggerModeForm
            disabled={createCommunityLoading}
            formValues={formValues}
          />
        ) : null}

        <div>
          <Wrapper label={t('createCommunity.tags')} splitInHalf>
            {t('createCommunity.tagsAreNeeded', {
              max: MAX_TAGS_NUMBER,
              min: MIN_TAGS_NUMBER,
            })}
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
                    <IconSm icon={closeIcon} color={TEXT_SECONDARY_LIGHT} />
                  </button>
                )}

                <Field
                  disabled={createCommunityLoading}
                  name={TAG_NAME_FIELD}
                  component={TextInputField}
                  placeholder={t('createCommunity.tagTitle')}
                  validate={[
                    strLength2x15,
                    required,
                    valueHasNotBeInListMoreThanOneTime,
                  ]}
                  warn={[
                    strLength2x15,
                    required,
                    valueHasNotBeInListMoreThanOneTime,
                  ]}
                  tip={t('createCommunity.tagTitleTip')}
                  splitInHalf
                  insideOfSection
                />

                <Field
                  disabled={createCommunityLoading}
                  name={TAG_DESCRIPTION_FIELD}
                  component={TextareaField}
                  placeholder={t('createCommunity.tagDescription')}
                  validate={[strLength20x1000, required]}
                  warn={[strLength20x1000, required]}
                  tip={t('createCommunity.tagDescriptionTip')}
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
          {t('createCommunity.oneMoreTag')}
        </TransparentButton>

        <LargeButton
          disabled={createCommunityLoading}
          type="submit"
          id={CREATE_COMMUNITY_BUTTON}
        >
          {t('createCommunity.createCommunity')}
        </LargeButton>
      </FormBox>
    </ExtendedBase>
  );
};

CreateCommunityForm.propTypes = {
  handleSubmit: PropTypes.func,
  createCommunity: PropTypes.func,
  createCommunityLoading: PropTypes.bool,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  change: PropTypes.func,
  formValues: PropTypes.object,
};

const FormCloneRedux = reduxForm({
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

export default memo(
  connect(state => {
    const form = state.toJS().form[FORM_NAME] || { values: {} };

    if (form.values && form.values.tags) {
      const { tags } = form.values;
      const tagNames = Object.keys(tags)
        .filter(x => tags[x])
        .map(x => tags[x][TAG_NAME_FIELD]);
      return {
        valueHasNotBeInListValidate: tagNames,
        formValues: form?.values ?? {},
      };
    }

    return {
      formValues: form?.values ?? {},
      initialValues: {
        [COMMUNITY_TYPE]: 0,
        [MAIN_COLOR_FIELD]: PEER_PRIMARY_COLOR,
        [HIGHLIGHT_COLOR_FIELD]: PEER_WARNING_COLOR,
        [FORM_TYPE]: ANY_TYPE,
      },
    };
  })(FormCloneRedux),
);
