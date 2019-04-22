import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, FormSection } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';

import icoTag from 'images/icoTag.svg';
import closeIcon from 'svg/close';

import Wrapper from 'components/FormFields/Wrapper';
import TextareaField from 'components/FormFields/TextareaField';
import TextInputField from 'components/FormFields/TextInputField';
import AvatarField from 'components/FormFields/AvatarField';
import LargeButton from 'components/Button/Contained/InfoLarge';
import TransparentButton from 'components/Button/Contained/Transparent';
import Icon from 'components/Icon';

import FormStyled from 'containers/EditProfilePage/FormStyled';
import AvatarStyled from 'containers/EditProfilePage/AvatarStyled';

import {
  AVATAR_FIELD_WIDTH,
  AVATAR_FIELD_MARGIN,
} from 'containers/EditProfilePage/ProfileEditForm';

import {
  imageValidation,
  strLength3x20,
  required,
  strLength20x1000,
} from 'components/FormFields/validate';

import messages from './messages';

import {
  COMM_AVATAR_FIELD,
  COMM_NAME_FIELD,
  COMM_SHORT_DESCRIPTION_FIELD,
  COMM_MAIN_DESCRIPTION_FIELD,
  TAG_NAME_FIELD,
  TAG_DESCRIPTION_FIELD,
  TAG_SECTION,
} from './constants';

const DEFAULT_TAGS_NUMBER = 3;
const DEFAULT_TAGS_ARRAY = [];

/* eslint no-plusplus: 0 */
for (let i = 0; i < DEFAULT_TAGS_NUMBER; i++) {
  DEFAULT_TAGS_ARRAY.push(i);
}

/* eslint-disable-next-line */
export const CreateCommunityForm = /* istanbul ignore next */ ({
  handleSubmit,
  createCommunity,
  createCommunityLoading,
  translations,
  change,
  editingImgState,
  uploadImage,
  cachedProfileImg,
  getCroppedAvatar,
  clearImageChanges,
}) => {
  const [tags, changeTags] = useState(DEFAULT_TAGS_ARRAY);

  const removeTag = e => {
    if (tags.length === 1) return;

    const { key } = e.currentTarget.dataset;
    const index = tags.findIndex(x => x === +key);

    // clear redux store
    change(`${TAG_NAME_FIELD}_${key}`, null);
    change(`${TAG_DESCRIPTION_FIELD}_${key}`, null);

    // clear array
    const tagsCopy = [...tags];
    tagsCopy.splice(index, 1);

    changeTags(tagsCopy);
  };

  const addTag = () => {
    changeTags([...tags, tags[tags.length - 1] + 1]);
  };

  return (
    <FormStyled
      size={AVATAR_FIELD_WIDTH + AVATAR_FIELD_MARGIN}
      onSubmit={handleSubmit(createCommunity)}
    >
      <div className="position-static">
        <AvatarStyled>
          <Field
            editingImgState={editingImgState}
            uploadImage={uploadImage}
            cachedProfileImg={cachedProfileImg}
            ipfsAvatar={null}
            getCroppedAvatar={getCroppedAvatar}
            clearImageChanges={clearImageChanges}
            disabled={createCommunityLoading}
            name={COMM_AVATAR_FIELD}
            label={translations[messages.avatar.id]}
            component={AvatarField}
            validate={imageValidation}
            warn={imageValidation}
            size={AVATAR_FIELD_WIDTH}
          />
        </AvatarStyled>

        <Field
          disabled={createCommunityLoading}
          name={COMM_NAME_FIELD}
          component={TextInputField}
          label={translations[messages.communityTitle.id]}
          validate={[strLength3x20, required]}
          warn={[strLength3x20, required]}
          tip={translations[messages.communityTitleTip.id]}
        />

        <Field
          disabled={createCommunityLoading}
          name={COMM_SHORT_DESCRIPTION_FIELD}
          component={TextInputField}
          label={translations[messages.shortDescription.id]}
          validate={[strLength3x20, required]}
          warn={[strLength3x20, required]}
          tip={translations[messages.shortDescriptionTip.id]}
        />

        <Field
          disabled={createCommunityLoading}
          name={COMM_MAIN_DESCRIPTION_FIELD}
          component={TextareaField}
          label={translations[messages.whyWeNeedIt.id]}
          validate={[strLength20x1000, required]}
          warn={[strLength20x1000, required]}
          tip={translations[messages.whyWeNeedItTip.id]}
        />

        <div>
          <Wrapper label={translations[messages.tags.id]} tip>
            <FormattedMessage {...messages.tagsAreNeeded} />
          </Wrapper>

          <FormSection name="tags" className="mt-3">
            {tags.map(x => (
              <FormSection name={`${TAG_SECTION}_${x}`}>
                {x !== tags[0] && (
                  <button
                    type="button"
                    style={{ transform: 'scale(0.75)' }}
                    data-key={x}
                    onClick={removeTag}
                  >
                    <Icon icon={closeIcon} />
                  </button>
                )}

                <Field
                  disabled={createCommunityLoading}
                  name={`${TAG_NAME_FIELD}_${x}`}
                  component={TextInputField}
                  placeholder={translations[messages.tagTitle.id]}
                  validate={[strLength3x20, required]}
                  warn={[strLength3x20, required]}
                  tip={translations[messages.tagTitleTip.id]}
                />

                <Field
                  disabled={createCommunityLoading}
                  name={`${TAG_DESCRIPTION_FIELD}_${x}`}
                  component={TextareaField}
                  placeholder={translations[messages.tagDescription.id]}
                  validate={[strLength20x1000, required]}
                  warn={[strLength20x1000, required]}
                  tip={translations[messages.tagDescriptionTip.id]}
                />
              </FormSection>
            ))}
          </FormSection>
        </div>

        <div>
          <TransparentButton
            className="d-flex align-items-center"
            type="button"
            onClick={addTag}
          >
            <img className="mr-2" src={icoTag} alt="icoTag" />
            <FormattedMessage {...messages.oneMoreTag} />
          </TransparentButton>
        </div>

        <div>
          <LargeButton
            className="my-3"
            disabled={createCommunityLoading}
            typeAttr="submit"
          >
            {translations[messages.createCommunity.id]}
          </LargeButton>
        </div>
      </div>
    </FormStyled>
  );
};

CreateCommunityForm.propTypes = {
  handleSubmit: PropTypes.func,
  createCommunity: PropTypes.func,
  createCommunityLoading: PropTypes.bool,
  translations: PropTypes.object,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  editingImgState: PropTypes.bool,
  cachedProfileImg: PropTypes.string,
  getCroppedAvatar: PropTypes.func,
  uploadImage: PropTypes.func,
  change: PropTypes.func,
  clearImageChanges: PropTypes.func,
};

export default reduxForm({
  form: 'CreateCommunityForm',
})(CreateCommunityForm);
