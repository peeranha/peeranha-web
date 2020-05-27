import React, { memo } from 'react';
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
} from 'style-constants';

import { getFormattedNum, getFormattedNum2 } from 'utils/numbers';

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
// d-flex flex-row flex-sm-column flex-grow-1 flex-sm-grow-0
const Div = Base.extend`
  display: flex;
  justify-content: center;
  flex: 1;
  width: 120px;
  padding: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border-right: 1px solid ${BORDER_SECONDARY};
  &:not(:last-child) {
    border-top-left-radius: 5px;
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

const AdditionalInfo = ({ correctAnswerId, answers, rating }) => (
  <Container className="">
    <Div isAccepted={correctAnswerId}>
      <span className="d-flex align-items-center justify-content-center">
        <img
          className="mr-2"
          src={correctAnswerId ? bestAnswerIcon : answerIconEmptyInside}
          alt="icon"
        />
        <Span color={correctAnswerId ? TEXT_SUCCESS : TEXT_PRIMARY_DARK} bold>
          {getFormattedNum(answers.length)}
        </Span>
      </span>
    </Div>

    <Div>
      <span className="d-flex align-items-center justify-content-center">
        <img
          className="mr-2"
          src={
            rating >= 0 ? fingerUpAllQuestionsPage : fingerDownAllQuestionsPage
          }
          alt="icon"
        />
        <Span color={TEXT_PRIMARY_DARK} bold>
          {getFormattedNum2(rating)}
        </Span>
      </span>
    </Div>
  </Container>
);

AdditionalInfo.propTypes = {
  answers: PropTypes.array,
  rating: PropTypes.number,
  correctAnswerId: PropTypes.number,
};

export default memo(AdditionalInfo);
