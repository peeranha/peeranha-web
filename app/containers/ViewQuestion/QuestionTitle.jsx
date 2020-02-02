import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import commonMessages from 'common-messages';

import checkIcon from 'images/okayGreen.svg?inline';
import coinsIcon from 'images/coins.svg?inline';

import Base from 'components/Base';
import H3 from 'components/H3';
import TagList from 'components/TagsList';
import QuestionType from 'components/Labels/QuestionType';
import QuestionCommunity from 'components/QuestionForProfilePage/QuestionCommunity';
import Button from 'components/Button/Outlined/InfoMedium';
import SendTokens from 'containers/SendTokens';

import { MarkAnswerNotification } from './MarkAsAcceptedIcon';
import messages from './messages';

const B = Button.extend`
  display: inline-flex;
  align-items: center;
  padding-top: 0;
  padding-bottom: 0;
`.withComponent('span');

export const QuestionTitle = ({
  title,
  tags,
  communityId,
  communities,
  isItWrittenByMe,
  correctAnswerId,
  answersNumber,
  isGeneral,
}) =>
  title ? (
    <Base position="middle" bordered={!isGeneral}>
      <div className="d-flex justify-content-between mb-1">
        <SendTokens>
          <B>
            <img className="mr-1" src={coinsIcon} alt="icon" />
            <FormattedMessage {...commonMessages.tipQuestion} />
          </B>
        </SendTokens>

        <QuestionType size="md" isGeneral={isGeneral}>
          <FormattedMessage {...messages[isGeneral ? 'generalQuestion' : 'expertQuestion']} />
        </QuestionType>
      </div>

      <MarkAnswerNotification
        className={!correctAnswerId && isItWrittenByMe && answersNumber && !isGeneral ? 'd-inline-flex' : 'd-none'}
      >
        <img className="mr-2" src={checkIcon} alt="icon" />
        <FormattedMessage {...messages.markThisQuestionAndGetEarn} />
      </MarkAnswerNotification>

      <H3>{title}</H3>

      <TagList className="my-2" chosenTags={tags} communityId={communityId} communities={communities}>
        <QuestionCommunity className="my-1" communities={communities} communityId={communityId} />
      </TagList>
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
};

export default React.memo(QuestionTitle);
