import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import commonMessages from 'common-messages';

import arrowDownIcon from 'images/arrowDown.svg?external';

import { Tag } from 'components/TagsList';
import P from 'components/P';
import Icon from 'components/Icon';
import InfinityLoader from 'components/InfinityLoader';
import BlockShadow from 'components/BlockShadow';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import BaseTransparent from 'components/Base/BaseTransparent';

import {
  BaseStyled,
  Description,
  DEFAULT_DESCRIPTION_HEIGHT,
} from 'components/SuggestedCommunities/Content';

const TagLarge = Tag.extend`
  font-size: 22px;
  font-weight: 600;
  height: 42px;
  padding: 0 22px;
  margin: 0;

  @media only screen and (max-width: 576px) {
    padding: 0px 12px;
    height: 30px;
    font-size: 18px;
  }
`;

const DESCRIPTION_ID = 'description-content-id';

const Item = x => {
  const [isOpened, changeView] = useState(false);
  const [isArrowVisible, changeArrowVisibility] = useState(false);

  useEffect(() => {
    const { scrollHeight } = document.getElementById(
      `${DESCRIPTION_ID}_${x.id}`,
    );

    if (scrollHeight > DEFAULT_DESCRIPTION_HEIGHT) {
      changeArrowVisibility(true);
    }
  });

  return (
    <BaseStyled key={x.id}>
      <BaseTransparent className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-sm-between">
        <div className="d-flex align-items-center">
          <TagLarge className="mb-to-sm-2">{x.name}</TagLarge>
        </div>
      </BaseTransparent>

      <Description
        onClick={() => changeView(!isOpened)}
        isOpened={isOpened}
        isArrowVisible={isArrowVisible}
      >
        <P className="d-flex align-items-center mb-2" bold>
          <FormattedMessage {...commonMessages.description} />
          <Icon
            className={!isArrowVisible ? 'd-none' : 'ml-2'}
            icon={arrowDownIcon}
            rotate={isOpened}
            width="12"
          />
        </P>

        <div className="position-relative">
          <P id={`${DESCRIPTION_ID}_${x.id}`}>{x.description}</P>
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
