import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { BORDER_SECONDARY } from 'style-constants';
import _ from 'lodash';

import arrowDownIcon from 'images/arrowDown.svg?inline';

import P from 'components/P';
import Base from 'components/Base/BaseRoundedNoPadding';
import BaseTransparent from 'components/Base/BaseTransparent';
import { MediumImageStyled } from 'components/Img/MediumImage';
import InfinityLoader from 'components/InfinityLoader';
import BlockShadow from 'components/BlockShadow';

import VoteUpButton from 'containers/VoteForNewCommunityButton/VoteUpButton';
import VoteDownButton from 'containers/VoteForNewCommunityButton/VoteDownButton';

import messages from './messages';

const BaseStyled = Base.extend`
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

  @media only screen and (max-width: 576px) {
    > :nth-child(1) {
      button {
        margin-top: 15px;
      }

      img {
        margin-top: 0px;
      }
    }
  }
`;

const Description = BaseTransparent.extend`
  ${P} {
    overflow: hidden;
    max-height: ${x => (!x.isOpened ? '100px' : 'auto')};
  }

  img {
    transition: 0.5s;
    transform: rotate(${x => (x.isOpened ? '180deg' : '0deg')});
  }

  ${BlockShadow} {
    display: ${x => (!x.isOpened ? 'block' : 'none')};
  }
`;

const Item = x => {
  const [isOpened, changeView] = useState(false);

  return (
    <BaseStyled key={x.id}>
      <BaseTransparent>
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 col-md-9 d-flex align-items-center">
            <MediumImageStyled src={x.avatar} alt="voting-community" />

            <div>
              <P fontSize="24" mobileFS="18" bold>
                {x.name}
              </P>
              <P className="d-none d-sm-block text-capitalize" fontSize="14">
                {x.language}
              </P>
              <P fontSize="14">{x.description}</P>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-between">
            <VoteUpButton id={`voteup_${x.id}`} communityId={x.id} />
            <VoteDownButton id={`downvote_${x.id}`} communityId={x.id} />
          </div>
        </div>
      </BaseTransparent>

      <Description className="d-none d-sm-block" isOpened={isOpened}>
        <P className="mb-2" bold>
          <button onClick={() => changeView(!isOpened)}>
            <FormattedMessage {...messages.whyWeeNeedIt} />
            <img className="ml-2" src={arrowDownIcon} alt="icon" />
          </button>
        </P>

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
  if (!suggestedCommunities) return null;

  return (
    <InfinityLoader
      loadNextPaginatedData={getSuggestedCommunities}
      isLoading={suggestedCommunitiesLoading}
      isLastFetch={isLastFetch}
    >
      <div>
        {_.orderBy(suggestedCommunities, y => y.upvotes, ['desc'])
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
