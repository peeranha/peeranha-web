import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import Base from 'components/Base/BaseRoundedNoPadding';

import QuestionTitle from './QuestionTitle';
import ContentHeader from './ContentHeader';
import ContentBody from './ContentBody';

const BaseStyled = Base.extend`
  word-break: break-word;
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
  answerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  postTime: PropTypes.number,
  lastEditedDate: PropTypes.number,
  communities: PropTypes.array,
};

export default React.memo(Content);
