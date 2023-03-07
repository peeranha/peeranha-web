import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import AnswerForm from 'components/AnswerForm';
import Base from 'components/Base/BaseRounded';

import Question from './Question';
import Answers from './Answers';
import RulesBlock from './RulesBlock';

import { ADD_ANSWER_FORM, POST_ANSWER_BUTTON } from './constants';
import { POST_TYPE } from '../../utils/constants';
import { getRatingByCommunity } from 'utils/profileManagement';

import {
  getPermissions,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
} from 'utils/properties';

export const ViewQuestionContainer = (props) => {
  const { t } = useTranslation();

  const { isAnswered } = props;
  const isTutorial = props.questionData.postType === POST_TYPE.tutorial;
  const isMinusReputation =
    getRatingByCommunity(props.profile, props.commId) < 0;

  const isHasRole =
    hasGlobalModeratorRole(getPermissions(props.profile)) ||
    hasProtocolAdminRole(getPermissions(props.profile)) ||
    hasCommunityModeratorRole(getPermissions(props.profile), props.commId);

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
              formHeader={t('post.yourAnswer')}
              sendButtonId={POST_ANSWER_BUTTON}
              sendAnswer={props.postAnswer}
              sendAnswerLoading={props.postAnswerLoading}
              submitButtonName={t('post.postAnswerButton')}
              previewLabel={t('common.preview')}
              properties={[]}
              questionView
              isAnswered={isAnswered}
              isMinusReputation={isMinusReputation}
              isHasRole={isHasRole}
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
  translations: PropTypes.array,
  questionData: PropTypes.object,
  isAnswered: PropTypes.bool,
};

export default React.memo(ViewQuestionContainer);
