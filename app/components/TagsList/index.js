import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import history from 'createdHistory';

import { TAG_COLOR, BORDER_RADIUS_S } from 'style-constants';

import {
  singleCommunityFonts,
  isSingleCommunityWebsite,
  graphCommunityColors,
} from 'utils/communityManagement';

import Span from 'components/Span';
import Button from 'components/Button';

const fonts = singleCommunityFonts();
const single = isSingleCommunityWebsite();
const graphCommunity = graphCommunityColors();

const Tag = Span.extend`
  max-width: 100%;
  background: ${graphCommunity ? 'rgba(111, 76, 255, 0.16) !important' : 'none'};
  overflow: hidden;
  border: none;
  color: ${graphCommunity ? 'rgba(225, 225, 228, 1) !important' : TAG_COLOR};
  font-size: ${graphCommunity ? '10px' : '14px'};
  height: 24px;
  border-radius: ${graphCommunity ? '10px !important' : BORDER_RADIUS_S};
  margin-bottom: 2px;
  margin-right: 8px;
  padding-left: 10px;
  padding-right: 10px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
`;
const Box = styled.ul`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;

const TagsList = ({ tags, communities, communityId, children, className }) => {
  const community = useMemo(
    () => communities.filter((x) => communityId === x.id)[0] || { tags: [] },
    [communities, communities.length],
  );

  if (!community || !tags?.length) return null;

  const redirectToFilterByTag = (id) => {
    const searchParams = new URLSearchParams(history.location.search);
    const searchParamsTags = searchParams.get('tags');
    const newSearchParamsTags = (tagsParams, tagId) => {
      const allTags = tagsParams?.split(',');
      if (!tagsParams) {
        return tagId;
      }
      if (!allTags?.includes(tagId)) {
        return `${tagsParams},${tagId}`;
      }

      return tagsParams;
    };
    searchParams.set('tags', newSearchParamsTags(searchParamsTags, id));
    history.push(`${history.location.pathname}?${searchParams}`);
  };

  return (
    <Box>
      {tags.map((tag, index) => (
        <li key={community.id + (tag.id || index)} className="d-flex flex-column">
          <Tag letterSpacing={fonts.tagsLetterSpacing} className={className}>
            {single ? (
              <Button
                css={{
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  fontWeight: 500,
                }}
                onClick={() => {
                  redirectToFilterByTag(tag.id);
                }}
              >
                {tag.name}
              </Button>
            ) : (
              tag.name
            )}
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
  match: PropTypes.object,
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export { Tag, Box };
export default TagsList;
