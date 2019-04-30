import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import arrowDownIcon from 'svg/arrowDown';

import { Tag } from 'components/TagsList';
import P from 'components/P';
import Icon from 'components/Icon';
import InfinityLoader from 'components/InfinityLoader';
import BlockShadow from 'components/BlockShadow';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';

import {
  ItemStyled,
  Header,
  Description,
} from 'components/SuggestedCommunities/Content';

import VoteUpButton from 'containers/VoteForNewTagButton/VoteUpButton';
import VoteDownButton from 'containers/VoteForNewTagButton/VoteDownButton';

import messages from './messages';

const TagLarge = Tag.extend`
  padding: 8px 20px;
  font-size: 20px;
  font-weight: 600;
`;

const Item = /* istanbul ignore next */ x => {
  const [isOpened, changeView] = useState(false);

  return (
    <ItemStyled key={x.id}>
      <Header>
        <div className="row align-items-center">
          <div className="col-xl-9 d-flex align-items-center">
            <TagLarge>{x.name}</TagLarge>
          </div>

          <div className="col-xl-3 d-flex justify-content-between">
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
      </Header>

      <Description isOpened={isOpened}>
        <P className="mb-2" bold>
          <button onClick={() => changeView(!isOpened)}>
            <FormattedMessage {...messages.tagDescription} />
            <Icon className="ml-2" icon={arrowDownIcon} noMargin />
          </button>
        </P>

        <div className="position-relative">
          <P>{x.description}</P>
          <BlockShadow />
        </div>
      </Description>
    </ItemStyled>
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
