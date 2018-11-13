import React from 'react';
import AuthenticatedButton from 'containers/AuthenticatedButton';

const AddComment = () => (
  <div className="add-comment">
    <form>
      <textarea className="form-control" />
      <AuthenticatedButton
        buttonAction={() => {}}
        className="btn btn-secondary"
        buttonContent="Post comment"
      />
    </form>
  </div>
);

export default AddComment;
