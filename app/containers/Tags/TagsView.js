import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const TagsView = ({ tags }) => (
  <div>
    {_.orderBy(tags, y => y.popularity, ['desc']).map(x => (
      <div
        style={{ boxShadow: '0 0 2px rgba(0,0,0,0.2)' }}
        className="mb-2 p-2"
        key={x.value}
      >
        <div className="mb-1 d-flex justify-content-between align-items-center">
          <span>{x.label}</span>
        </div>
      </div>
    ))}
  </div>
);

TagsView.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default TagsView;
