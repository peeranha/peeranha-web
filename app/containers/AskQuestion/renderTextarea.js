import React from 'react';
import PropTypes from 'prop-types';
import TextEditor from 'components/TextEditor';

import messages from './messages';

function renderTextarea({ translations, disabled }) {
  return (
    <div>
      <h6>{translations[messages.contentLabel.id]}</h6>
      <TextEditor disabled={disabled} />
    </div>
  );
}

renderTextarea.propTypes = {
  disabled: PropTypes.bool,
  translations: PropTypes.object,
};

export default renderTextarea;
