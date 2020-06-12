import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as routes from 'routes-config';

import { injectIntl, intlShape } from 'react-intl';
import messages from 'common-messages';

import FollowCommunityButton from 'containers/FollowCommunityButton/DefaultButton';

import { MediumImageStyled } from 'components/Img/MediumImage';
import CommunitySelector from 'components/CommunitySelector';
import { MediumIconStyled } from 'components/Icon/MediumIcon';
import { IconLg } from 'components/Icon/IconWithSizes';
import H3 from 'components/H3';
import Wrapper from 'components/Header/Simple';

import allquestionsIcon from 'images/allquestions-header.svg?external';
import myFeedIcon from 'images/myFeedHeader.svg?external';
import createdHistory from 'createdHistory';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import QuestionFilter from './QuestionFilter';

import { selectQuestions, selectTopQuestionsLoaded } from './selectors';
import { MediumImageStyled } from '../../components/Img/MediumImage';

const single = isSingleCommunityWebsite();

export const Header = ({
  intl,
  communityIdFilter,
  followedCommunities,
  parentPage,
  setTypeFilter,
  topQuestions,
  topQuestionsLoaded,
}) => {
  const isFeed = parentPage === routes.feed();

  let defaultAvatar = null;
  let defaultLabel = null;
  let defaultAvatarWidth = null;

  if (!isFeed) {
    defaultAvatar = allquestionsIcon;
    defaultLabel = intl.formatMessage({ id: messages.questions.id });
    defaultAvatarWidth = '24';
  } else {
    defaultAvatar = myFeedIcon;
    defaultLabel = intl.formatMessage({ id: messages.myFeed.id });
    defaultAvatarWidth = '38';
  }

  const displayQuestionFilter = useMemo(
    () => !!single && topQuestionsLoaded && !!topQuestions.length,
    [single, topQuestionsLoaded, topQuestions.length],
  );

  /* eslint react/prop-types: 0 */
  const Button = ({ communityAvatar, communityLabel }) => (
    <H3>
      {communityAvatar ? (
        <MediumImageStyled src={communityAvatar} alt="communityAvatar" />
      ) : (
        <MediumIconStyled>
          <IconLg
            icon={communityAvatar || defaultAvatar}
            width={defaultAvatarWidth}
          />
        </MediumIconStyled>
      )}

      <span>{communityLabel || defaultLabel}</span>
    </H3>
  );

  const displaySubscribeButton =
    !!single || (!isFeed && window.location.pathname !== routes.questions());

  return (
    <Wrapper
      single={single}
      className="d-flex mb-to-sm-0 mb-from-sm-3"
      isColumnForSM
    >
      <div className="d-flex align-items-center">
        <CommunitySelector
          isArrowed
          Button={Button}
          toggle={choice => {
            createdHistory.push(
              routes[isFeed ? 'feed' : 'questions'](choice, false, false),
            );
            setTypeFilter(choice);
          }}
          showOnlyFollowed={isFeed}
          selectedCommunityId={communityIdFilter}
        />
        {!!displaySubscribeButton && (
          <div className={`right-panel m-0 ml-${single ? 3 : 4}`}>
            <FollowCommunityButton
              communityIdFilter={single || communityIdFilter}
              followedCommunities={followedCommunities}
            />
          </div>
        )}
      </div>
      <QuestionFilter display={displayQuestionFilter} />
    </Wrapper>
  );
};

Header.propTypes = {
  intl: intlShape.isRequired,
  communityIdFilter: PropTypes.number,
  followedCommunities: PropTypes.array,
  parentPage: PropTypes.string,
  setTypeFilter: PropTypes.func,
};
//
export default injectIntl(
  React.memo(
    connect(state => ({
      topQuestionsLoaded: selectTopQuestionsLoaded()(state),
      topQuestions: selectQuestions(null, null, null, true)(state),
    }))(Header),
  ),
);
