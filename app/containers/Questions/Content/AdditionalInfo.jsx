/* eslint-disable no-nested-ternary */
import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  BG_SUCCESS_LIGHT,
  BG_TRANSPARENT,
  BORDER_SECONDARY,
  TEXT_PRIMARY_DARK,
  TEXT_SUCCESS,
  BORDER_RADIUS_L,
} from 'style-constants';
import officialIcon from 'images/official.svg?inline';
import bestAnswerIcon from 'images/bestAnswer.svg?inline';
import answerIconEmptyInside from 'images/answerIconEmptyInside.svg?inline';
import fingerUpAllQuestionsPage from 'images/fingerUpAllQuestionsPage.svg?inline';
import fingerDownAllQuestionsPage from 'images/fingerDownAllQuestionsPage.svg?inline';

import { getFormattedNum, getFormattedNum2 } from 'utils/numbers';
import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';
import {
  ChatTextGraph,
  CertificateGraph,
  TheBestGraph,
  ThumbsUpGraph,
  ThumbsDownGraph,
} from 'components/icons';
import Span from 'components/Span';
import Base from 'components/Base';

const colors = singleCommunityColors();
const graphCommunity = graphCommunityColors();

const Container = styled.div`
  background: ${colors.additionalInfoBackground || ''};
  border-top-left-radius: ${({ notRoundedStyle }) =>
    notRoundedStyle ? 'none' : BORDER_RADIUS_L} !important;
  border-bottom-left-radius: ${({ notRoundedStyle }) =>
    notRoundedStyle ? 'none' : BORDER_RADIUS_L} !important;
  display: flex;
  flex-grow: 0;
  flex-direction: column;

  @media only screen and (max-width: 576px) {
    flex-direction: row;
    flex-grow: 1;
  }
`;

const Div = Base.extend`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 120px;
  padding: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid ${graphCommunity ? '#3D3D54' : BORDER_SECONDARY};

  > span {
    display: flex;
    align-items: center;
    justify-content: center;

    > img {
      width: 18px;
      margin-right: 8px;
    }

    > span {
      font-weight: 600;
    }
  }

  &:not(:last-child) {
    border-top-left-radius: ${BORDER_RADIUS_L};
    border-bottom: 1px solid ${graphCommunity ? '#3D3D54' : BORDER_SECONDARY};
  }

  @media only screen and (max-width: 576px) {
    width: auto;

    border-bottom: 1px solid ${graphCommunity ? '#3D3D54' : BORDER_SECONDARY};
    border-right: 1px solid ${graphCommunity ? '#3D3D54' : BORDER_SECONDARY};

    :last-child {
      border-right: none;
    }
  }

  background: ${(x) =>
    x.isAccepted
      ? graphCommunity
        ? 'rgba(75, 202, 129, 0.2)'
        : BG_SUCCESS_LIGHT
      : BG_TRANSPARENT};
`;

const AdditionalInfo = ({
  correctAnswerId,
  answers,
  rating,
  answersCount,
  officialAnswersCount,
  isSearchPage,
  isTutorial,
}) => {
  const icon = useMemo(() => {
    if (officialAnswersCount) {
      return officialIcon;
    }

    return correctAnswerId ? bestAnswerIcon : answerIconEmptyInside;
  }, [correctAnswerId, officialAnswersCount]);

  const graphIcon = useMemo(() => {
    if (officialAnswersCount) {
      return <CertificateGraph size={[24, 24]} className="mr-1" />;
    }

    return correctAnswerId ? (
      <TheBestGraph size={[24, 24]} className="mr-1" fill="#4BCA81" />
    ) : (
      <ChatTextGraph size={[24, 24]} className="mr-1" />
    );
  }, [correctAnswerId, officialAnswersCount]);

  const color = useMemo(
    () =>
      !correctAnswerId || officialAnswersCount
        ? colors.linkColor || TEXT_PRIMARY_DARK
        : TEXT_SUCCESS,
    [officialAnswersCount, correctAnswerId],
  );

  const [src, formattedRating] = useMemo(
    () => [
      rating >= 0 ? fingerUpAllQuestionsPage : fingerDownAllQuestionsPage,
      getFormattedNum2(rating),
    ],
    [rating],
  );

  const graphVote = useMemo(
    () =>
      rating >= 0 ? (
        <ThumbsUpGraph size={[24, 24]} className="mr-1" />
      ) : (
        <ThumbsDownGraph size={[24, 24]} className="mr-1" />
      ),
    [rating],
  );

  const formattedAnswerCount = useMemo(
    () => (isSearchPage ? getFormattedNum(answersCount) : getFormattedNum(answers.length)),
    [answersCount],
  );

  return (
    <Container>
      {!isTutorial && (
        <Div isAccepted={correctAnswerId}>
          <span>
            {graphCommunity ? graphIcon : <img src={icon} alt="icon" />}
            <Span color={color}>{formattedAnswerCount}</Span>
          </span>
        </Div>
      )}

      <Div>
        <span>
          {graphCommunity ? graphVote : <img src={src} alt="icon" />}

          <Span color={colors.linkColor || TEXT_PRIMARY_DARK}>{formattedRating}</Span>
        </span>
      </Div>
    </Container>
  );
};

AdditionalInfo.propTypes = {
  answers: PropTypes.array,
  rating: PropTypes.number,
  correctAnswerId: PropTypes.number,
  officialAnswersCount: PropTypes.number,
};

export default memo(AdditionalInfo);
