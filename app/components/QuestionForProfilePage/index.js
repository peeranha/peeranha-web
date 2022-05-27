import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  TEXT_PRIMARY_DARK,
  BORDER_PRIMARY_DARK,
  BG_SUCCESS,
  TEXT_SECONDARY,
  BG_PRIMARY,
  //BG_PRIMARY_DARK,
  BORDER_RADIUS_M,
  BORDER_RADIUS_L,
} from 'style-constants';

import commonMessages from 'common-messages';

import { getFormattedDate } from 'utils/datetime';
import { MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import okayIcon from 'images/okay.svg?inline';
import crownIcon from 'images/crownIcon.svg?inline';

import Base from 'components/Base';
import Span from 'components/Span';
import { AProps, APropsDefault } from 'components/A';
//import QuestionType from 'components/Labels/QuestionType';

import {
  POST_TYPE_ANSWER,
  POST_TYPE_QUESTION,
} from 'containers/Profile/constants';

import QuestionCommunity from './QuestionCommunity';
import QuestionType from 'containers/Questions/Content/Body/QuestionType';

const single = isSingleCommunityWebsite();

const BaseStyled = Base.extend`
  position: relative;
  border-radius: ${({ bordered }) => (bordered ? BORDER_RADIUS_L : 'none')};

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Badge = Span.extend`
  color: ${TEXT_PRIMARY_DARK};
  border: 1px solid ${BORDER_PRIMARY_DARK};
  border-radius: ${BORDER_RADIUS_M};
  padding: 4px 10px;
  text-align: center;
  width: 57px;
  height: 26px;
  margin-bottom: 8px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 768px) {
    margin-right: 5px;
  }
`;

const AcceptedQuestionBadgeStyled = Badge.extend`
  background: ${BG_SUCCESS};
  margin-right: 20px;
  border: none;

  @media only screen and (max-width: 768px) {
    margin-right: 5px;
  }
`;

const TopCommunityBadgeStyled = Badge.extend`
  background: ${BG_PRIMARY};
  margin-right: 20px;
  border: none;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContentContainer = styled.div`
  display: flex;

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const QuestionLabels = styled.div`
  position: absolute;
  top: 24px;
  right: 7px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;

  @media only screen and (max-width: 576px) {
    top: 50px;
    right: 3px;
  }
`;

/* eslint indent: 0 */
const AcceptedQuestionBadge = ({
  acceptedAnswer,
  elementType,
  isMyAnswerAccepted,
}) =>
  (elementType === POST_TYPE_QUESTION && acceptedAnswer) ||
  (elementType === POST_TYPE_ANSWER && isMyAnswerAccepted) ? (
    <AcceptedQuestionBadgeStyled>
      <img
        className="d-flex align-items-center justify-content-center"
        src={okayIcon}
        alt="icon"
      />
    </AcceptedQuestionBadgeStyled>
  ) : null;

const TopCommunityBadge = ({ isTheLargestRating, elementType }) =>
  isTheLargestRating && elementType === POST_TYPE_ANSWER ? (
    <TopCommunityBadgeStyled>
      <img
        className="d-flex align-items-center justify-content-center"
        src={crownIcon}
        alt="icon"
      />
    </TopCommunityBadgeStyled>
  ) : null;

/* eslint camelcase: 0 */
export const QuestionForProfilePage = ({
  myPostRating,
  title,
  myPostTime,
  locale,
  acceptedAnswer,
  communities,
  communityId,
  postType,
  isMyAnswerAccepted,
  isTheLargestRating,
  route,
  isGeneral,
  bordered,
  isAnswer,
  elementType,
}) => {
  let Link = AProps;
  let href = route;
  if (single && single !== communityId) {
    Link = APropsDefault;
    href = `${process.env.APP_LOCATION}${route}`;
  }
  return (
    <BaseStyled bordered={bordered && !isGeneral}>
      {/* TODO: PEER-281 frame and inscription 'expert'
      {!isGeneral && (
        <QuestionType size="sm">
          <FormattedMessage {...commonMessages.expert} />
        </QuestionType>
      )}*/}
      <ContentContainer>
        <QuestionLabels>
          <QuestionType
            locale={locale}
            postType={postType}
            isPromoted={false}
            isExpert={false}
          />
        </QuestionLabels>

        <div className="d-flex flex-row flex-md-column">
          <Badge bold>{myPostRating}</Badge>

          <AcceptedQuestionBadge
            acceptedAnswer={acceptedAnswer}
            elementType={elementType}
            isMyAnswerAccepted={isMyAnswerAccepted}
          />

          <TopCommunityBadge
            postType={postType}
            isTheLargestRating={isTheLargestRating}
          />
        </div>

        <div className="d-flex px-3 flex-column flex-grow-1">
          <Link
            to={href}
            href={href}
            fontSize="24"
            lineheight="28"
            mobilefs="18"
            bold="true"
          >
            {title}
          </Link>

          <p className="d-flex align-items-center my-1">
            <Span
              className="text-capitalize mr-3"
              fontSize="14"
              color={TEXT_SECONDARY}
            >
              {getFormattedDate(
                myPostTime,
                locale,
                MONTH_3LETTERS__DAY_YYYY_TIME,
              )}
            </Span>
            <QuestionCommunity
              communities={communities}
              communityId={communityId}
            />
          </p>
        </div>
      </ContentContainer>
    </BaseStyled>
  );
};

AcceptedQuestionBadge.propTypes = {
  acceptedAnswer: PropTypes.bool,
  postType: PropTypes.string,
  isMyAnswerAccepted: PropTypes.bool,
};

TopCommunityBadge.propTypes = {
  isTheLargestRating: PropTypes.bool,
  postType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

QuestionCommunity.propTypes = {
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

QuestionForProfilePage.propTypes = {
  myPostRating: PropTypes.number,
  title: PropTypes.string,
  myPostTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  locale: PropTypes.string,
  acceptedAnswer: PropTypes.bool,
  communities: PropTypes.array,
  communityId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  postType: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isMyAnswerAccepted: PropTypes.bool,
  isTheLargestRating: PropTypes.bool,
  route: PropTypes.string,
  isGeneral: PropTypes.bool,
  bordered: PropTypes.bool,
  isAnswer: PropTypes.bool,
};

export default React.memo(QuestionForProfilePage);
