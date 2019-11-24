/* eslint indent: 0 */
import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import commonMessages from 'common-messages';

import { BORDER_SECONDARY } from 'style-constants';
import orderBy from 'lodash/orderBy';

import arrowDownIcon from 'images/arrowDown.svg?external';

import P from 'components/P';
import Icon from 'components/Icon';
import Base from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import { MediumImageStyled } from 'components/Img/MediumImage';
import InfinityLoader from 'components/InfinityLoader';
import BlockShadow from 'components/BlockShadow';

import VoteUpButton from 'containers/VoteForNewCommunityButton/VoteUpButton';
import VoteDownButton from 'containers/VoteForNewCommunityButton/VoteDownButton';

export const DEFAULT_DESCRIPTION_HEIGHT = 70;

export const BaseStyled = Base.extend`
  margin-bottom: 15px;

  > :nth-child(1) {
    img {
      margin-right: 15px;
    }

    button:not(:last-child) {
      margin-right: 10px;
    }
  }

  > :not(:last-child) {
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }
`;

export const Description = BaseTransparent.extend`
  cursor: pointer;
  word-break: break-all;

  ${P} {
    overflow: ${x => (!x.isOpened && x.isArrowVisible ? 'hidden' : 'visible')};
    max-height: ${x =>
      !x.isOpened ? `${DEFAULT_DESCRIPTION_HEIGHT}px` : 'auto'};
  }

  ${BlockShadow} {
    display: ${x => (!x.isOpened && x.isArrowVisible ? 'block' : 'none')};
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
        <div className="d-flex align-items-center mb-to-sm-2">
          <MediumImageStyled
            className="flex-shrink-0"
            src={x.avatar}
            alt="voting-community"
          />

          <div>
            <P fontSize="24" mobileFS="18" bold>
              {x.name}
            </P>
            <P fontSize="14">
              <FormattedMessage {...commonMessages[x.language]} />
            </P>
            <P fontSize="14">{x.description}</P>
          </div>
        </div>

        <div className="flex-shrink-0">
          <VoteUpButton id={`voteup_${x.id}`} communityId={x.id} />
          <VoteDownButton id={`downvote_${x.id}`} communityId={x.id} />
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
          <P id={`${DESCRIPTION_ID}_${x.id}`}>{x.main_description}</P>
          <BlockShadow />
        </div>
      </Description>
    </BaseStyled>
  );
};

const Content = ({
  suggestedCommunities,
  suggestedCommunitiesLoading,
  isLastFetch,
  getSuggestedCommunities,
  language,
}) => {
  if (!suggestedCommunities || !suggestedCommunities.length) return null;

  return (
    <InfinityLoader
      loadNextPaginatedData={getSuggestedCommunities}
      isLoading={suggestedCommunitiesLoading}
      isLastFetch={isLastFetch}
    >
      <div>
        {orderBy(suggestedCommunities, y => y.upvotes, ['desc'])
          .filter(
            x => (language.sortBy ? x.language === language.sortBy : true),
          )
          .map(x => <Item key={x.id} {...x} />)}
      </div>
    </InfinityLoader>
  );
};

Content.propTypes = {
  suggestedCommunities: PropTypes.array,
  suggestedCommunitiesLoading: PropTypes.bool,
  isLastFetch: PropTypes.bool,
  getSuggestedCommunities: PropTypes.func,
  language: PropTypes.object,
};

export default React.memo(Content);
