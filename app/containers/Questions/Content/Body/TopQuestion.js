import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import topQuestionActiveIcon from 'images/starActive.svg?external';
import topQuestionsInactiveIcon from 'images/star.svg?external';

import TopQuestionPopover from './TopQuestionPopover';
import { IconLm } from 'components/Icon/IconWithSizes';

import { MAX_TOP_QUESTIONS_COUNT } from '../../constants';
import { BORDER_WARNING_LIGHT } from 'style-constants';

const Button = styled.button`
  position: relative;
  float: right;
  top: -15px;
  right: -25px;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')} !important;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  @media only screen and (max-width: 576px) {
    top: -10px;
    right: -10px;
  }
`;

const TopQuestion = ({
  id,
  locale,
  profileInfo,
  isTopQuestion,
  isModerator,
  topQuestionsCount,
  addToTopQuestionsDispatch,
  removeFromTopQuestionsDispatch,
  topQuestionActionProcessing,
}) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  const onClick = useCallback(
    () => {
      if (isTopQuestion) {
        removeFromTopQuestionsDispatch(id);
      } else {
        addToTopQuestionsDispatch(id);
      }
    },
    [id, isTopQuestion],
  );

  const topQuestionIcon = useMemo(
    () => {
      if (isTopQuestion) {
        return topQuestionActiveIcon;
      } else if (isModerator && topQuestionsCount < MAX_TOP_QUESTIONS_COUNT) {
        return topQuestionsInactiveIcon;
      }

      return undefined;
    },
    [isTopQuestion, profileInfo, isModerator],
  );

  const options = useMemo(
    () => (isModerator ? { onClick } : { onMouseEnter, onMouseLeave }),
    [isModerator, onMouseEnter, onMouseLeave],
  );

  return (
    !!topQuestionIcon && (
      <Button
        {...options}
        className="ml-2"
        active={isModerator}
        disabled={topQuestionActionProcessing}
      >
        {visible && <TopQuestionPopover locale={locale} />}
        <IconLm icon={topQuestionIcon} fill={BORDER_WARNING_LIGHT} color={BORDER_WARNING_LIGHT} />
      </Button>
    )
  );
};

TopQuestion.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string,
  profileInfo: PropTypes.object,
  isTopQuestion: PropTypes.bool,
  isModerator: PropTypes.bool,
  topQuestionsCount: PropTypes.number,
  addToTopQuestionsDispatch: PropTypes.func,
  removeFromTopQuestionsDispatch: PropTypes.func,
  topQuestionActionProcessing: PropTypes.bool,
};

export default memo(TopQuestion);
