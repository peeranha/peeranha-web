import React, { useState, memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';

import Button from 'components/Button/Outlined/PrimaryStretching';

import { LANGUAGES_MAP } from 'utils/constants';

import Content from './Content';
import { ANSWER_TYPE, POST_TYPES } from './constants';

const DEFAULT_NUMBER = 10;

export const AnswersList = (props) => {
  const { t } = useTranslation();
  const [allVisible, setAllVisible] = useState(false);
  const { answers, postType } = props.questionData;

  const changeVisibility = useCallback(() => setAllVisible(!allVisible), [allVisible]);

  const visibleAnswers = useMemo(
    () => answers.slice(0, allVisible ? answers.length : DEFAULT_NUMBER),
    [answers, allVisible],
  );

  const type = useMemo(() => POST_TYPES[postType], [postType]);

  return (
    <>
      {visibleAnswers.map(
        ({
          id,
          comments,
          content,
          rating,
          isTheLargestRating,
          isItWrittenByMe,
          history,
          author,
          postTime,
          lastEditedDate,
          votingStatus,
          isOfficialReply,
          translations,
          language,
          handle,
          messengerType,
        }) => (
          <Content
            {...props}
            className="mb-3"
            type={ANSWER_TYPE}
            key={`${ANSWER_TYPE}${id}`}
            answerId={id}
            comments={comments}
            content={`${content}`}
            translations={translations}
            language={language}
            isOriginalLanguage={+language === LANGUAGES_MAP[props.locale]}
            rating={rating}
            isTheLargestRating={isTheLargestRating}
            questionFrom={props.questionData.author.user}
            isItWrittenByMe={isItWrittenByMe}
            history={history}
            author={{
              ...author,
              handle,
              messengerType,
              user: author.id,
            }}
            postTime={+postTime}
            lastEditedDate={lastEditedDate}
            votingStatus={votingStatus}
            deleteItem={props.deleteAnswer}
            deleteItemLoading={props.deleteAnswerLoading}
            editItem={[
              props.redirectToEditAnswerPage,
              routes.answerEdit(type, props.questionData.id, id),
            ]}
            saveComment={props.saveComment}
            deleteComment={props.deleteComment}
            buttonParams={{
              questionId: props.questionData.id,
              answerId: id,
              whowasvoted: author.user,
            }}
            commId={props.commId}
            isOfficialReply={isOfficialReply}
          />
        ),
      )}

      {answers.length > DEFAULT_NUMBER && (
        <div className="d-flex">
          <Button className="py-2" onClick={changeVisibility}>
            {t('post.showMoreAnswers', {
              value: `(${visibleAnswers.length}/${answers.length})`,
            })}
          </Button>
        </div>
      )}
    </>
  );
};

AnswersList.propTypes = {
  questionData: PropTypes.object,
  deleteAnswer: PropTypes.func,
  saveComment: PropTypes.func,
  deleteComment: PropTypes.func,
  redirectToEditAnswerPage: PropTypes.func,
  deleteAnswerLoading: PropTypes.bool,
  locale: PropTypes.string,
};

export default memo(AnswersList);
