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

import OfficialIcon from 'icons/Official';
import BestAnswerIcon from 'icons/BestAnswer';
import AnswerIcon from 'icons/Answer';
import LikeIcon from 'icons/Like';
import DisLikeIcon from 'icons/DisLike';
import { singleCommunityColors } from 'utils/communityManagement';

const colors = singleCommunityColors();

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

    > svg {
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
    border-right: 1px solid ${BORDER_SECONDARY};

    :last-child {
      border-right: none;
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
  isTutorial,
}) => {
  const icon = useMemo(
    () => {
      if (officialAnswersCount) {
        return <OfficialIcon stroke="#444444" />;
      }

      return correctAnswerId ? (
        <BestAnswerIcon stroke="#28A745" />
      ) : (
        <AnswerIcon stroke="#354A89" />
      );
    },
    [correctAnswerId],
  );
  const color = useMemo(
    () =>
      !correctAnswerId || officialAnswersCount
        ? colors.linkColor || TEXT_PRIMARY_DARK
        : TEXT_SUCCESS,
    [officialAnswersCount, correctAnswerId],
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
      {!isTutorial && (
        <Div isAccepted={correctAnswerId}>
          <span>
            {icon}
            <Span color={color}>{formattedAnswerCount}</Span>
          </span>
        </Div>
      )}

      <Div>
        <span>
          {rating >= 0 ? (
            <LikeIcon stroke="#354A89" />
          ) : (
            <DisLikeIcon stroke="#354A89" />
          )}
          <Span color={colors.linkColor || TEXT_PRIMARY_DARK}>
            {getFormattedNum2(rating)}
          </Span>
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
