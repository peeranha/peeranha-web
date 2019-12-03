import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';

import Wrapper from 'components/Banner';
import FeedBanner from 'components/Feed/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import noQuestionsAllQuestionsPage from 'images/noQuestionsAllQuestionsPage.svg?inline';

import messages from './messages';

export const AllQuestionsBanner = ({ redirectToAskQuestionPage }) => (
  <Wrapper>
    <img src={noQuestionsAllQuestionsPage} alt="questions-banner" />
    <div>
      <p>
        <FormattedMessage {...messages.noQuestionsYet} />
      </p>

      <p>
        <FormattedMessage {...messages.thisIsNewCommunity} />
      </p>

      <Button id="banner-ask-question" onClick={redirectToAskQuestionPage}>
        <FormattedMessage {...commonMessages.askQuestion} />
      </Button>
    </div>
  </Wrapper>
);

export const Banner = ({
  isFeed,
  followedCommunities,
  redirectToAskQuestionPage,
}) =>
  isFeed && followedCommunities && !followedCommunities[0] ? (
    <FeedBanner />
  ) : (
    <AllQuestionsBanner redirectToAskQuestionPage={redirectToAskQuestionPage} />
  );

Banner.propTypes = {
  isFeed: PropTypes.bool,
  followedCommunities: PropTypes.array,
  redirectToAskQuestionPage: PropTypes.func,
};

AllQuestionsBanner.propTypes = {
  redirectToAskQuestionPage: PropTypes.func,
};

export default React.memo(Banner);
