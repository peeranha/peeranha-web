import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import Span from 'components/Span';
import BaseRounded from 'components/Base/BaseRounded';
import Feed from 'components/Feed/NoQuestions';
import LargeButton from 'components/Button/LargeButton';

import noQuestionsAllQuestionsPage from 'images/noQuestionsAllQuestionsPage.svg';

import { addQuestionRoute } from 'containers/Header/HeaderForm';

import messages from './messages';

const AllQuestions = /* istanbul ignore next */ React.memo(() => (
  <BaseRounded className="d-flex align-items-center py-4">
    <img src={noQuestionsAllQuestionsPage} alt="noQuestionsAllQuestionsPage" />
    <div className="ml-5 mb-2">
      <p className="mb-1">
        <Span fontSize="24" bold>
          <FormattedMessage {...messages.noQuestionsYet} />
        </Span>
      </p>
      <p>
        <Span>
          <FormattedMessage {...messages.thisIsNewCommunity} />
        </Span>
        <LargeButton className="mt-4" onClick={addQuestionRoute}>
          <FormattedMessage {...commonMessages.addQuestion} />
        </LargeButton>
      </p>
    </div>
  </BaseRounded>
));

const NoQuestions = ({ isFeed, followedCommunities }) => (
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
