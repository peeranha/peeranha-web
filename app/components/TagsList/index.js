import React from 'react';
import PropTypes from 'prop-types';

const TagsList = ({ chosenTags, communities, communityId }) => {
  const community = communities.filter(x => communityId === x.id)[0];

  if (!community) return null;

  const questionTags = chosenTags
    ? community.tags.filter(x => chosenTags.includes(x.id))
    : community.tags;

  return (
    <div>
      {questionTags.map(x => (
        <span className="badge badge-secondary mr-1" key={x.name}>
          {x.name}
        </span>
      ))}
    </div>
  );
};

TagsList.propTypes = {
  chosenTags: PropTypes.array,
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TagsList;
