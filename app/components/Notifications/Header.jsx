import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

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

const Header = ({ notificationsNumber }) => (
  <Container>
    <H3>
      <FormattedMessage id={messages.notificationCenter.id} />
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
