import React from 'react';
import { FormattedMessage } from 'react-intl';

import Span from 'components/Span';
import BaseRounded from 'components/Base/BaseRounded';
import LargeButton from 'components/Button/LargeButton';

import noQuestionsFeedPage from 'images/noQuestionsFeedPage.svg';

import messages from 'containers/Questions/messages';

const NoQuestions = () => (
  <BaseRounded className="d-flex align-items-center py-5">
    <img src={noQuestionsFeedPage} alt="noQuestionsFeedPage" />
    <div className="ml-5 mb-2">
      <p className="mb-1">
        <Span fontSize="24" bold>
          <FormattedMessage {...messages.youDontHaveFeedToRead} />
        </Span>
      </p>
      <p>
        <Span>
          <FormattedMessage {...messages.subscribeToCommToKeep} />
        </Span>
        <LargeButton className="my-4" disabled>
          <FormattedMessage {...messages.readMyFeed} />
        </LargeButton>
      </p>
    </div>
  </BaseRounded>
);

export default React.memo(NoQuestions);
