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

import { MarkAnswerNotification } from './MarkAsAcceptedIcon';
import messages from './messages';
import { isSingleCommunityWebsite } from '../../utils/communityManagement';
import SendTips from '../SendTips';

// eslint-disable-next-line no-unused-vars
export const B = Button.extend`
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
  min-height: 32px;
  transition-property: none;
  width: 100%;
`.withComponent('span');

const Div = styled.div`
  min-width: 140px;
`;

export const QuestionTitle = ({
  title,
  tags,
  communityId,
  communities,
  isItWrittenByMe,
  correctAnswerId,
  answersNumber,
  isGeneral,
  user,
}) =>
  title ? (
    <Base position="middle" bordered={!isGeneral}>
      {!isGeneral && (
        <QuestionType size="md">
          <FormattedMessage {...messages.expertQuestion} />
        </QuestionType>
      )}
      <Div>
        {!isItWrittenByMe && (
          <SendTips form="tip-question" account={user}>
            <B>
              <img className="mr-1" src={coinsIcon} alt="icon" />
              <FormattedMessage {...commonMessages.tipQuestion} />
            </B>
          </SendTips>
        )}

        <MarkAnswerNotification
          className={
            !correctAnswerId && isItWrittenByMe && answersNumber
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
};

export default React.memo(QuestionTitle);
