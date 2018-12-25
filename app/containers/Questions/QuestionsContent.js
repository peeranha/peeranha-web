import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { getTimeFromDateToNow } from 'utils/datetime';
import * as routes from 'routes-config';

import messages from './messages';

const QuestionItem = item => (
  <div className="question-item">
    <div className="title-user">
      <Link
        className="highlighted-link"
        to={routes.question_view(item.id)}
        href={routes.question_view(item.id)}
      >
        <h5 className="highlighted-link">{item.title}</h5>
      </Link>
      <p>
        <Link
          className="highlighted-link"
          to={routes.profile_view(item.user)}
          href={routes.profile_view(item.user)}
        >
          {item.user}
        </Link>
        {' | '}
        <span>{`${getTimeFromDateToNow(item.post_time, item.locale)} `}</span>
        <FormattedMessage {...messages.ago} />
      </p>
    </div>
    <div className="votes-answers">
      <div className="votes">
        <p className="number">{item.rating}</p>
        <p>
          <FormattedMessage {...messages.votes} />
        </p>
      </div>
      <div className="answers" data-bg={!!item.correct_answer_id}>
        <p className="number">{item.answers.length}</p>
        <p>
          <FormattedMessage {...messages.answers} />
        </p>
      </div>
    </div>
  </div>
);

const QuestionsContent = props => (
  <div>
    {props.questionsList.map(item => (
      <QuestionItem {...item} locale={props.locale} key={item.id} />
    ))}
  </div>
);

QuestionsContent.propTypes = {
  questionsList: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
};

export { QuestionItem };
export default QuestionsContent;
