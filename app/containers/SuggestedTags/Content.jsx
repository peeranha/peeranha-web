import React, { useState } from 'react';
import PropTypes from 'prop-types';

import arrowDownIcon from 'images/arrowDown.svg?inline';

import { Tag } from 'components/TagsList';
import P from 'components/P';
import InfinityLoader from 'components/InfinityLoader';
import BlockShadow from 'components/BlockShadow';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import BaseTransparent from 'components/Base/BaseTransparent';

import {
  BaseStyled,
  Description,
} from 'components/SuggestedCommunities/Content';

import VoteUpButton from 'containers/VoteForNewTagButton/VoteUpButton';
import VoteDownButton from 'containers/VoteForNewTagButton/VoteDownButton';

const TagLarge = Tag.extend`
  padding: 8px 20px;
  font-size: 20px;
  font-weight: 600;

  @media only screen and (max-width: 576px) {
    padding: 6px 12px;
    font-size: 18px;
  }
`;

const Item = x => {
  const [isOpened, changeView] = useState(false);

  return (
    <BaseStyled key={x.id}>
      <BaseTransparent>
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 col-md-9 d-flex align-items-center mb-to-sm-2">
            <TagLarge>{x.name}</TagLarge>
          </div>

          <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-between">
            <VoteUpButton
              className="mr-2"
              id={`voteup_${x.id}`}
              communityId={x.communityId}
              tagId={x.id}
            />

            <VoteDownButton
              id={`downvote_${x.id}`}
              communityId={x.communityId}
              tagId={x.id}
            />
          </div>
        </div>
      </BaseTransparent>

      <Description onClick={() => changeView(!isOpened)} isOpened={isOpened}>
        <img isOpened={isOpened} src={arrowDownIcon} alt="icon" />

        <div className="position-relative">
          <P>{x.description}</P>
          <BlockShadow />
        </div>
      </Description>
    </BaseStyled>
  );
};

const Content = ({
  suggestedTags,
  loadMoreTags,
  isLastFetch,
  suggestedTagsLoading,
  communityId,
}) => (
  <InfinityLoader
    loadNextPaginatedData={loadMoreTags}
    isLoading={suggestedTagsLoading}
    isLastFetch={isLastFetch}
  >
    <ul>
      {suggestedTags.map(x => (
        <Item key={x.name} {...x} communityId={communityId} />
      ))}
    </ul>

    {suggestedTagsLoading && <LoadingIndicator />}
  </InfinityLoader>
);

Content.propTypes = {
  suggestedTags: PropTypes.array,
  loadMoreTags: PropTypes.func,
  isLastFetch: PropTypes.bool,
  suggestedTagsLoading: PropTypes.bool,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(Content);
