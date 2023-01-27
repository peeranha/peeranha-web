import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

import Span from 'components/Span';

import { BG_LIGHT, TEXT_DARK } from 'style-constants';

const Base = styled.div`
  position: absolute;
  background-color: ${BG_LIGHT};
  width: 205px;
  z-index: 10;
  right: 0;
  top: 25px;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  padding: 5px 10px;
  text-align: start;

  span {
    width: 100%;
    color: ${TEXT_DARK};
    font-size: 14px;
  }
`;

const TopQuestionPopover = () => {
  const { t } = useTranslation();

  return (
    <Base>
      <Span>{t('common.topQuestionPopover')}</Span>
    </Base>
  );
};

TopQuestionPopover.propTypes = {
  locale: PropTypes.string,
};

export default memo(TopQuestionPopover);
