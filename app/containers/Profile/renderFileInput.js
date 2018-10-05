import React from 'react';
import PropTypes from 'prop-types';
import AvatarEditor from 'react-avatar-editor';

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
      {sendProps.editImageStatus && (
        <img
          src={sendProps.cashedProfileImg || sendProps.profile.savedProfileImg}
          className="w-100"
          alt=""
          key="w-100"
        />
      )}

      {!sendProps.editImageStatus &&
        sendProps.cashedProfileImg && (
        <div>
          <AvatarEditor
            image={sendProps.cashedProfileImg}
            ref={refs => (avatarRefs = refs)}
            width={420}
            border={30}
            color={[255, 255, 255, 0.6]}
            scale={1.5}
            rotate={0}
          />
          <div className="d-flex wrap-nowrap">
            <button
              className="btn btn-secondary w-50 mr-1"
              onClick={() => sendProps.getCroppedAvatar(avatarRefs)}
              type="button"
              key="mr-1"
            >
                Save
            </button>
            <button
              className="btn btn-secondary w-50 ml-1"
              onClick={() => sendProps.clearImageChanges()}
              type="button"
              key="ml-1"
            >
                Cancel
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
            Choose file
          </label>
        </div>
      </div>
      <h6 className="text-danger">
        {touched &&
          ((error && <span>{error}</span>) ||
            (warning && <span>{warning}</span>))}
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
