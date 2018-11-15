import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from './messages';

const EditButton = props =>
  props.isItWrittenByMe ? (
    <button onClick={() => console.log('redirect to another page to edit')}>
      <FormattedMessage {...messages.editButton} />
    </button>
  ) : null;

EditButton.propTypes = {
  isItWrittenByMe: PropTypes.bool,
};

export default EditButton;
