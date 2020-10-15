import React from 'react';
import { FormattedMessage } from 'react-intl';
import * as routes from 'routes-config';
import Wrapper from 'components/Banner';
import Button from 'components/Button/Contained/InfoLarge';
import A from 'components/A';

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

      <A to={routes.communities()}>
        <Button>
          <FormattedMessage {...messages.goToCommunities} />
        </Button>
      </A>
    </div>
  </Wrapper>
);

export default React.memo(Banner);
