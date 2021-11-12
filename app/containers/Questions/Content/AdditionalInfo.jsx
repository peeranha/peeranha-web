import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Span from 'components/Span';
import Base from 'components/Base';

import {
  BG_SUCCESS_LIGHT,
  BG_TRANSPARENT,
  BORDER_SECONDARY,
  TEXT_PRIMARY_DARK,
  TEXT_SUCCESS,
  BORDER_RADIUS_L,
} from 'style-constants';

import { getFormattedNum, getFormattedNum2 } from 'utils/numbers';

import officialIcon from 'images/official.svg?inline';
import bestAnswerIcon from 'images/bestAnswer.svg?inline';
import answerIconEmptyInside from 'images/answerIconEmptyInside.svg?inline';
import fingerUpAllQuestionsPage from 'images/fingerUpAllQuestionsPage.svg?inline';
import fingerDownAllQuestionsPage from 'images/fingerDownAllQuestionsPage.svg?inline';

const Container = styled.div`
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
  border-right: 1px solid ${BORDER_SECONDARY};

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
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }

  @media only screen and (max-width: 576px) {
    width: auto;

    border-bottom: 1px solid ${BORDER_SECONDARY};
    &:not(:last-child) {
      border-right: 1px solid ${BORDER_SECONDARY};
    }
  }

  background: ${x => (x.isAccepted ? BG_SUCCESS_LIGHT : BG_TRANSPARENT)};
`;

const AdditionalInfo = ({
  correctAnswerId,
  answers,
  rating,
  answersCount,
  officialAnswersCount,
  isSearchPage,
}) => {
  const icon = useMemo(
    () => {
      if (officialAnswersCount) {
        return officialIcon;
      }

      return correctAnswerId ? bestAnswerIcon : answerIconEmptyInside;
    },
    [correctAnswerId],
  );

  const color = useMemo(
    () =>
      !correctAnswerId || officialAnswersCount
        ? TEXT_PRIMARY_DARK
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

  const formattedAnswerCount = useMemo(
    () =>
      isSearchPage
        ? getFormattedNum(answersCount)
        : getFormattedNum(answers.length),
    [answersCount],
  );

  return (
    <Container>
      <Div isAccepted={correctAnswerId}>
        <span>
          <img src={icon} alt="icon" />
          <Span color={color}>{formattedAnswerCount}</Span>
        </span>
      </Div>

      <Div>
        <span>
          <img src={src} alt="icon" />
          <Span color={TEXT_PRIMARY_DARK}>{formattedRating}</Span>
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
