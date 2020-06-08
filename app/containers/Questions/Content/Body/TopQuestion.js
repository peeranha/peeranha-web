import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import topQuestionActiveIcon from 'images/starActive.svg?inline';
import topQuestionsInactiveIcon from 'images/star.svg?inline';

import TopQuestionPopover from './TopQuestionPopover';

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
      } else if (isModerator) {
        return topQuestionsInactiveIcon;
      }

      return undefined;
    },
    [isTopQuestion, profileInfo, isModerator],
  );

  const options = useMemo(
    () => (!isModerator ? { onClick, onMouseEnter, onMouseLeave } : {}),
    [isModerator, onMouseEnter, onMouseLeave],
  );

  return (
    !!topQuestionIcon && (
      <Button
        {...options}
        className="ml-2"
        active={!isModerator}
        disabled={topQuestionActionProcessing}
      >
        {visible && <TopQuestionPopover locale={locale} />}
        <img src={topQuestionIcon} width="20" alt="top" />
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
  addToTopQuestionsDispatch: PropTypes.func,
  removeFromTopQuestionsDispatch: PropTypes.func,
  topQuestionActionProcessing: PropTypes.bool,
};

export default memo(TopQuestion);
