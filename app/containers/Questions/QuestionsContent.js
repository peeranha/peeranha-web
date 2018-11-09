import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { getTimeFromDateToNow } from 'utils/dateManagement';

import messages from './messages';

const QuestionItem = item => (
  <Link to={`/questions/${item.id}`} href={`/questions/${item.id}`}>
    <div className="question-item">
      <div className="title-user">
        <Link
          className="highlighted-link"
          to={`/questions/${item.id}`}
          href={`/questions/${item.id}`}
        >
          <h5 className="highlighted-link">{item.title}</h5>
        </Link>
        <p>
          <Link
            className="highlighted-link"
            to={`/users/${item.user}`}
            href={`/questions/${item.user}`}
          >
            {item.user}
          </Link>
          {' | '}
          <span>{getTimeFromDateToNow(item.post_time, item.locale)}</span>
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
  </Link>
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
