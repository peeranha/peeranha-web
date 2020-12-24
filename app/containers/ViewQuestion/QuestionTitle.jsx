import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';

import { BG_SUCCESS, BUTTON_COLOR } from 'style-constants';

import checkIcon from 'images/okayGreen.svg?inline';
import coinsIcon from 'images/coins.svg?external';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

import Base from 'components/Base';
import H3 from 'components/H3';
import TagList from 'components/TagsList';
import QuestionType from 'components/Labels/QuestionType';
import QuestionCommunity from 'components/QuestionForProfilePage/QuestionCommunity';
import Button from 'components/Button/Outlined/InfoMedium';
import { IconMd } from 'components/Icon/IconWithSizes';
import { Bounty } from './Bounty';

import { MarkAnswerNotification } from './MarkAsAcceptedIcon';
import SendTips from '../SendTips';

import {
  BOUNTY_ACTIVE_CLASSNAME,
  BOUNTY_PENDING_CLASSNAME,
  BOUNTY_PAID_CLASSNAME,
} from './constants';

import { makeSelectProfileInfo } from '../AccountProvider/selectors';

import messages from './messages';

const styles = singleCommunityStyles();

export const B = Button.extend`
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 32px;
  transition-property: none;
  width: max-content;
`.withComponent('span');

const QuestionName = H3.extend`
  display: initial;
`.withComponent('h3');

const Div = styled.div`
  min-width: 140px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  .${BOUNTY_PAID_CLASSNAME} {
    background-color: ${BG_SUCCESS};
  }
`;

const Top = styled.div`
  > div {
    margin-bottom: 5px;
  }

  @media only screen and (max-width: 310px) {
    flex-direction: column-reverse;
    justify-content: start;

    > div {
      margin-bottom: 5px;
      left: 0;
    }

    > button,
    > div {
      width: fit-content;
    }
  }
`;

export const QuestionTitle = ({
  title,
  communities,
  user,
  questionData,
  questionBounty,
  profileInfo,
  isTemporaryAccount,
}) => {
  const {
    tags,
    community_id: communityId,
    correct_answer_id: correctAnswerId,
    answers,
    isGeneral,
    id,
  } = questionData;

  const isItWrittenByMe = profileInfo ? user === profileInfo.user : false;

  return title ? (
    <Base
      paddingTop="5"
      paddingTopMedia="5"
      position="middle"
      bordered={!isGeneral}
      withoutBR
    >
      <Top>
        {((!profileInfo && !isTemporaryAccount) ||
          (!!profileInfo && !isItWrittenByMe && !isTemporaryAccount)) && (
          <SendTips
            form="tip-question"
            questionId={id}
            answerId={0}
            account={user}
          >
            <B>
              <IconMd
                className="mr-1"
                icon={styles.coinsIcon ? styles.coinsIcon : coinsIcon}
                color={BUTTON_COLOR}
              />
              <FormattedMessage {...commonMessages.tipQuestion} />
            </B>
          </SendTips>
        )}

        {!isGeneral && (
          <QuestionType size="md" top="0px" topMedia="0px">
            <FormattedMessage {...messages.expertQuestion} />
          </QuestionType>
        )}
      </Top>
      <Div>
        {!correctAnswerId && isItWrittenByMe && answers.length ? (
          <>
            <MarkAnswerNotification className="d-inline-flex">
              <img className="mr-2" src={checkIcon} alt="icon" />
              <FormattedMessage
                {...(isGeneral
                  ? messages.markGeneralQuestionAndGetEarn
                  : messages.markExpertQuestionAndGetEarn)}
              />
            </MarkAnswerNotification>
            <br />
          </>
        ) : null}

        <TitleContainer>
          <Bounty {...questionBounty} />
          <QuestionName>{title}</QuestionName>
        </TitleContainer>

        <TagList
          className="my-2"
          chosenTags={tags}
          communityId={communityId}
          communities={communities}
        >
          {!isSingleCommunityWebsite() ? (
            <QuestionCommunity
              className="my-1"
              communities={communities}
              communityId={communityId}
            />
          ) : null}
        </TagList>
      </Div>
    </Base>
  ) : null;
};

QuestionTitle.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communities: PropTypes.array,
  isItWrittenByMe: PropTypes.bool,
  isGeneral: PropTypes.bool,
  correctAnswerId: PropTypes.number,
  answersNumber: PropTypes.number,
  user: PropTypes.string,
  questionData: PropTypes.object,
  questionBounty: PropTypes.object,
  profileInfo: PropTypes.object,
  isTemporaryAccount: PropTypes.bool,
};

export default React.memo(
  connect(
    state => ({
      profileInfo: makeSelectProfileInfo()(state),
    }),
    null,
  )(QuestionTitle),
);
