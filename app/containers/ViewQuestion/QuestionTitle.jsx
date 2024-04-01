import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';

import { BG_SUCCESS, TEXT_PREMIUM } from 'style-constants';

import checkIcon from 'images/okayGreen.svg?inline';

import { isSingleCommunityWebsite, graphCommunityColors } from 'utils/communityManagement';
import { getFormattedDate, dateNowInSeconds } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';

import Base from 'components/Base';
import H3 from 'components/H3';
import TagList from 'components/TagsList';
import QuestionCommunity from 'components/QuestionForProfilePage/QuestionCommunity';
import Button from 'components/Button/Outlined/InfoMedium';

import { CheckGraph } from 'components/icons';

import { Bounty } from './Bounty';
import QuestionLabel from './QuestionLabel';
import { MarkAnswerNotification } from './MarkAsAcceptedIcon';
import { BOUNTY_PAID_CLASSNAME } from './constants';
import { makeSelectAccount, makeSelectProfileInfo } from '../AccountProvider/selectors';

const graphCommunity = graphCommunityColors();

export const B = Button.extend`
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 32px;
  transition-property: none;
  width: max-content;
`.withComponent('span');

const QuestionName = H3.extend`
  display: inline;
  font-size: 30px;
`.withComponent('h3');

const Div = styled.div`
  min-width: 140px;
  margin-right: 10px;
`;
const TitleContainer = styled.div`
  .${BOUNTY_PAID_CLASSNAME} {
    background-color: ${graphCommunity ? '#4BCA81' : BG_SUCCESS};
  }
`;

const PromotionInfo = styled.div`
  color: ${TEXT_PREMIUM};
  margin-top: 10px;
  text-align: right;
`;

const BaseExtnded = Base.extend`
  display: flex;
`;

export const QuestionTitle = ({
  title,
  communities,
  user,
  questionData,
  profileInfo,
  locale,
  account,
}) => {
  const { t } = useTranslation();
  const {
    tags,
    bestReply: correctAnswerId,
    answers,
    questionBounty,
    isGeneral,
    promote,
    author: questionAuthor,
    postType,
    communityId,
  } = questionData;

  const isActivePromotion = useMemo(
    () => promote && promote.endsTime > dateNowInSeconds() && account === questionAuthor,
    [promote, account, questionAuthor],
  );

  const promotedQuestionEndsTime = useMemo(() => {
    if (typeof promote === 'object') {
      return getFormattedDate(promote.endsTime, locale, MONTH_3LETTERS__DAY_YYYY_TIME);
    }

    return null;
  }, [promote]);

  const isItWrittenByMe = profileInfo
    ? user === profileInfo.user || user === profileInfo.id
    : false;

  return title ? (
    <BaseExtnded paddingTop="5" paddingTopMedia="5" position="middle" paddingBottom="10" withoutBR>
      <Div>
        {!correctAnswerId && isItWrittenByMe && answers.length ? (
          <>
            <MarkAnswerNotification className="d-inline-flex">
              {graphCommunity ? (
                <CheckGraph className="mr-2" fill="#6F4CFF" size={[20, 20]} />
              ) : (
                <img className="mr-2" src={checkIcon} alt="icon" />
              )}
              {t(
                `post.${
                  isGeneral ? 'markGeneralQuestionAndGetEarn' : 'markExpertQuestionAndGetEarn'
                }`,
              )}
            </MarkAnswerNotification>
            <br />
          </>
        ) : null}

        <TitleContainer>
          {questionBounty && (
            <Bounty
              amount={questionBounty.amount}
              status={questionBounty.status}
              timestamp={questionBounty.timestamp}
              disabled={questionBounty.disabled}
              bountyMessage={questionBounty.bountyMessage}
              locale={questionBounty.locale}
            />
          )}
          <QuestionName>{title}</QuestionName>
        </TitleContainer>

        <TagList className="my-2" tags={tags} communityId communities={communities} bySuiId>
          {!isSingleCommunityWebsite() ? (
            <QuestionCommunity
              className="my-1"
              communities={communities}
              communityId={communityId}
              postType={postType}
              locale={locale}
            />
          ) : null}
        </TagList>
        {isActivePromotion && (
          <PromotionInfo>
            {t('post.questionIsPromoting')} {promotedQuestionEndsTime}
          </PromotionInfo>
        )}
      </Div>
      <QuestionLabel postType={postType} />
    </BaseExtnded>
  ) : null;
};

QuestionTitle.propTypes = {
  title: PropTypes.string,
  tags: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  communities: PropTypes.array,
  isGeneral: PropTypes.bool,
  user: PropTypes.string,
  questionData: PropTypes.object,
  questionBounty: PropTypes.object,
  profileInfo: PropTypes.object,
  locale: PropTypes.string,
  account: PropTypes.string,
};

export default React.memo(
  connect(
    createStructuredSelector({
      profileInfo: makeSelectProfileInfo(),
      account: makeSelectAccount(),
    }),
    null,
  )(QuestionTitle),
);
