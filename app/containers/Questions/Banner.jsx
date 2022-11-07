import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import Wrapper from 'components/Banner';
import FeedBanner from 'components/Feed/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import noQuestionsAllQuestionsPage from 'images/noQuestionsAllQuestionsPage.svg?inline';

import messages from './messages';
import { isSingleCommunityWebsite } from '../../utils/communityManagement';

export const AllQuestionsBanner = ({ redirectToAskQuestionPage }) => (
  <Wrapper>
    <img src={noQuestionsAllQuestionsPage} alt="posts-banner" />
    <div>
      <p>
        <FormattedMessage id={messages.noPostsYet.id} />
      </p>

      <p>
        <FormattedMessage id={messages.thisIsNewCommunity.id} />
      </p>

      <Button id="banner-ask-question" onClick={redirectToAskQuestionPage}>
        <FormattedMessage id={commonMessages.askQuestion.id} />
      </Button>
    </div>
  </Wrapper>
);

export const Banner = ({
  isFeed,
  followedCommunities,
  redirectToAskQuestionPage,
  isEmpty,
  isSingleCommunityMode,
}) =>
  (!isSingleCommunityMode &&
    isFeed &&
    followedCommunities &&
    !followedCommunities[0]) ||
  (isSingleCommunityMode && !isEmpty) ? (
    <FeedBanner />
  ) : (
    <AllQuestionsBanner redirectToAskQuestionPage={redirectToAskQuestionPage} />
  );

Banner.propTypes = {
  isFeed: PropTypes.bool,
  followedCommunities: PropTypes.array,
  redirectToAskQuestionPage: PropTypes.func,
  isEmpty: PropTypes.bool,
  isSingleCommunityMode: PropTypes.bool,
};

AllQuestionsBanner.propTypes = {
  redirectToAskQuestionPage: PropTypes.func,
};

export default React.memo(Banner);
