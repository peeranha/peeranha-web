import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const Box = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

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
    <Box>
      {questionTags.map(x => (
        <Tag className={className} key={x.name}>
          {x.name}
        </Tag>
      ))}

      {children}
    </Box>
  );
};

TagsList.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  chosenTags: PropTypes.array,
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export { Tag, Box };
export default TagsList;
