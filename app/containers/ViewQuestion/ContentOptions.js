import React from 'react';
import PropTypes from 'prop-types';

import messages from './messages';
import Button from './Button';

import { contentOptionsClass, contentOptionsAttr } from './constants';

const setDataAttr = e => {
  e.target.parentElement.dataset[contentOptionsAttr] = !JSON.parse(
    e.target.parentElement.dataset[contentOptionsAttr] || false,
  );
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const ContentOptions = ({
  buttonParams,
  translations,
  isItWrittenByMe,
  editItem,
  type,
  answerId,
  deleteItem,
  voteToDelete,
}) => (
  <div className={contentOptionsClass}>
    <Button
      show
      buttonParams={buttonParams}
      buttonName={translations[messages.commentButton.id]}
      buttonClick={setDataAttr}
    />
    <Button
      show={isItWrittenByMe}
      buttonParams={buttonParams}
      buttonName={translations[messages.editButton.id]}
      buttonClick={editItem}
    />
    <Button
      show={isItWrittenByMe}
      buttonId={`${type}_delete_${answerId}`}
      buttonParams={buttonParams}
      buttonName={translations[messages.deleteButton.id]}
      buttonClick={deleteItem}
    />
    <Button
      show
      buttonId={`${type}_vote_to_delete_${answerId}`}
      buttonParams={buttonParams}
      buttonName={translations[messages.voteToDelete.id]}
      buttonClick={voteToDelete}
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
