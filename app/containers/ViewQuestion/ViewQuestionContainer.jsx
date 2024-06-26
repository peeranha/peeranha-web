import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { POST_TYPE } from 'utils/constants';
import { getRatingByCommunity } from 'utils/profileManagement';
import { hasFrozenComunity } from 'utils/communityManagement';
import {
  getPermissions,
  hasCommunityModeratorRole,
  hasGlobalModeratorRole,
  hasProtocolAdminRole,
  hasCommunityAdminRole,
} from 'utils/properties';

import AnswerForm from 'components/AnswerForm';
import Base from 'components/Base/BaseRounded';
import BlockedInfoArea from 'components/BlockedInfoArea';

import Question from './Question';
import Answers from './Answers';
import RulesBlock from './RulesBlock';

import { ADD_ANSWER_FORM, POST_ANSWER_BUTTON } from './constants';

export const ViewQuestionContainer = (props) => {
  const { t } = useTranslation();

  const { isAnswered, account, showLoginModal, communities, commId } = props;
  const isTutorial = props.questionData.postType === POST_TYPE.tutorial;
  const isMinusReputation = getRatingByCommunity(props.profile, props.commId) < 0;

  const isHasRole =
    hasGlobalModeratorRole(getPermissions(props.profile)) ||
    hasProtocolAdminRole(getPermissions(props.profile)) ||
    hasCommunityModeratorRole(getPermissions(props.profile), props.commId);

  const isCommunityAdminRole = hasCommunityAdminRole(getPermissions(props.profile), props.commId);

  const isBanned = props.profile?.communityBans?.includes(props.commId);
  const isFrozenCommunity = hasFrozenComunity(communities, commId);

  const isViewForm =
    !account ||
    isBanned ||
    isAnswered ||
    (!isHasRole && isMinusReputation) ||
    (!(isHasRole || isCommunityAdminRole) && isFrozenCommunity);

  return (
    <article>
      <Question {...props} />

      {!isTutorial && (
        <>
          <Answers {...props} />
          {!isViewForm ? (
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
              />
            </Base>
          ) : (
            <BlockedInfoArea
              account={account}
              isAnswered={isAnswered}
              isMinusReputation={isMinusReputation}
              showLoginModal={showLoginModal}
              isBanned={isBanned}
              isFrozenCommunity={isFrozenCommunity}
            />
          )}
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
  showLoginModal: PropTypes.func,
};

export default React.memo(ViewQuestionContainer);
