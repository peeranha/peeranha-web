import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Span from 'components/Span';
import noActivityImg from 'images/userHasntActivity.png';

import messages from 'containers/Profile/messages';

const NoActivity = ({ tab }) => (
  <div className="d-flex align-items-center">
    <img src={noActivityImg} alt="noActivityImg" />
    <div className="ml-5 mb-2">
      <p className="mb-1">
        <Span fontSize="24" bold>
          {tab === 'posts' && (
            <FormattedMessage {...messages.userHasntActivityYet} />
          )}
          {tab === 'questions' && (
            <FormattedMessage {...messages.userHasntQuestionsYet} />
          )}
          {tab === 'answers' && (
            <FormattedMessage {...messages.userHasntAnswersYet} />
          )}
        </Span>
      </p>
      <p>
        <Span>
          {tab === 'posts' && (
            <FormattedMessage {...messages.heHasnoAnswersAndQuestions} />
          )}
          {tab === 'questions' && (
            <FormattedMessage {...messages.heHasnoQuestions} />
          )}
          {tab === 'answers' && (
            <FormattedMessage {...messages.heHasnoAnswers} />
          )}
        </Span>
      </p>
    </div>
  </div>
);

NoActivity.propTypes = {
  tab: PropTypes.string,
};

export default React.memo(NoActivity);
