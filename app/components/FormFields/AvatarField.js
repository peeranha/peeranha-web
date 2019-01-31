import React from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import { FormattedMessage } from 'react-intl';

import messages from 'containers/Profile/messages';
import WarningMessage from './WarningMessage';

/* istanbul ignore next */
export const displayImageFunc = (edImg, cachedImg, savedImg) =>
  edImg && (cachedImg || savedImg);

/* istanbul ignore next */
export const displayAvatarFunc = (edImg, cachedImg) => !edImg && cachedImg;

/* istanbul ignore next */
function AvatarField({ input, label, disabled, sendProps, meta }) {
  let avatarRefs;

  const {
    editingImgState,
    cachedProfileImg,
    profile,
    getCroppedAvatar,
    uploadImage,
    clearImageChanges,
  } = sendProps;

  const displayImage = displayImageFunc(
    editingImgState,
    cachedProfileImg,
    profile.ipfs_avatar,
  );

  const displayAvatar = displayAvatarFunc(editingImgState, cachedProfileImg);

  return (
    <div>
      {displayImage && (
        <div className="d-flex justify-content-center">
          <img
            src={cachedProfileImg || profile.ipfs_avatar}
            className="profile-image"
            alt=""
          />
        </div>
      )}

      {displayAvatar && (
        <div>
          <div className="d-flex justify-content-center">
            <AvatarEditor
              image={cachedProfileImg}
              ref={refs => {
                avatarRefs = refs;
              }}
            />
          </div>
          <div className="d-flex wrap-nowrap">
            <button
              id="getcroppedavatar"
              disabled={disabled}
              className="btn btn-secondary w-50 mr-1"
              onClick={() => getCroppedAvatar(avatarRefs)}
              type="button"
              key="mr-1"
            >
              <FormattedMessage {...messages.saveButton} />
            </button>
            <button
              disabled={disabled}
              className="btn btn-secondary w-50 ml-1"
              onClick={clearImageChanges}
              type="button"
              key="ml-1"
            >
              <FormattedMessage {...messages.cancelButton} />
            </button>
          </div>
        </div>
      )}
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="avatar1">
            {label}
          </span>
        </div>
        <div className="custom-file">
          <input
            disabled={disabled}
            {...input}
            type="file"
            onChange={uploadImage}
            className="custom-file-input"
            id="avatarFile"
            value={undefined}
            aria-describedby="avatar1"
          />
          <label className="custom-file-label" htmlFor="avatarFile">
            <FormattedMessage {...messages.chooseFile} />
          </label>
        </div>
      </div>
      <WarningMessage {...meta} />
    </div>
  );
}

AvatarField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  sendProps: PropTypes.object,
};

export default AvatarField;
