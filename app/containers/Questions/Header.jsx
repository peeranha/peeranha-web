import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as routes from 'routes-config';
import styled from 'styled-components';

import { useTranslation } from 'react-i18next';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';

import FollowCommunityButton from 'containers/FollowCommunityButton/DefaultButton';

import { MediumImageStyled } from 'components/Img/MediumImage';
import CommunitySelector from 'components/CommunitySelector';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import { IconLg, IconMd } from 'components/Icon/IconWithSizes';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';
import Span from 'components/Span/index';

import expertIcon from 'images/hat-3-outline-24.svg?external';
import generalIcon from 'images/comments-outline-24.svg?external';
import pencilIcon from 'images/pencil.svg?external';

import myFeedIcon from 'images/myFeedHeader.svg?external';
import tutorialIcon from 'images/tutorial.svg?external';
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
  const { t } = useTranslation();
  const isFeed = parentPage === routes.feed();
  const isModeratorModeSingleCommunity = single
    ? hasGlobalModeratorRole(getPermissions(profile)) ||
      hasCommunityModeratorRole(getPermissions(profile), single)
    : false;

  let defaultAvatar = null;
  let defaultLabel = null;
  let defaultAvatarWidth = null;
  let route = 'feed';
  if (postsTypes.length === 1) {
    switch (postsTypes[0]) {
      case POST_TYPE.generalPost:
        defaultAvatar = generalIcon;
        defaultLabel = t('common.discussions');
        defaultAvatarWidth = '24';
        route = 'questions';
        break;
      case POST_TYPE.expertPost:
        defaultAvatar = expertIcon;
        defaultLabel = t('common.expertPosts');
        defaultAvatarWidth = '28';
        route = 'expertPosts';
        break;
      case POST_TYPE.tutorial:
        defaultAvatar = tutorialIcon;
        defaultLabel = t('common.tutorials');
        defaultAvatarWidth = '28';
        route = 'tutorials';
        break;
    }
  } else {
    defaultAvatar = myFeedIcon;
    defaultLabel = t(`common.${profile && !single ? 'myFeed' : 'feed'}`);
    defaultAvatarWidth = '38';
  }

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
          <MediumIconStyled>
            <IconLg
              icon={communityAvatar || defaultAvatar}
              width={defaultAvatarWidth}
              fill={BORDER_PRIMARY}
            />
          </MediumIconStyled>
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

      {isModeratorModeSingleCommunity && (
        <button
          onClick={routeToEditCommunity}
          className={`align-items-center d-inline-flex`}
        >
          <IconMd icon={pencilIcon} />
          <Span className="ml-1" color={TEXT_PRIMARY}>
            {t('common.editCommunity')}
          </Span>
        </button>
      )}
    </Wrapper>
  );
};

Header.propTypes = {
  communityIdFilter: PropTypes.number,
  communities: PropTypes.array,
  followedCommunities: PropTypes.array,
  parentPage: PropTypes.string,
  setTypeFilter: PropTypes.func,
  topQuestionsInfoLoaded: PropTypes.bool,
  topQuestions: PropTypes.array,
  profile: PropTypes.object,
};

export default React.memo(
  connect(state => ({
    topQuestionsInfoLoaded: selectTopQuestionsInfoLoaded()(state),
    topQuestions: selectQuestions(null, null, null, true)(state),
    communities: selectCommunities()(state),
    profile: makeSelectProfileInfo()(state),
  }))(Header),
);
