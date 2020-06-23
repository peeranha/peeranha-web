import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import _get from 'lodash/get';

import { TEXT_SECONDARY, TAG_COLOR } from 'style-constants';

import Span from 'components/Span';

import { singleCommunityFonts, singleCommunityStyles } from 'utils/communityManagement';

const styles = singleCommunityStyles();
const fonts = singleCommunityFonts();

const Tag = Span.extend`
  border: 1px solid ${TAG_COLOR};
  color: ${TAG_COLOR};
  font-size: 14px;
  height: 24px;
  border-radius: ${_get(styles, 'buttonsBorderRadius', '2px')};
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
    () => communities.filter(x => communityId === x.id)[0] || { tags: [] },
    [communities, communities.length],
  );

  const questionTags = useMemo(
    () =>
      chosenTags
        ? community.tags.filter(x => chosenTags.includes(x.id))
        : community.tags,
    [chosenTags, community.tags, community.tags.length],
  );

  if (!community || !community.tags.length) return null;

  return (
    <Box>
      {questionTags.map(x => (
        <li key={x.name} className="d-flex flex-column">
          <Tag letterSpacing={fonts.tagsLetterSpacing} className={className}>
            {x.name}
          </Tag>

          {showPopularity && (
            <Span color={TEXT_SECONDARY} fontSize="14" lineHeight="18">
              {x.questions_asked}
            </Span>
          )}
        </li>
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
  showPopularity: PropTypes.bool,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export { Tag, Box };
export default TagsList;
