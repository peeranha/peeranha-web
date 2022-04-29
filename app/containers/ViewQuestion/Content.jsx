import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import { TEMPORARY_ACCOUNT_KEY } from 'utils/constants';

import Base from 'components/Base/BaseRoundedNoPadding';

import QuestionTitle from './QuestionTitle';
import ContentHeader from './ContentHeader';
import ContentBody from './ContentBody';
import { isTemporaryAccount } from '../../utils/properties';

const BaseStyled = Base.extend`
  //overflow: hidden;
`.withComponent('section');

export const Content = props => {
  const isTemporaryAccount = false;
  //   !!props.author?.['integer_properties'].find(
  //   x => x.key === TEMPORARY_ACCOUNT_KEY && x.value,
  // );
  return (
    <BaseStyled
      className={props.className}
      id={routes.uniqueAnswerId(props.answerId)}
    >
      <ContentHeader {...props} />
      <QuestionTitle
        title={props.title}
        communities={props.communities}
        isItWrittenByMe={props.isItWrittenByMe}
        user={props.author.user}
        questionData={props.questionData}
        isTemporaryAccount={isTemporaryAccount}
        locale={props.locale}
      />
      <ContentBody {...props} />
    </BaseStyled>
  );
};

Content.propTypes = {
  author: PropTypes.object,
  questionData: PropTypes.object,
  questionBounty: PropTypes.object,
  locale: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
  answerId: PropTypes.number,
  postTime: PropTypes.string,
  lastEditedDate: PropTypes.number,
  communities: PropTypes.array,
  isItWrittenByMe: PropTypes.bool,
};

export default React.memo(Content);
