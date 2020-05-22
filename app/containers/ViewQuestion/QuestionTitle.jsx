import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';

import checkIcon from 'images/okayGreen.svg?inline';
import coinsIcon from 'images/coins.svg?inline';

import Base from 'components/Base';
import H3 from 'components/H3';
import TagList from 'components/TagsList';
import QuestionType from 'components/Labels/QuestionType';
import QuestionCommunity from 'components/QuestionForProfilePage/QuestionCommunity';
import Button from 'components/Button/Outlined/InfoMedium';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';

import { MarkAnswerNotification } from './MarkAsAcceptedIcon';
import messages from './messages';
import SendTips from '../SendTips';

const styles = singleCommunityStyles();

export const B = Button.extend`
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 32px;
  transition-property: none;
  width: max-content;
`.withComponent('span');

const Div = styled.div`
  min-width: 140px;
`;

const Top = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

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
  isItWrittenByMe,
  user,
  questionData,
}) => {
  const {
    tags,
    community_id: communityId,
    correct_answer_id: correctAnswerId,
    answers,
    isGeneral,
    id,
  } = questionData;
  return title ? (
    <Base
      paddingTop="5"
      paddingTopMedia="5"
      position="middle"
      bordered={!isGeneral}
      withoutBR
    >
      <Top>
        {!isItWrittenByMe ? (
          <SendTips
            form="tip-question"
            communityId={communityId}
            questionId={id}
            answerId={0}
            account={user}
          >
            <B>
              <img
                className="mr-1"
                src={styles.coinsIcon ? styles.coinsIcon : coinsIcon}
                alt="icon"
              />
              <FormattedMessage {...commonMessages.tipQuestion} />
            </B>
          </SendTips>
        ) : (
          <div />
        )}
        {!isGeneral && (
          <QuestionType size="md" top="0px" topMedia="0px">
            <FormattedMessage {...messages.expertQuestion} />
          </QuestionType>
        )}
      </Top>
      <Div>
        <MarkAnswerNotification
          className={
            !correctAnswerId && isItWrittenByMe && answers.length
              ? 'd-inline-flex'
              : 'd-none'
          }
        >
          <img className="mr-2" src={checkIcon} alt="icon" />
          <FormattedMessage
            {...(isGeneral
              ? messages.markGeneralQuestionAndGetEarn
              : messages.markExpertQuestionAndGetEarn)}
          />
        </MarkAnswerNotification>

        <H3>{title}</H3>

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
};

export default React.memo(QuestionTitle);
