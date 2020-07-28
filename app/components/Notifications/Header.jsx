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

import notificationsIcon from 'images/Notifications_Bright.svg?external';

import H3 from '../H3';
import Span from '../Span';
import Icon from 'components/Icon';
import { MediumIconStyled } from 'components/Icon/MediumIcon';

const Container = styled.div`
  display: flex;
  align-items: center;
  > h3 {
    margin-right: 20px;
  }
`;

const Header = ({ notificationsNumber }) => (
  <Container>
    <MediumIconStyled>
      <Icon icon={notificationsIcon} width="25" />
    </MediumIconStyled>
    <H3>
      <FormattedMessage {...messages.notificationCenter} />
    </H3>
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

Header.propTypes = {
  notificationsNumber: PropTypes.number.isRequired,
};

export default Header;
