import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import P from 'components/P';
import BaseRounded from 'components/Base/BaseRounded';
import Feed from 'components/Feed/NoQuestions';
import LargeButton from 'components/Button/Contained/InfoLarge';

import noQuestionsAllQuestionsPage from 'images/noQuestionsAllQuestionsPage.svg';

import { addQuestionRoute } from 'containers/Header/HeaderForm';

import messages from './messages';

export const AllQuestions = /* istanbul ignore next */ () => (
  <BaseRounded className="d-flex align-items-center py-4">
    <img src={noQuestionsAllQuestionsPage} alt="noQuestionsAllQuestionsPage" />
    <div className="ml-5 mb-2">
      <P className="mb-1" fontSize="24" bold>
        <FormattedMessage {...messages.noQuestionsYet} />
      </P>
      <P>
        <FormattedMessage {...messages.thisIsNewCommunity} />
      </P>
      <LargeButton className="mt-4" onClick={addQuestionRoute}>
        <FormattedMessage {...commonMessages.addQuestion} />
      </LargeButton>
    </div>
  </BaseRounded>
);

export const NoQuestions = /* istanbul ignore next */ ({
  isFeed,
  followedCommunities,
}) => (
  <div className="mt-2">
    {isFeed && followedCommunities && !followedCommunities[0] ? (
      <Feed />
    ) : (
      <AllQuestions />
    )}
  </div>
);

NoQuestions.propTypes = {
  isFeed: PropTypes.bool,
  followedCommunities: PropTypes.array,
};

export default React.memo(NoQuestions);
