import React from 'react';
import PropTypes from 'prop-types';

import messages from './messages';
import EditButton from './EditButton';

const setDataAttr = e => {
  e.target.parentElement.dataset.opened = !JSON.parse(
    e.target.parentElement.dataset.opened || false,
  );
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const ContentOptions = props => (
  <div className="content-options">
    <button onClick={setDataAttr}>
      {props.translations[messages.commentButton.id]}
    </button>
    <EditButton {...props} />
  </div>
);

ContentOptions.propTypes = {
  translations: PropTypes.object,
  isItWrittenByMe: PropTypes.bool,
};

export { setDataAttr };
export default ContentOptions;
