/* eslint indent: 0 */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { singleCommunityStyles } from 'utils/communityManagement';
import { italicFont } from 'global-styles';
import messages from 'common-messages';
import { POST_TYPE } from './constants';

import {
  BORDER_SECONDARY,
  BORDER_PRIMARY,
  BORDER_PRIMARY_RGB,
  BORDER_RADIUS_M,
  PEER_WARNING_COLOR,
} from 'style-constants';

import { Wrapper } from 'components/FormFields/Wrapper';
import { Styles } from 'components/Input/InputStyled';
import B from 'components/Button';

const styles = singleCommunityStyles();

export const QUESTION_TYPES = {
  GENERAL: {
    value: POST_TYPE.generalPost,
    label: 'general',
  },
  EXPERT: {
    value: POST_TYPE.expertPost,
    label: 'expert',
  },
  TUTORIAL: {
    value: POST_TYPE.tutorial,
    label: 'tutorial',
  },
  FAQ: {
    value: POST_TYPE.documentation,
    label: 'faq',
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

const Warning = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 205px;
  padding-top: 10px;
  font-style: ${italicFont};
  color: grey;
  font-size: 14px;
  line-height: 18px;

  @media (max-width: 768px) {
    padding-top: 0;
    margin: -7px 0 0;
  }
`;

const ButtonGroup = styled.div`
  ${Styles};
  padding: 0;
  display: flex;

  @media (max-width: 576px) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
`;

const Img = styled.img`
  width: 10px;
  height: 40px;
  margin-right: 8px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Button = B.extend`
  &:first-child {
    border-top-left-radius: ${BORDER_RADIUS_M};
    border-bottom-left-radius: ${BORDER_RADIUS_M};
    border-radius: ${styles.buttonBorderRadius};
  }

  &:last-child {
    border-left: none;
    border-top-right-radius: ${BORDER_RADIUS_M};
    border-bottom-right-radius: ${BORDER_RADIUS_M};
    border-radius: ${styles.buttonBorderRadius};
  }

  flex: 1;
  border: 1px solid ${BORDER_SECONDARY};
  border-color: ${({ type, value }) =>
    +type === value && `rgb(${BORDER_PRIMARY_RGB})`};
  box-shadow: ${({ type, value }) =>
    +type === value && `0 0 0 3px rgba(${BORDER_PRIMARY_RGB}, 0.4)`};

  &:hover {
    box-shadow: 0 0 0 3px rgba(${BORDER_PRIMARY_RGB}, 0.4);
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
}) => {
  const [type, setType] = useState();

  function chooseQuestionType({ currentTarget }) {
    const { value } = currentTarget;
    event.preventDefault();
    input.onChange(value);
    setType(value);
  }

  //Don't show FAQ post type unless user isn't community moderator
  const types = isCommunityModerator
    ? Object.values(QUESTION_TYPES)
    : Object.values(QUESTION_TYPES).slice(0, 3);

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
          {types.map(questionType => (
            <Button
              type={type}
              onClick={chooseQuestionType}
              value={questionType.value}
              currentValue={input.value}
              key={questionType.label}
              disabled={disabled}
            >
              <FormattedMessage {...messages[questionType.label]} />
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
