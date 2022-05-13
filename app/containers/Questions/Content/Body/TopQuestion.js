import React, { memo, useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import { IconLm } from 'components/Icon/IconWithSizes';

import topQuestionActiveIcon from 'images/starActive.svg?external';
import topQuestionsInactiveIcon from 'images/star.svg?external';

import { BORDER_WARNING_LIGHT } from 'style-constants';

import TopQuestionPopover from './TopQuestionPopover';

import { MAX_TOP_QUESTIONS_COUNT } from '../../constants';
import { removeOrAddTopQuestion } from '../../actions';

const Button = styled.button`
  cursor: ${({ active }) => (active ? 'pointer' : 'default')} !important;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const TopQuestion = ({
  id,
  locale,
  profileInfo,
  isTopQuestion,
  isModerator,
  topQuestionsCount,
  removeOrAddTopQuestionDispatch,
  topQuestionActionProcessing,
}) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  const onClick = useCallback(() => removeOrAddTopQuestionDispatch(id), [id]);

  const topQuestionIcon = useMemo(() => {
    if (isTopQuestion) {
      return topQuestionActiveIcon;
    }
    if (isModerator && topQuestionsCount < MAX_TOP_QUESTIONS_COUNT) {
      return topQuestionsInactiveIcon;
    }

    return undefined;
  }, [isTopQuestion, profileInfo, isModerator]);

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
        <IconLm
          icon={topQuestionIcon}
          fill={BORDER_WARNING_LIGHT}
          color={BORDER_WARNING_LIGHT}
        />
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
  removeOrAddTopQuestionDispatch: PropTypes.func,
  topQuestionActionProcessing: PropTypes.bool,
};

export default memo(
  connect(null, (dispatch) => ({
    removeOrAddTopQuestionDispatch: bindActionCreators(
      removeOrAddTopQuestion,
      dispatch,
    ),
  }))(TopQuestion),
);
