import React from 'react';
import PropTypes from 'prop-types';

/* eslint-disable jsx-a11y/label-has-for */
function renderFileInput({
  input,
  label,
  uploadImageFunc,
  image,
  meta: { touched, error, warning },
}) {
  return (
    <div>
      {image && (
        <img src={image} className="rounded" style={{ width: '100%' }} alt="" />
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
            onChange={uploadImageFunc}
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

renderFileInput.propTypes = {
  input: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.object.isRequired,
  uploadImageFunc: PropTypes.func.isRequired,
};

export default renderFileInput;
