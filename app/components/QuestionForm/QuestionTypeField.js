/* eslint indent: 0 */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import {
  BORDER_SECONDARY,
  BORDER_PRIMARY,
  BORDER_PRIMARY_RGB,
} from 'style-constants';

import { Wrapper } from 'components/FormFields/Wrapper';
import { Styles } from 'components/Input/InputStyled';
import B from 'components/Button';

export const QUESTION_TYPES = {
  GENERAL: {
    value: 1,
    label: 'general',
  },
  EXPERT: {
    value: 0,
    label: 'expert',
  },
};

const ButtonGroup = styled.div`
  ${Styles};

  padding: 0;
  display: flex;
  border: none;
`;

const Button = B.extend`
  &:first-child {
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  &:last-child {
    border-left: none;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  flex: 1;
  border: 1px solid
    ${x =>
      +x.currentValue === +x.value
        ? `${BORDER_PRIMARY} !important`
        : BORDER_SECONDARY}};

  box-shadow: ${x =>
    +x.currentValue === +x.value
      ? `0 0 0 3px rgba(${BORDER_PRIMARY_RGB}, 0.4)`
      : `none`};

  @media only screen and (max-width: 576px) {
    height: 36px;
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
}) => {
  function chooseQuestionType(event) {
    event.preventDefault();
    input.onChange(event.currentTarget.value);
  }

  return (
    <Wrapper
      label={label}
      tip={tip}
      meta={meta}
      splitInHalf={splitInHalf}
      disabled={disabled}
      id={input.name}
      insideOfSection={insideOfSection}
    >
      <ButtonGroup>
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
