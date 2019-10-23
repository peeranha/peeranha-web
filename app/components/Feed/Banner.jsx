import React from 'react';
import { FormattedMessage } from 'react-intl';

import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/SecondaryLarge';

import noQuestionsFeedPage from 'images/noQuestionsFeedPage.svg?inline';

import messages from 'containers/Questions/messages';

export const Banner = () => (
  <Wrapper>
    <img src={noQuestionsFeedPage} alt="feed-banner" />
    <div>
      <p>
        <FormattedMessage {...messages.youDontHaveFeedToRead} />
      </p>

      <p>
        <FormattedMessage {...messages.subscribeToCommToKeep} />
      </p>

      <Button disabled>
        <FormattedMessage {...messages.readMyFeed} />
      </Button>
    </div>
  </Wrapper>
);

export default React.memo(Banner);
