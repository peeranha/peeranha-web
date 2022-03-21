import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import commonMessages from 'common-messages';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import { BG_SUCCESS, BUTTON_COLOR, TEXT_PREMIUM } from 'style-constants';

import checkIcon from 'images/okayGreen.svg?inline';
import coinsIcon from 'images/coins.svg?external';

import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
} from 'utils/communityManagement';
import { getFormattedDate, dateNowInSeconds } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME, POST_TYPE } from 'utils/constants';

import Base from 'components/Base';
import H3 from 'components/H3';
import TagList from 'components/TagsList';
import QuestionType from 'components/Labels/QuestionType';
import QuestionCommunity from 'components/QuestionForProfilePage/QuestionCommunity';
import Button from 'components/Button/Outlined/InfoMedium';
import { IconMd } from 'components/Icon/IconWithSizes';
import { Bounty } from './Bounty';

import { MarkAnswerNotification } from './MarkAsAcceptedIcon';
import SendTips from "../SendTips";

import { BOUNTY_PAID_CLASSNAME } from './constants';

import {
  makeSelectAccount,
  makeSelectProfileInfo,
} from '../AccountProvider/selectors';

import messages from './messages';

const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();

export const B = Button.extend`
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 32px;
  transition-property: none;
  width: max-content;
`.withComponent("span");

const QuestionName = H3.extend`
  display: inline;
`.withComponent('h3');

const Div = styled.div`
  min-width: 140px;
`;
const TitleContainer = styled.div`
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

const PromotionInfo = styled.div`
  color: ${TEXT_PREMIUM};
  margin-top: 10px;
  text-align: right;
`;

export const QuestionTitle = ({
  title,
  communities,
  user,
  questionData,
  profileInfo,
  isTemporaryAccount,
  locale,
  account,
}) => {
  const {
    tags,
    communityId: communityId,
    bestReply: correctAnswerId,
    answers,
    questionBounty,
    isGeneral,
    id,
    promote,
    author: questionAuthor,
    postType,
  } = questionData;

  const isActivePromotion = useMemo(() => {
    if (
      promote &&
      promote.endsTime > dateNowInSeconds() &&
      account === questionAuthor
    ) {
      return true;
    }

    return false;
  }, [promote, account, questionAuthor]);

  const promotedQuestionEndsTime = useMemo(() => {
    if (typeof promote === 'object') {
      return getFormattedDate(
        promote.endsTime,
        locale,
        MONTH_3LETTERS__DAY_YYYY_TIME
      );
    }

    return null;
  }, [promote]);

  const isItWrittenByMe = profileInfo ? user === profileInfo.user : false;

  return title ? (
    <Base paddingTop="5" paddingTopMedia="5" position="middle" withoutBR>
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
                icon={coinsIcon}
                color={BUTTON_COLOR}
                specialStyles={
                  single && styles.coinsIconStyles
                    ? styles.coinsIconStyles
                    : null
                }
              />
              <FormattedMessage {...commonMessages.tipQuestion} />
            </B>
          </SendTips>
        )}
        {postType === POST_TYPE.tutorial && (
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
          tags={tags}
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
        {isActivePromotion && (
          <PromotionInfo>
            <FormattedMessage {...messages.questionIsPromoting} />{" "}
            {promotedQuestionEndsTime}
          </PromotionInfo>
        )}
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
  locale: PropTypes.string,
  account: PropTypes.string,
  questionAuthor: PropTypes.string,
};

export default React.memo(
  connect(
    createStructuredSelector({
      profileInfo: makeSelectProfileInfo(),
      account: makeSelectAccount(),
    }),
    null
  )(QuestionTitle)
);
