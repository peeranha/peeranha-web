import React from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';
import { FormattedMessage } from 'react-intl';

import {
  AvatarEditorBorder,
  AvatarEditorWidth,
  AvatarEditorColor,
  AvatarEditorScale,
  AvatarEditorRotate,
} from './Wrapper';

import messages from './messages';

/* eslint-disable */
function renderFileInput({
  input,
  label,
  sendProps,
  meta: { touched, error, warning },
}) {
  let avatarRefs;
  let avatarWidth = window.innerWidth > 480 ? AvatarEditorWidth : 320 - 2*AvatarEditorBorder;
  return (
    <div>
      {sendProps.editingImgState && (
        <img
          src={sendProps.cashedProfileImg || sendProps.profile.savedProfileImg}
          className="w-100"
          alt=""
          key="w-100"
        />
      )}

      {!sendProps.editingImgState &&
        sendProps.cashedProfileImg && (
        <div>
          <AvatarEditor
            image={sendProps.cashedProfileImg}
            ref={refs => (avatarRefs = refs)}
            width={avatarWidth}
            border={AvatarEditorBorder}
            color={AvatarEditorColor}
            scale={AvatarEditorScale}
            rotate={AvatarEditorRotate}
          />
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
      {
        sendProps.isOwner && (
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
        )
      }
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
