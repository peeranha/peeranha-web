import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { translationMessages } from 'i18n';

import Span from 'components/Span';

import { BG_LIGHT, TEXT_DARK } from 'style-constants';

import messages from './messages';

const Base = styled.div`
  position: absolute;
  background-color: ${BG_LIGHT};
  width: 290px;
  z-index: 10;
  height: 55px;
  left: -266px;
  top: 25px;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);}
  padding: 10px;
  text-align: start;
  text-indent: .7em;

  span {
    width: 100%;
    color: ${TEXT_DARK};
    font-size: 14px;
  }
`;

const TopQuestionPopover = ({ locale }) => (
  <Base>
    <Span>{translationMessages[locale][messages.topQuestionPopover.id]}</Span>
  </Base>
);

TopQuestionPopover.propTypes = {
  locale: PropTypes.string,
};

export default TopQuestionPopover;
