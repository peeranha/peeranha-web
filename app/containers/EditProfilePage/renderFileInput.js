import React from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import { FormattedMessage } from 'react-intl';

import {
  AvatarEditorBorder,
  AvatarEditorBorderRadius,
  AvatarEditorSize,
  AvatarEditorColor,
  AvatarEditorScale,
  AvatarEditorRotate,
  AvatarCrossOrigin,
} from 'containers/Profile/Wrapper';

import messages from 'containers/Profile/messages';

/* eslint-disable */
function renderFileInput({
  input,
  label,
  sendProps,
  meta: { touched, error, warning },
}) {
  let avatarRefs;

  return (
    <div>
      {sendProps.editingImgState && 
      (sendProps.cachedProfileImg || sendProps.profile.savedProfileImg) && (
        <div className="d-flex justify-content-center">
          <img
            src={sendProps.cachedProfileImg || sendProps.profile.savedProfileImg}
            className="profile-image"
            alt=""
          />  
        </div>
      )}

      {!sendProps.editingImgState &&
        sendProps.cachedProfileImg && (
        <div>
          <div className="d-flex justify-content-center">
            <AvatarEditor
              image={sendProps.cachedProfileImg}
              ref={refs => (avatarRefs = refs)}
              width={AvatarEditorSize}
              height={AvatarEditorSize}
              color={AvatarEditorColor}
              scale={AvatarEditorScale}
              rotate={AvatarEditorRotate}
              border={AvatarEditorBorder}
              crossOrigin={AvatarCrossOrigin}
              borderRadius={AvatarEditorBorderRadius}
            />
          </div>
          <div className="d-flex wrap-nowrap">
            <button
              className="btn btn-secondary w-50 mr-1"
              onClick={() => sendProps.getCroppedAvatar(avatarRefs)}
              type="button"
              key="mr-1"
            >
              <FormattedMessage {...messages.saveButton} />
            </button>
            <button
              className="btn btn-secondary w-50 ml-1"
              onClick={() => sendProps.clearImageChanges()}
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
            {...input}
            type="file"
            onChange={sendProps.uploadImage}
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
    <h6 className="text-danger">
      {touched &&
        ((error && <span>{sendProps.translations[error]}</span>) ||
          (warning && <span>{sendProps.translations[warning]}</span>))}
      </h6>
    </div>
  );
}
/* eslint-enable */

renderFileInput.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  sendProps: PropTypes.object.isRequired,
};

export default renderFileInput;
