import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as routes from 'routes-config';
import styled from 'styled-components';
// import Dropdown from '../../components/Dropdown'; ToDo: switch feed page

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import messages from 'common-messages';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import FollowCommunityButton from 'containers/FollowCommunityButton/DefaultButton';

import { MediumImageStyled } from 'components/Img/MediumImage';
import CommunitySelector from 'components/CommunitySelector';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';
import Span from 'components/Span/index';

import TutorialIcon from 'icons/Tutorial';
import HatIcon from 'icons/Hat';
import DiscussionsIcon from 'icons/Discussions';
import FeedIcon from 'icons/Feed';
import EditIcon from 'icons/Edit';

import createdHistory from 'createdHistory';
import {
  isSingleCommunityWebsite,
  singleCommunityColors,
} from 'utils/communityManagement';
import {
  getPermissions,
  hasGlobalModeratorRole,
  hasCommunityModeratorRole,
} from 'utils/properties';

import { POST_TYPE } from 'utils/constants';
import {
  BORDER_PRIMARY,
  ICON_TRASPARENT_BLUE,
  TEXT_PRIMARY,
} from 'style-constants';
import QuestionFilter from './QuestionFilter';

import { selectQuestions, selectTopQuestionsInfoLoaded } from './selectors';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const single = isSingleCommunityWebsite();
const colors = singleCommunityColors();

const PageContentHeader = styled.div`
  @media only screen and (max-width: 576px) {
    justify-content: space-between;
    width: 100%;
  }
`;

const PageContentHeaderRightPanel = styled.div`
  flex-shrink: 0;
`;

const customColor = colors.headerPrimary || BORDER_PRIMARY;

const StyledCustomIconButtonContainer = styled.div`
  .fill {
    fill: ${customColor};
  }
  .stroke {
    stroke: ${customColor};
  }

  .semitransparent {
    fill: ${colors.transparentIconColor || ICON_TRASPARENT_BLUE};
  }
`;

export const Header = ({
  intl,
  communityIdFilter,
  communities,
  followedCommunities,
  parentPage,
  setTypeFilter,
  topQuestions,
  topQuestionsInfoLoaded,
  questionFilterFromCookies,
  postsTypes,
  profile,
}) => {
  const isFeed = parentPage === routes.feed();
  const isModeratorModeSingleCommunity = single
    ? hasGlobalModeratorRole(getPermissions(profile)) ||
      hasCommunityModeratorRole(getPermissions(profile), single)
    : false;

  let defaultLabel = null;
  let route = 'feed';
  if (postsTypes.length === 1) {
    switch (postsTypes[0]) {
      case POST_TYPE.generalPost:
        defaultLabel = intl.formatMessage({ id: messages.discussions.id });
        route = 'questions';
        break;
      case POST_TYPE.expertPost:
        defaultLabel = intl.formatMessage({ id: messages.expertPosts.id });
        route = 'expertPosts';
        break;
      case POST_TYPE.tutorial:
        defaultLabel = intl.formatMessage({ id: messages.tutorials.id });
        route = 'tutorials';
        break;
    }
  } else {
    defaultLabel = intl.formatMessage({
      id: messages[profile && !single ? 'myFeed' : 'feed'].id,
    });
  }

  const typeIcon = postsTypes => {
    if (postsTypes.length === 1) {
      if (postsTypes[0] === POST_TYPE.tutorial) {
        return <TutorialIcon stroke={TEXT_PRIMARY} />;
      }
      if (postsTypes[0] === POST_TYPE.expertPost) {
        return <HatIcon stroke={TEXT_PRIMARY} />;
      }
      return <DiscussionsIcon />;
    }
    return <FeedIcon />;
  };

  const displayQuestionFilter = useMemo(
    () => !!single && !!topQuestions.length,
    [single, topQuestionsInfoLoaded, topQuestions.length],
  );

  /* eslint react/prop-types: 0 */
  const Button = ({ communityAvatar, communityLabel }) => (
    <H3>
      {communityAvatar ? (
        <MediumImageStyled src={communityAvatar} alt="communityAvatar" />
      ) : (
        <StyledCustomIconButtonContainer>
          <MediumIconStyled>{typeIcon(postsTypes)}</MediumIconStyled>
        </StyledCustomIconButtonContainer>
      )}

      <span>{communityLabel || defaultLabel}</span>
    </H3>
  );

  const displaySubscribeButton =
    !!single &&
    (isFeed &&
      window.location.pathname !== routes.questions() &&
      window.location.pathname !== routes.expertPosts() &&
      window.location.pathname !== routes.tutorials());

  const routeToEditCommunity = () => {
    createdHistory.push(routes.communitiesEdit(single));
  };
  return (
    <Wrapper
      single={single}
      className="d-flex mb-to-sm-0 mb-from-sm-3"
      isColumnForSM
    >
      <PageContentHeader className="d-flex align-items-center">
        <CommunitySelector
          isArrowed
          Button={Button}
          toggle={choice => {
            createdHistory.push(routes[route](choice, false, false));
            setTypeFilter(choice);
          }}
          showOnlyFollowed={isFeed}
          selectedCommunityId={communityIdFilter}
          communities={communities}
        />
        {!!displaySubscribeButton && (
          <PageContentHeaderRightPanel
            className={`right-panel m-0 ml-${single ? 3 : 4}`}
          >
            <FollowCommunityButton
              communityIdFilter={single || communityIdFilter}
              followedCommunities={followedCommunities}
            />
          </PageContentHeaderRightPanel>
        )}
      </PageContentHeader>
      <QuestionFilter
        display={displayQuestionFilter}
        questionFilterFromCookies={questionFilterFromCookies}
      />
      {isModeratorModeSingleCommunity && (
        <button
          onClick={routeToEditCommunity}
          className={`align-items-center d-inline-flex`}
        >
          <EditIcon stroke="#576fed" />
          <Span className="ml-1" color={TEXT_PRIMARY}>
            <FormattedMessage id={messages.editCommunity.id} />
          </Span>
        </button>
      )}
    </Wrapper>
  );
};

Header.propTypes = {
  intl: intlShape.isRequired,
  communityIdFilter: PropTypes.number,
  communities: PropTypes.array,
  followedCommunities: PropTypes.array,
  parentPage: PropTypes.string,
  setTypeFilter: PropTypes.func,
  topQuestionsInfoLoaded: PropTypes.bool,
  topQuestions: PropTypes.array,
  profile: PropTypes.object,
};
//
export default injectIntl(
  React.memo(
    connect(state => ({
      topQuestionsInfoLoaded: selectTopQuestionsInfoLoaded()(state),
      topQuestions: selectQuestions(null, null, null, true)(state),
      communities: selectCommunities()(state),
      profile: makeSelectProfileInfo()(state),
    }))(Header),
  ),
);
