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
                       displayTopQuestion,
                       isTopQuestion,
                       addToTopQuestionsDispatch,
                       removeFromTopQuestionsDispatch,
                       topQuestionActionProcessing,
                     }) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  const changePinType = useCallback(
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
      } else if (profileInfo && profileInfo.isAdmin) {
        return topQuestionsInactiveIcon;
      }

      return undefined;
    },
    [isTopQuestion, profileInfo],
  );

  return topQuestionIcon ? (
    <Button
      className="ml-2"
      active={displayTopQuestion}
      onClick={displayTopQuestion ? changePinType : null}
      disabled={topQuestionActionProcessing}
      onMouseEnter={!displayTopQuestion ? onMouseEnter : null}
      onMouseLeave={!displayTopQuestion ? onMouseLeave : null}
    >
      {visible && <TopQuestionPopover locale={locale}/>}
      <img src={topQuestionIcon} width="20" alt="top"/>
    </Button>
  ) : null;
};

TopQuestion.propTypes = {
  id: PropTypes.string,
  locale: PropTypes.string,
  profileInfo: PropTypes.object,
  displayTopQuestion: PropTypes.bool,
  isTopQuestion: PropTypes.bool,
  addToTopQuestionsDispatch: PropTypes.func,
  removeFromTopQuestionsDispatch: PropTypes.func,
  topQuestionActionProcessing: PropTypes.bool,
};

export default memo(TopQuestion);
