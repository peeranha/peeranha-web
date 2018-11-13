import React from 'react';

import AuthenticatedButton from 'containers/AuthenticatedButton';
import AddComment from './AddComment';
import Comments from './Comments';

/* eslint no-param-reassign: ["error", { "props": false }] */
const ContentOptions = props => (
  <div className="content-options">
    <button
      className="option"
      onClick={e => {
        e.target.dataset.opened = !JSON.parse(e.target.dataset.opened || false);
      }}
    >
      Comment
    </button>
    {' | '}
    <AuthenticatedButton
      buttonAction={e => console.log(e.target.dataset)}
      className="option"
      buttonContent="Edit"
    />
    <Comments {...props} />
    <AddComment />
  </div>
);

export default ContentOptions;
