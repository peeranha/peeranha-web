import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import commonMessages from 'common-messages';
import createdHistory from 'createdHistory';
import * as routes from 'routes-config';

import Wrapper from 'components/Banner';
import FeedBanner from 'components/Feed/Banner';
import Button from 'components/Button/Contained/InfoLarge';

import noQuestionsAllQuestionsPage from 'images/noQuestionsAllQuestionsPage.svg?inline';

import messages from './messages';

export const AllQuestionsBanner = () => (
  <Wrapper>
    <img src={noQuestionsAllQuestionsPage} alt="questions-banner" />
    <div>
      <p>
        <FormattedMessage {...messages.noQuestionsYet} />
      </p>

      <p>
        <FormattedMessage {...messages.thisIsNewCommunity} />
      </p>

      <Button onClick={() => createdHistory.push(routes.questionAsk())}>
        <FormattedMessage {...commonMessages.addQuestion} />
      </Button>
    </div>
  </Wrapper>
);

export const Banner = ({ isFeed, followedCommunities }) =>
  isFeed && followedCommunities && !followedCommunities[0] ? (
    <FeedBanner />
  ) : (
    <AllQuestionsBanner />
  );

Banner.propTypes = {
  isFeed: PropTypes.bool,
  followedCommunities: PropTypes.array,
};

export default React.memo(Banner);
