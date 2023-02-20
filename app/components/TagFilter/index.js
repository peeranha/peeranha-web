import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  PEER_PRIMARY_COLOR,
  BORDER_RADIUS_L,
  TEXT_LIGHT,
} from 'style-constants';
import { Tag } from 'components/TagsList';
import ScrollContainer from 'components/ScrollContainer';

import createdHistory from 'createdHistory';
import { singleCommunityColors } from 'utils/communityManagement';
import { getSearchParams } from 'utils/url';

import FailedTransactionIcon from 'icons/FailedTransaction';

const colors = singleCommunityColors();

const TagFilterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  padding: 20px 0px;
  max-width: 50%;
  @media only screen and (max-width: 768px) {
    padding-bottom: 10px;
    grid-column-start: 1;
    grid-column-end: 3;
    grid-template-columns: 1fr;
    align-items: center;
    padding: 8px 0px;
    max-width: 100%;
    button {
      flex: auto;
      text-align: end;
    }
  }
  @media only screen and (max-width: 576px) {
    grid-row-start: 3;
    grid-column-start: 1;
    grid-column-end: 2;
    padding-bottom: 0px;
    padding-top: 10px;
  }
`;

const TagForFilter = Tag.extend`
  color: ${TEXT_LIGHT};
  border: 1px solid ${colors?.linkColor || PEER_PRIMARY_COLOR};
  border-radius: ${BORDER_RADIUS_L};
  background: ${colors?.linkColor || PEER_PRIMARY_COLOR};
  margin-left: 8px;
  margin-right: 0px;
  @media only screen and (max-width: 768px) {
    margin-left: 0px;
    margin-right: 8px;
  }
`;

const RemoveTagIcon = styled.button`
  display: inline-flex;
  padding: 0 0 0 10px;
`;

const TagFilter = ({ tags, tagsNames, communityId }) => {
  const removeTagFilter = (removedTag) => {
    const searchParams = new URLSearchParams(createdHistory.location.search);
    const searchParamsTags = getSearchParams(createdHistory.location.search);
    const result = searchParamsTags?.filter((item) => item !== removedTag);
    if (result?.length) {
      searchParams.set('tags', result.join(','));
    } else {
      searchParams.delete('tags');
    }
    createdHistory.push(`${createdHistory.location.pathname}?${searchParams}`);
  };

  if (!communityId || !tags?.length) return null;

  return (
    <TagFilterContainer>
      <ScrollContainer>
        <div className="df mt-md-3 mt-sm-0">
          {tags.map((tag) => (
            <TagForFilter key={tag}>
              {tagsNames[tag]}
              <RemoveTagIcon type="button" onClick={() => removeTagFilter(tag)}>
                <FailedTransactionIcon
                  stroke={TEXT_LIGHT}
                  size={[16, 16]}
                  strokeOpacity={1}
                  fillOpacity={0.2}
                  fill={TEXT_LIGHT}
                ></FailedTransactionIcon>
              </RemoveTagIcon>
            </TagForFilter>
          ))}
        </div>
      </ScrollContainer>
    </TagFilterContainer>
  );
};

TagFilter.propTypes = {
  tags: PropTypes.array,
  tagsNames: PropTypes.object,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default TagFilter;
