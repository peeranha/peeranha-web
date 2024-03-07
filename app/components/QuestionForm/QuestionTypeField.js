/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import {
  singleCommunityStyles,
  singleCommunityColors,
  graphCommunityColors,
} from 'utils/communityManagement';
import isEmpty from 'lodash/isEmpty';
import { POST_TYPE } from './constants';
import { showPopover } from 'utils/popover';

import { BORDER_SECONDARY, BORDER_PRIMARY_RGB, BORDER_RADIUS_M } from 'style-constants';

import { Wrapper } from 'components/FormFields/Wrapper';
import { Styles } from 'components/Input/InputStyled';
import B from 'components/Button';

const colors = singleCommunityColors();
const styles = singleCommunityStyles();
const graphCommunity = graphCommunityColors();
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
  border: ${({ error }) => !error && 'none'};

  @media (max-width: 576px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

const Button = B.extend`
  &:first-child {
    border-top-left-radius: ${graphCommunity ? 'unset' : BORDER_RADIUS_M};
    border-bottom-left-radius: ${graphCommunity ? 'unset' : BORDER_RADIUS_M};
    border-radius: ${graphCommunity ? 'unset' : styles.buttonBorderRadius};
    margin-right: ${graphCommunity ? '6px' : 0};
  }

  &:last-child {
    border-left: ${({ type, value }) =>
      graphCommunity ? 'unset' : Number(type) !== value && 'none'};
    border-top-right-radius: ${graphCommunity ? 'unset' : BORDER_RADIUS_M};
    border-bottom-right-radius: ${graphCommunity ? 'unset' : BORDER_RADIUS_M};
    border-radius: ${graphCommunity ? 'unset' : styles.buttonBorderRadius};
    margin-left: ${graphCommunity ? '6px' : 0};
  }

  flex: 1;
  border: ${({ type, value }) =>
    `1px solid ${
      graphCommunity
        ? Number(type) === value
          ? 'rgba(44, 31, 101, 1)'
          : 'rgba(40, 38, 55, 1)'
        : BORDER_SECONDARY
    }`};
  border-color: ${({ type, value }) =>
    graphCommunity
      ? 'none'
      : Number(type) === value && (colors.textColor || `rgb(${BORDER_PRIMARY_RGB})`)};
  box-shadow: ${({ type, value }) =>
    graphCommunity
      ? 'none'
      : Number(type) === value
      ? `0 0 0 3px ${colors.textColorShadow || customShadow}`
      : 'none'};
  background: ${({ type, value }) =>
    graphCommunity ? (Number(type) === value ? 'rgba(44, 31, 101, 1)' : '') : 'none'};
  border-radius: ${graphCommunity ? '20px' : 'unset'};
  z-index: ${({ type, value }) => (Number(type) === value ? 1 : 0)};
  padding: ${graphCommunity ? '0 12px' : ''};
  font-size: ${graphCommunity ? '16px' : 'inherit'};
  line-height: ${graphCommunity ? '22px' : 'inherit'};
  width: ${graphCommunity ? '33%' : ''};
  color: ${({ type, value }) =>
    graphCommunity
      ? Number(type) === value
        ? 'rgba(255, 255, 255, 1)'
        : 'rgba(225, 225, 228, 1)'
      : ''};

  &:hover {
    box-shadow: ${graphCommunity ? 'none' : `0 0 0 3px ${colors.textColorShadow || customShadow}`};
    z-index: 1;
    background: ${({ type, value }) =>
      graphCommunity
        ? Number(type) === value
          ? 'rgba(44, 31, 101, 1)'
          : 'rgba(31, 30, 47, 1)'
        : ''};
    color: ${graphCommunity ? 'rgba(255, 255, 255, 1)' : ''};
  }
  @media only screen and (max-width: 576px) {
    height: ${graphCommunity ? '' : '36px'};
    margin-top: ${graphCommunity ? '' : '-10px'};
    padding: ${graphCommunity ? '' : '0 5px'};
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
    const { value, dataset } = event.currentTarget;
    event.preventDefault();
    if (!dataset.trigger) {
      input.onChange(value);
      setType(value);
    }
  }

  function showMessage(e) {
    e.preventDefault();
    showPopover(
      e.currentTarget.id,
      isHasRole || isCommunityModerator ? t('post.warningForAdmin') : t('post.warningForUser'),
    );
  }

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
              disabled={disabled}
              onMouseOver={questionType.isDisabled && showMessage}
              block={questionType.isDisabled}
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
