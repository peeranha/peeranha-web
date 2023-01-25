import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TAG_COLOR, BORDER_RADIUS_S } from 'style-constants';

import Span from 'components/Span';

import { singleCommunityFonts } from 'utils/communityManagement';

const fonts = singleCommunityFonts();

const Tag = Span.extend`
  border: 1px solid ${TAG_COLOR};
  color: ${TAG_COLOR};
  font-size: 14px;
  height: 24px;
  border-radius: ${BORDER_RADIUS_S};
  margin-bottom: 2px;
  margin-right: 8px;
  padding-left: 10px;
  padding-right: 10px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
`;
const Box = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const TagsList = ({ tags, communities, communityId, children, className }) => {
  const community = useMemo(
    () => communities.filter((x) => +communityId === x.id)[0] || { tags: [] },
    [communities, communities.length],
  );

  if (!community || !tags?.length) return null;

  return (
    <Box>
      {tags.map((tag, index) => (
        <li
          key={community.id + (tag.name || index)}
          className="d-flex flex-column"
        >
          <Tag letterSpacing={fonts.tagsLetterSpacing} className={className}>
            {tag.name}
          </Tag>
        </li>
      ))}

      {children}
    </Box>
  );
};

TagsList.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  tags: PropTypes.array,
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export { Tag, Box };
export default TagsList;
