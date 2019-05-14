import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { BORDER_SECONDARY } from 'style-constants';
import _ from 'lodash';

import arrowDownIcon from 'svg/arrowDown';

import P from 'components/P';
import Base from 'components/Base/BaseRounded';
import Icon from 'components/Icon';
import IconStyled from 'components/Icon/IconStyled';
import BaseTransparent from 'components/Base/BaseTransparent';
import { MediumImageStyled } from 'components/Img/MediumImage';
import InfinityLoader from 'components/InfinityLoader';
import BlockShadow from 'components/BlockShadow';

import VoteUpButton from 'containers/VoteForNewCommunityButton/VoteUpButton';
import VoteDownButton from 'containers/VoteForNewCommunityButton/VoteDownButton';

import messages from './messages';

const ItemStyled = Base.extend`
  margin-bottom: 15px;
  padding: 0;
  word-break: break-word;
`.withComponent('li');

const Header = BaseTransparent.extend`
  border-bottom: 1px solid ${BORDER_SECONDARY};
  border-radius: 0;
`;

/* istanbul ignore next */
const Description = BaseTransparent.extend`
  ${P} {
    overflow: hidden;
    max-height: ${x => (!x.isOpened ? '100px' : 'auto')};
  }

  ${IconStyled} {
    transition: 0.5s;
    transform: rotate(${x => (x.isOpened ? '180deg' : '0deg')});
  }

  ${BlockShadow} {
    display: ${x => (!x.isOpened ? 'block' : 'none')};
  }
`;

const Item = /* istanbul ignore next */ x => {
  const [isOpened, changeView] = useState(false);

  return (
    <ItemStyled key={x.id}>
      <Header>
        <div className="row align-items-center">
          <div className="col-xl-9 d-flex align-items-center">
            <MediumImageStyled
              className="mr-3"
              src={x.avatar}
              alt="voting-community"
            />

            <div>
              <P fontSize="24" bold>
                {x.name}
              </P>
              <P className="text-capitalize" fontSize="14">
                {x.language}
              </P>
              <P fontSize="14">{x.description}</P>
            </div>
          </div>

          <div className="col-xl-3 d-flex justify-content-between">
            <VoteUpButton
              className="mr-2"
              id={`voteup_${x.id}`}
              communityId={x.id}
            />
            <VoteDownButton id={`downvote_${x.id}`} communityId={x.id} />
          </div>
        </div>
      </Header>

      <Description isOpened={isOpened}>
        <P className="mb-2" bold>
          <button onClick={() => changeView(!isOpened)}>
            <FormattedMessage {...messages.whyWeeNeedIt} />
            <Icon className="ml-2" icon={arrowDownIcon} noMargin />
          </button>
        </P>

        <div className="position-relative">
          <P>{x.main_description}</P>
          <BlockShadow />
        </div>
      </Description>
    </ItemStyled>
  );
};

const Content = /* istanbul ignore next */ ({
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
      <ul>
        {_.orderBy(suggestedCommunities, y => y.upvotes, ['desc'])
          .filter(
            x => (language.sortBy ? x.language === language.sortBy : true),
          )
          .map(x => <Item key={x.id} {...x} />)}
      </ul>
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

export { ItemStyled, Header, Description };
export default React.memo(Content);
