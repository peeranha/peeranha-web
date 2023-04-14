import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';

import { LANGUAGES_MAP } from 'utils/constants';

import Base from 'components/Base/BaseRoundedNoPadding';

import QuestionTitle from './QuestionTitle';
import ContentHeader from './ContentHeader';
import ContentBody from './ContentBody';

const BaseStyled = Base.extend`
  //overflow: hidden;
`.withComponent('section');

export const Content = (props) => {
  const isTemporaryAccount = false;
  const [showOriginal, setShowOriginal] = useState(false);
  const translation = props.translations?.find(
    ({ language }) => Number(language) === LANGUAGES_MAP[props.locale],
  );
  //   !!props.author?.['integer_properties'].find(
  //   x => x.key === TEMPORARY_ACCOUNT_KEY && x.value,
  // );
  const getContent = () => {
    if (Number(props.language) === LANGUAGES_MAP[props.locale] || showOriginal) {
      return { content: props.content, title: props.title };
    }
    return translation
      ? { content: translation.content, title: translation.title }
      : { content: props.content, title: props.title };
  };

  const { title, content } = getContent();

  return (
    <BaseStyled className={props.className} id={routes.uniqueAnswerId(props.answerId)}>
      <ContentHeader
        {...props}
        translation={translation}
        showOriginal={showOriginal}
        setShowOriginal={setShowOriginal}
      />
      <QuestionTitle
        title={title}
        communities={props.communities}
        isItWrittenByMe={props.isItWrittenByMe}
        user={props.author.user}
        questionData={props.questionData}
        isTemporaryAccount={isTemporaryAccount}
        locale={props.locale}
      />
      <ContentBody
        {...props}
        content={content}
        showOriginal={showOriginal}
        setShowOriginal={setShowOriginal}
      />
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
  postTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lastEditedDate: PropTypes.number,
  communities: PropTypes.array,
  isItWrittenByMe: PropTypes.bool,
  translations: PropTypes.array,
};

export default React.memo(Content);
