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

import { STANDART_TYPE, BLOGGER_TYPE } from './constants';

export const COMMUNITY_TYPES = {
  STANDART: {
    value: STANDART_TYPE,
    label: 'common.standart',
  },
  BLOGGER: {
    value: BLOGGER_TYPE,
    label: 'common.blogger',
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
        : BORDER_SECONDARY}};

  box-shadow: ${x =>
    +x.currentValue === +x.value
      ? `0 0 0 3px rgba(${BORDER_PRIMARY_RGB}, 0.4)`
      : `none`};

  @media only screen and (max-width: 576px) {
    height: 36px;
  }
`;

const CommunityTypeField = ({
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
        {Object.values(COMMUNITY_TYPES).map(type => (
          <Button
            onClick={chooseQuestionType}
            value={type.value}
            currentValue={input.value}
            key={type.label}
            disabled={disabled}
          >
            {t(type.label)}
          </Button>
        ))}
      </ButtonGroup>
    </Wrapper>
  );
};

CommunityTypeField.propTypes = {
  input: PropTypes.object,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
  tip: PropTypes.string,
  splitInHalf: PropTypes.bool,
  label: PropTypes.string,
  insideOfSection: PropTypes.bool,
};

export default CommunityTypeField;
