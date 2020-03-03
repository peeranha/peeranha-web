import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import Base from 'components/Base/BaseRoundedNoPadding';

import QuestionTitle from './QuestionTitle';
import ContentHeader from './ContentHeader';
import ContentBody from './ContentBody';

const BaseStyled = Base.extend`
  overflow: hidden;
`.withComponent('section');

export const Content = props => (
  <BaseStyled
    className={props.className}
    id={routes.uniqueAnswerId(props.answerId)}
  >
    <ContentHeader {...props} />
    <QuestionTitle
      title={props.title}
      tags={props.questionData.tags}
      communityId={props.questionData.community_id}
      communities={props.communities}
      isItWrittenByMe={props.isItWrittenByMe}
      correctAnswerId={props.questionData.correct_answer_id}
      answersNumber={props.questionData.answers.length}
      isGeneral={props.questionData.isGeneral}
      user={props.userInfo.user}
    />
    <ContentBody {...props} />
  </BaseStyled>
);

Content.propTypes = {
  userInfo: PropTypes.object,
  questionData: PropTypes.object,
  locale: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  answerId: PropTypes.number,
  postTime: PropTypes.number,
  lastEditedDate: PropTypes.number,
  communities: PropTypes.array,
  isItWrittenByMe: PropTypes.bool,
};

export default React.memo(Content);
