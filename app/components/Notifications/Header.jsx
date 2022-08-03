import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { TEXT_SECONDARY_LIGHT } from 'style-constants';

import H3 from '../H3';
import Span from '../Span';

const Container = styled.div`
  display: flex;
  align-items: center;

  > h3 {
    margin-right: 20px;
  }

  > span {
    flex-shrink: 0;
  }
`;

const Header = ({ notificationsNumber }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <H3>{t('common.notificationCenter')}</H3>
      <Span
        fontSize="38"
        lineHeight="48"
        color={TEXT_SECONDARY_LIGHT}
        bold
        whiteSpace="nowrap"
        mobileFS="30"
      >
        {notificationsNumber}
      </Span>
    </Container>
  );
};

Header.propTypes = {
  notificationsNumber: PropTypes.number.isRequired,
};

export default Header;
