import React from 'react';
import { FormattedMessage } from 'react-intl';

import P from 'components/P';
import BaseRounded from 'components/Base/BaseRounded';
import LargeButton from 'components/Button/Contained/InfoLarge';

import noQuestionsFeedPage from 'images/noQuestionsFeedPage.svg';

import messages from 'containers/Questions/messages';

export const NoQuestions = /* istanbul ignore next */ () => (
  <BaseRounded className="d-flex align-items-center py-5">
    <img src={noQuestionsFeedPage} alt="noQuestionsFeedPage" />
    <div className="ml-5 mb-2">
      <P className="mb-1" fontSize="24" bold>
        <FormattedMessage {...messages.youDontHaveFeedToRead} />
      </P>
      <P>
        <FormattedMessage {...messages.subscribeToCommToKeep} />
      </P>
      <LargeButton className="my-4" disabled>
        <FormattedMessage {...messages.readMyFeed} />
      </LargeButton>
    </div>
  </BaseRounded>
);

export default React.memo(NoQuestions);
