/* eslint indent: 0 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { singleCommunityStyles } from 'utils/communityManagement';
import validationArrowIcon from 'images/validationArrow.svg?inline';
import { italicFont } from '../../global-styles';
import messages from 'common-messages';
import questionMessages from './messages';

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
    value: 1,
    label: 'general',
  },
  EXPERT: {
    value: 0,
    label: 'expert',
  },
  TUTORIAL: {
    value: 2,
    label: 'tutorial',
  },
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
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
    margin-left: 0;
    padding-top: 0;
    margin-top: -7px;
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

  &:hover,
  :focus,
  :active {
    border: 1px solid ${BORDER_PRIMARY} !important;
    box-shadow: 0 0 0 3px rgba(${BORDER_PRIMARY_RGB}, 0.4);
  }

  @media only screen and (max-width: 576px) {
    height: 36px;
    margin-top: -10px;
    padding-left: 15px;
    padding-right: 15px;
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
}) => {
  function chooseQuestionType(event) {
    event.preventDefault();
    input.onChange(event.currentTarget.value);
  }

  return (
    <ButtonWrapper>
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
          {Object.values(QUESTION_TYPES).map(questionType => (
            <Button
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
      {error && (
        <Warning>
          <Img src={validationArrowIcon} alt="icon" />
          <FormattedMessage
            {...questionMessages.questionPostTypeSelectionError}
          />
        </Warning>
      )}
    </ButtonWrapper>
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
