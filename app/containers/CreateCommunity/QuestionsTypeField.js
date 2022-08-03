import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Wrapper } from 'components/FormFields/Wrapper';
import { Styles } from 'components/Input/InputStyled';
import B from 'components/Button';

import {
  BORDER_SECONDARY,
  BORDER_PRIMARY,
  BORDER_PRIMARY_RGB,
  BORDER_RADIUS_M,
} from 'style-constants';

import { ANY_TYPE, GENERAL_TYPE, EXPERT_TYPE } from './constants';

export const QUESTION_TYPES = {
  ANY: {
    value: ANY_TYPE,
    label: 'common.any',
  },
  GENERAL: {
    value: GENERAL_TYPE,
    label: 'common.general',
  },
  EXPERT: {
    value: EXPERT_TYPE,
    label: 'common.expert',
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
    border-top-left-radius: ${BORDER_RADIUS_M};
    border-bottom-left-radius: ${BORDER_RADIUS_M};
  }

  &:last-child {
    border-left: none;
    border-top-right-radius: ${BORDER_RADIUS_M};
    border-bottom-right-radius: ${BORDER_RADIUS_M};
  }

  flex: 1;
  border: 1px solid
    ${x =>
      +x.currentValue === +x.value
        ? `${BORDER_PRIMARY} !important`
        : BORDER_SECONDARY};

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
  const { t } = useTranslation();

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
            {t(questionType.label)}
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
