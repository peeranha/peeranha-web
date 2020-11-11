import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import { BORDER_SECONDARY, BG_LIGHT } from 'style-constants';

import messages from './messages';

const SeparatorBase = styled.div`
  position: relative;
  width: 100%;

  height: 40px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  &:before {
    content: '';
    position: absolute;
    top: 54%;
    width: 100%;
    height: 1px;
    background-color: ${BORDER_SECONDARY};
  }
`;

const GroupIcon = styled.div`
  position: relative;
  z-index: 2;
  color: ${BORDER_SECONDARY};
  font-style: italic;
  background-color: ${BG_LIGHT};
  padding-right: 7px;
`;

const Separator = ({ groupType, locale }) => {
  const translations = translationMessages[locale]
    ? translationMessages[locale]
    : null;

  const title = translations[(messages.separators[groupType]?.id)];

  return (
    <SeparatorBase>
      <GroupIcon>{title}</GroupIcon>
    </SeparatorBase>
  );
};

Separator.propTypes = {
  groupType: PropTypes.string,
  locale: PropTypes.string,
};

export default Separator;
