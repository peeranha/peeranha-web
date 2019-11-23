/* eslint indent: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BORDER_SECONDARY } from 'style-constants';
import orderBy from 'lodash/orderBy';

import arrowDownIcon from 'images/arrowDown.svg?inline';

import P from 'components/P';
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

const Item = x => {
  const [isOpened, changeView] = useState(false);

  return (
    <BaseStyled key={x.id}>
      <BaseTransparent className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <MediumImageStyled src={x.avatar} alt="voting-community" />

          <div>
            <P fontSize="24" mobileFS="18" bold>
              {x.name}
            </P>
            <P className="text-capitalize" fontSize="14">
              {x.language}
            </P>
            <P fontSize="14">{x.description}</P>
          </div>
        </div>

        <div>
          <VoteUpButton id={`voteup_${x.id}`} communityId={x.id} />
          <VoteDownButton id={`downvote_${x.id}`} communityId={x.id} />
        </div>
      </BaseTransparent>

      <Description onClick={() => changeView(!isOpened)} isOpened={isOpened}>
        <img isOpened={isOpened} src={arrowDownIcon} alt="icon" />

        <div className="position-relative">
          <P>{x.main_description}</P>
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
