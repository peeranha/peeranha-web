import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as routes from 'routes-config';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import createdHistory from 'createdHistory';

import { BORDER_PRIMARY, ICON_TRASPARENT_BLUE, TEXT_PRIMARY } from 'style-constants';
import expertIcon from 'images/hat-3-outline-24.svg?external';
import generalIcon from 'images/comments-outline-24.svg?external';
import pencilIcon from 'images/pencil.svg?external';
import myFeedIcon from 'images/myFeedHeader.svg?external';
import tutorialIcon from 'images/tutorial.svg?external';

import {
  isSingleCommunityWebsite,
  singleCommunityColors,
  getTagsNameByIds,
  graphCommunityColors,
} from 'utils/communityManagement';
import {
  getPermissions,
  hasGlobalModeratorRole,
  hasCommunityAdminRole,
  hasProtocolAdminRole,
} from 'utils/properties';
import { POST_TYPE } from 'utils/constants';
import { getSearchParams } from 'utils/url';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { HIDDEN_COMMUNITIES_ID } from 'containers/Communities/constants';
import TagFilter from 'components/TagFilter';
import { MediumImageStyled } from 'components/Img/MediumImage';
import CommunitySelector from 'components/CommunitySelector';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import { IconLg, IconMd } from 'components/Icon/IconWithSizes';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';
import Span from 'components/Span/index';
import {
  FileGraph,
  ChatsCircleGraph,
  GraduationCapGraph,
  PlayCircleGraph,
  PencilSimpleLineGraph,
} from 'components/icons';

import { selectQuestions, selectTopQuestionsInfoLoaded } from './selectors';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const single = isSingleCommunityWebsite();
const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const PageContentHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  @media only screen and (max-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
  @media only screen and (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const PageContentHeader = styled.div`
  padding: 20px 0;
  @media only screen and (max-width: 768px) {
    grid-row-start: 1;
    grid-row-end: 2;
    padding: 10px 0;
  }
  @media only screen and (max-width: 576px) {
    justify-content: space-between;
    width: 100%;
    padding: 0;
  }
`;

const EditCommunityButton = styled.div`
  position: absolute;
  text-align: right;
  padding: 8px 0;
  right: 0;
  @media only screen and (max-width: 768px) {
    position: relative;
    display: flex;
    align-items: center;
    right: 0;
    margin-top: 14px;
    button {
      flex: auto;
      text-align: end;
    }
  }
  @media only screen and (max-width: 576px) {
    display: block;
    padding: 0;
    text-align: left;
  }
`;

const customColor = colors.linkColor || BORDER_PRIMARY;

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
  parentPage,
  setTypeFilter,
  topQuestions,
  postsTypes,
  profile,
}) => {
  const { t } = useTranslation();
  const [tags, setTags] = useState([]);
  const [tagsNames, setTagsNames] = useState([]);
  const isFeed = parentPage === routes.feed();
  const communityEditingAllowed = single
    ? hasGlobalModeratorRole(getPermissions(profile)) ||
      hasProtocolAdminRole(getPermissions(profile)) ||
      hasCommunityAdminRole(getPermissions(profile), single)
    : false;

  const notHiddenCommunities = communities.filter(
    (community) => !HIDDEN_COMMUNITIES_ID?.includes(community.id),
  );

  useEffect(() => {
    async function getTagsName() {
      if (single) {
        const searchParamsTags = getSearchParams(createdHistory.location.search);
        setTags(searchParamsTags);
        setTagsNames(await getTagsNameByIds(searchParamsTags));
      }
    }
    window.scrollTo(0, 0);
    getTagsName();
  }, [createdHistory.location.search]);

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

  const graphHeaderIcon = () => {
    if (postsTypes.length === 1) {
      switch (postsTypes[0]) {
        case POST_TYPE.generalPost:
          return <ChatsCircleGraph size={[28, 28]} />;
          break;
        case POST_TYPE.expertPost:
          return <GraduationCapGraph size={[28, 28]} />;
          break;
        case POST_TYPE.tutorial:
          return <PlayCircleGraph size={[28, 28]} />;
          break;
      }
    } else {
      return <FileGraph size={[28, 28]} />;
    }
  };

  useMemo(() => !!single && !!topQuestions.length, [topQuestions.length]);
  /* eslint react/prop-types: 0 */
  const Button = ({ communityAvatar, communityLabel }) => (
    <H3>
      {communityAvatar ? (
        <MediumImageStyled src={communityAvatar} alt="communityAvatar" />
      ) : (
        <StyledCustomIconButtonContainer>
          <MediumIconStyled>
            {graphCommunity ? (
              graphHeaderIcon()
            ) : (
              <IconLg
                icon={communityAvatar || defaultAvatar}
                width={defaultAvatarWidth}
                fill={BORDER_PRIMARY}
              />
            )}
          </MediumIconStyled>
        </StyledCustomIconButtonContainer>
      )}

      <span>{communityLabel || defaultLabel}</span>
    </H3>
  );

  const routeToEditCommunity = () => {
    createdHistory.push(routes.communitiesEdit(single));
  };

  return (
    <Wrapper
      single={single}
      isQuestionsPage={true}
      className="mb-to-sm-0 mb-from-sm-3"
      isColumnForSM
    >
      <PageContentHeaderContainer>
        <PageContentHeader className="d-flex align-items-center">
          <CommunitySelector
            isArrowed
            Button={Button}
            toggle={(choice) => {
              createdHistory.push(routes[route](choice, false, false));
              setTypeFilter(choice);
            }}
            showOnlyFollowed={isFeed}
            selectedCommunityId={communityIdFilter}
            communities={notHiddenCommunities}
          />
          {/* PEER-451: Hide Subscribe button from single community mode
          {!!displaySubscribeButton && (
            <PageContentHeaderRightPanel
              className={`right-panel m-0 ml-${single ? 3 : 4}`}
            >
              <FollowCommunityButton
                communityIdFilter={single || communityIdFilter}
                followedCommunities={followedCommunities}
              />
            </PageContentHeaderRightPanel>
          )} */}
        </PageContentHeader>
        {communityEditingAllowed && isFeed && (
          <EditCommunityButton>
            <button onClick={routeToEditCommunity} className="aic">
              {graphCommunity ? (
                <PencilSimpleLineGraph fill="#6F4CFF" size={[24, 24]} />
              ) : (
                <IconMd icon={pencilIcon} color={colors.btnColor || TEXT_PRIMARY} />
              )}
              <Span className="ml-1" color={colors.btnColor || TEXT_PRIMARY}>
                {t('common.editCommunity')}
              </Span>
            </button>
          </EditCommunityButton>
        )}
        {Boolean(tags.length) && (
          <TagFilter tags={tags} tagsNames={tagsNames} communityId={single}></TagFilter>
        )}
      </PageContentHeaderContainer>
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
  connect((state) => ({
    topQuestionsInfoLoaded: selectTopQuestionsInfoLoaded()(state),
    topQuestions: selectQuestions(null, null, null, true)(state),
    communities: selectCommunities()(state),
    profile: makeSelectProfileInfo()(state),
  }))(Header),
);
