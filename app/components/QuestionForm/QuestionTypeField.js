import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  singleCommunityStyles,
  singleCommunityColors,
} from 'utils/communityManagement';
import isEmpty from 'lodash/isEmpty';
import { POST_TYPE } from './constants';
import { showPopover } from 'utils/popover';

import {
  BORDER_SECONDARY,
  BORDER_PRIMARY_RGB,
  BORDER_RADIUS_M,
} from 'style-constants';

import { Wrapper } from 'components/FormFields/Wrapper';
import { Styles } from 'components/Input/InputStyled';
import B from 'components/Button';

const colors = singleCommunityColors();
const styles = singleCommunityStyles();
const customShadow = `rgba(${BORDER_PRIMARY_RGB}, 0.4)`;
export const QUESTION_TYPES = {
  GENERAL: {
    value: POST_TYPE.generalPost,
    label: 'common.general',
    isDisabled: false,
  },
  EXPERT: {
    value: POST_TYPE.expertPost,
    label: 'common.expert',
    isDisabled: false,
  },
  TUTORIAL: {
    value: POST_TYPE.tutorial,
    label: 'common.tutorial',
    isDisabled: false,
  },
  FAQ: {
    value: POST_TYPE.documentation,
    label: 'faq',
    isDisabled: false,
  },
};

const QuestionTypeContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ButtonGroup = styled.div`
  ${Styles};
  padding: 0;
  display: flex;
  padding: 0;
  border: ${({ error }) => !error && 'none'};

  @media (max-width: 576px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

const Button = B.extend`
  &:first-child {
    border-top-left-radius: ${BORDER_RADIUS_M};
    border-bottom-left-radius: ${BORDER_RADIUS_M};
    border-radius: ${styles.buttonBorderRadius};
  }

  &:last-child {
    border-left: ${({ type, value }) => Number(type) !== value && 'none'};
    border-top-right-radius: ${BORDER_RADIUS_M};
    border-bottom-right-radius: ${BORDER_RADIUS_M};
    border-radius: ${styles.buttonBorderRadius};
  }

  flex: 1;
  border: 1px solid ${BORDER_SECONDARY};
  border-color: ${({ type, value }) =>
    Number(type) === value &&
    (colors.textColor || `rgb(${BORDER_PRIMARY_RGB})`)};
  box-shadow: ${({ type, value }) =>
    Number(type) === value
      ? `0 0 0 3px ${colors.textColorShadow || customShadow}`
      : 'none'};
  z-index: ${({ type, value }) => (Number(type) === value ? 1 : 0)};
  &:hover {
    box-shadow: 0 0 0 3px ${colors.textColorShadow || customShadow};
    z-index: 1;
  }

  @media only screen and (max-width: 576px) {
    height: 36px;
    margin-top: -10px;
    padding: 0 5px;
  }
`;

const QuestionTypeField = ({
  input,
  label,
  disabled,
  meta,
  tip,
  splitInHalf,
  insideOfSection,
  error,
  isCommunityModerator,
  isHasRole,
  postType,
  postAnswers,
}) => {
  const { t } = useTranslation();
  const [type, setType] = useState(postType);

  useEffect(() => {
    if (postType) {
      input.onChange(postType);
    }
  }, []);

  function chooseQuestionType(event) {
    const { value } = event.currentTarget;
    event.preventDefault();
    input.onChange(value);
    setType(value);
  }

  function showMessage(e) {
    e.preventDefault();
    showPopover(
      e.currentTarget.id,
      isHasRole || isCommunityModerator
        ? t('post.warningForAdmin')
        : t('post.warningForUser'),
    );
  }
  // Don't show FAQ post type unless user isn't community moderator
  // const types = isCommunityModerator
  //   ? Object.values(QUESTION_TYPES)
  //   : Object.values(QUESTION_TYPES).slice(0, 3);

  const types = Object.values(QUESTION_TYPES).slice(0, 3);
  types[2].isDisabled = !isEmpty(postAnswers);

  return (
    <QuestionTypeContainer>
      <Wrapper
        label={label}
        tip={tip}
        meta={meta}
        splitInHalf={splitInHalf}
        disabled={disabled}
        id={input.name}
        insideOfSection={insideOfSection}
      >
        <ButtonGroup error={error}>
          {types.map((questionType, buttonId) => (
            <Button
              id={buttonId}
              type={type}
              onClick={chooseQuestionType}
              value={questionType.value}
              currentValue={input.value}
              key={questionType.label}
              disabled={disabled || questionType.isDisabled}
              onMouseOver={questionType.isDisabled && showMessage}
            >
              {t(questionType.label)}
            </Button>
          ))}
        </ButtonGroup>
      </Wrapper>
    </QuestionTypeContainer>
  );
};

QuestionTypeField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  tip: PropTypes.string,
  splitInHalf: PropTypes.bool,
  label: PropTypes.string,
  insideOfSection: PropTypes.bool,
};

export default QuestionTypeField;
