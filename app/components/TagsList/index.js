import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { TEXT_SECONDARY, TAG_COLOR, BORDER_RADIUS_S } from 'style-constants';

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

const TagsList = ({
  chosenTags,
  communities,
  communityId,
  children,
  className,
  showPopularity,
}) => {
  const community = useMemo(
    () => communities.filter(x => +communityId === x.id)[0] || { tags: [] },
    [communities, communities.length],
  );

  const questionTags = useMemo(
    () =>
      chosenTags
        ? community.tags.filter(x => chosenTags.includes(+x.id.split('-')[1]))
        : community.tags,
    [chosenTags, community.tags, community.tags.length],
  );

  if (!community || !community.tags.length) return null;

  return (
    <Box>
      {questionTags.map((x, index) => {
        return (
          <li
            key={community.id + (x.name || index)}
            className="d-flex flex-column"
          >
            <Tag letterSpacing={fonts.tagsLetterSpacing} className={className}>
              {x.name}
            </Tag>

            {showPopularity && (
              <Span color={TEXT_SECONDARY} fontSize="14" lineHeight="18">
                {x.questionsAsked}
              </Span>
            )}
          </li>
        );
      })}

      {children}
    </Box>
  );
};

TagsList.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  chosenTags: PropTypes.array,
  communities: PropTypes.array,
  showPopularity: PropTypes.bool,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export { Tag, Box };
export default TagsList;
