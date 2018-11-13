import React from 'react';
import AuthenticatedButton from 'containers/AuthenticatedButton';

const AddComment = () => (
  <div className="add-comment">
    <form>
      <textarea className="form-control" />
      <AuthenticatedButton
        buttonAction={() => {}}
        buttonClass="btn btn-secondary"
        buttonContent="Post comment"
      />
    </form>
  </div>
);

export default AddComment;
