import React from 'react';
import PropTypes from 'prop-types';

import messages from './messages';

const EditButton = props =>
  props.isItWrittenByMe ? (
    <button onClick={props.editContent}>
      {props.translations[messages.editButton.id]}
    </button>
  ) : null;

EditButton.propTypes = {
  isItWrittenByMe: PropTypes.bool,
  editContent: PropTypes.func,
  translations: PropTypes.object,
};

export default EditButton;
