import React from 'react';
import PropTypes from 'prop-types';

import messages from './messages';
import Button from './Button';

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
    <Button
      buttonParams={props.buttonParams}
      isItWrittenByMe={props.isItWrittenByMe}
      buttonName={props.translations[messages.editButton.id]}
      buttonClick={props.editItem}
    />
    <Button
      buttonId={`${props.type}_delete_${props.answerId}`}
      buttonParams={props.buttonParams}
      isItWrittenByMe={props.isItWrittenByMe}
      buttonName={props.translations[messages.deleteButton.id]}
      buttonClick={props.deleteItem}
    />
    <Button
      buttonId={`${props.type}_vote_to_delete_${props.answerId}`}
      buttonParams={props.buttonParams}
      isItWrittenByMe
      buttonName={props.translations[messages.voteToDelete.id]}
      buttonClick={props.voteToDelete}
    />
  </div>
);

ContentOptions.propTypes = {
  translations: PropTypes.object,
  buttonParams: PropTypes.object,
  isItWrittenByMe: PropTypes.bool,
  editItem: PropTypes.func,
  voteToDelete: PropTypes.func,
  deleteItem: PropTypes.func,
  type: PropTypes.string,
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export { setDataAttr };
export default ContentOptions;
