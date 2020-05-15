import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import {
  BG_SECONDARY_LIGHT,
  BORDER_SECONDARY,
  TEXT_SECONDARY_LIGHT,
} from 'style-constants';

import notificationsIcon from 'images/Notifications_Bright.svg?inline';

import H3 from '../H3';
import Span from '../Span';

const Container = styled.div`
  display: flex;
  align-items: center;
  > h3 {
    margin-right: 20px;
  }
`;

const Icon = styled.div`
  width: 43px;
  height: 43px;
  min-width: 43px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${BG_SECONDARY_LIGHT};
  border: 1px solid ${BORDER_SECONDARY};
  border-radius: 50%;
  margin-right: 20px;
`;

const Header = ({ notificationsNumber }) => (
  <Container>
    <Icon>
      <img src={notificationsIcon} width="25" alt="notifications_icon" />
    </Icon>
    <H3>
      <FormattedMessage {...messages.messageCenter} />
    </H3>
    <Span
      fontSize="38"
      lineHeight="48"
      color={TEXT_SECONDARY_LIGHT}
      bold
      whiteSpace="nowrap"
    >
      {notificationsNumber}
    </Span>
  </Container>
);

Header.propTypes = {
  notificationsNumber: PropTypes.number.isRequired,
};

export default Header;
