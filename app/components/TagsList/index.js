import React from 'react';
import PropTypes from 'prop-types';

import { BORDER_PRIMARY, TEXT_PRIMARY } from 'style-constants';
import Span from 'components/Span';

const Tag = Span.extend`
  border: 1px solid ${BORDER_PRIMARY};
  color: ${TEXT_PRIMARY};
  font-size: 14px;
  border-radius: 2px;
  margin-right: 8px;
  padding: 2px 10px;
`.withComponent('li');

const TagsList = /* istanbul ignore next */ ({
  chosenTags,
  communities,
  communityId,
  children,
  className,
}) => {
  const community = communities.filter(x => communityId === x.id)[0];

  if (!community) return null;

  const questionTags = chosenTags
    ? community.tags.filter(x => chosenTags.includes(x.id))
    : community.tags;

  return (
    <ul className="d-flex flex-wrap align-items-center">
      {questionTags.map(x => (
        <Tag className={className} key={x.name}>
          {x.name}
        </Tag>
      ))}

      {children}
    </ul>
  );
};

TagsList.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  chosenTags: PropTypes.array,
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TagsList;
