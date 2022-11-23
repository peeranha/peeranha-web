import React from 'react';
import PropTypes from 'prop-types';
import { translationMessages } from 'i18n';
import commonMessages from 'common-messages';

import AnswerForm from 'components/AnswerForm';
import Base from 'components/Base/BaseRounded';

import Question from './Question';
import Answers from './Answers';
import RulesBlock from './RulesBlock';

import messages from './messages';

import { ADD_ANSWER_FORM, POST_ANSWER_BUTTON } from './constants';
import { POST_TYPE } from '../../utils/constants';
import { getRatingByCommunity } from 'utils/profileManagement';

export const ViewQuestionContainer = props => {
  const msg = translationMessages[props.locale];

  const { isAnswered } = props;
  const isTutorial = props.questionData.postType === POST_TYPE.tutorial;
  const isMinusReputation =
    getRatingByCommunity(props.profile, props.commId) < 0;

  return (
    <article>
      <Question {...props} />

      {!isTutorial && (
        <>
          <Answers {...props} />

          <Base className="mt-3 position-relative overflow-hidden">
            <RulesBlock />
            <AnswerForm
              answer=""
              communityId={props.questionData.communityId}
              form={ADD_ANSWER_FORM}
              formHeader={msg[messages.yourAnswer.id]}
              sendButtonId={POST_ANSWER_BUTTON}
              sendAnswer={props.postAnswer}
              sendAnswerLoading={props.postAnswerLoading}
              submitButtonName={msg[messages.postAnswerButton.id]}
              previewLabel={msg[commonMessages.preview.id]}
              properties={[]}
              questionView
              isAnswered={isAnswered}
              isMinusReputation={isMinusReputation}
            />
          </Base>
        </>
      )}
    </article>
  );
};

ViewQuestionContainer.propTypes = {
  postAnswer: PropTypes.func,
  postAnswerLoading: PropTypes.bool,
  locale: PropTypes.string,
  translations: PropTypes.object,
  questionData: PropTypes.object,
  isAnswered: PropTypes.bool,
};

export default React.memo(ViewQuestionContainer);
