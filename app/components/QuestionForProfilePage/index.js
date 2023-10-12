import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import {
  TEXT_PRIMARY_DARK,
  BORDER_PRIMARY_DARK,
  BG_SUCCESS,
  TEXT_SECONDARY,
  BG_PRIMARY,
  BORDER_RADIUS_M,
  BORDER_RADIUS_L,
} from 'style-constants';
import QuestionType from 'containers/Questions/Content/Body/QuestionType';

import { getFormattedDate } from 'utils/datetime';
import { isSuiBlockchain, MONTH_3LETTERS__DAY_YYYY_TIME } from 'utils/constants';
import { isSingleCommunityWebsite } from 'utils/communityManagement';

import okayIcon from 'images/okay.svg?inline';
import crownIcon from 'images/crownIcon.svg?inline';

import Base from 'components/Base';
import Span from 'components/Span';
import { AProps, APropsDefault } from 'components/A';

import { POST_TYPE_ANSWER, POST_TYPE_QUESTION } from 'containers/Profile/constants';

import QuestionCommunity from './QuestionCommunity';

const single = isSingleCommunityWebsite();

const BaseStyled = Base.extend`
  position: relative;
  border-bottom-left-radius: ${BORDER_RADIUS_L};
  border-top-left-radius: ${BORDER_RADIUS_L};
  border-top-right-radius: ${BORDER_RADIUS_L};
  border-bottom-right-radius: ${BORDER_RADIUS_L};

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

const TitleHolder = styled.p`
  @media only screen and (max-width: 768px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 576px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80vw;
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
    top: 30px;
    right: 5px;
  }
`;

/* eslint indent: 0 */
const AcceptedQuestionBadge = ({ acceptedAnswer, elementType, isMyAnswerAccepted }) =>
  (elementType === POST_TYPE_QUESTION && acceptedAnswer) ||
  (elementType === POST_TYPE_ANSWER && isMyAnswerAccepted) ? (
    <AcceptedQuestionBadgeStyled>
      <img className="d-flex align-items-center justify-content-center" src={okayIcon} alt="icon" />
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
  isAnswer,
  elementType,
}) => {
  const { t } = useTranslation();
  let Link = AProps;
  let href = route;
  if (single && single !== communityId) {
    Link = APropsDefault;
    href = `${process.env.APP_LOCATION}${route}`;
  }
  return (
    <BaseStyled>
      <ContentContainer>
        <QuestionLabels>
          <QuestionType locale={locale} postType={postType} isPromoted={false} isExpert={false} />
        </QuestionLabels>

        <div className="d-flex flex-row flex-md-column">
          <Badge bold>{myPostRating}</Badge>

          <AcceptedQuestionBadge
            acceptedAnswer={acceptedAnswer}
            elementType={elementType}
            isMyAnswerAccepted={isMyAnswerAccepted}
          />

          <TopCommunityBadge postType={postType} isTheLargestRating={isTheLargestRating} />
        </div>

        <div className="d-flex px-3 flex-column flex-grow-1">
          <Link to={href} href={href} fontSize="24" lineheight="28" mobilefs="18" bold="true">
            <TitleHolder title={title}>{title}</TitleHolder>
          </Link>

          <p className="d-flex-column d-sm-flex align-items-center my-1">
            <Span className="text-capitalize mr-3" fontSize="14" color={TEXT_SECONDARY}>
              {isAnswer
                ? t('common.answeredWhen', {
                    when: getFormattedDate(myPostTime, locale, MONTH_3LETTERS__DAY_YYYY_TIME),
                  })
                : getFormattedDate(myPostTime, locale, MONTH_3LETTERS__DAY_YYYY_TIME)}
            </Span>
            <QuestionCommunity
              communities={communities}
              communityId={
                isSuiBlockchain
                  ? communities.find((community) => community.id === communityId).id
                  : communityId
              }
              postType={postType}
              locale={locale}
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
