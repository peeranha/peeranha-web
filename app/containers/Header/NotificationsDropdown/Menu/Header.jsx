import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import { BORDER_SECONDARY_LIGHT, TEXT_SECONDARY } from 'style-constants';

import Span from 'components/Span';

import CloseIcon from 'icons/Close';

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 16px;
  justify-content: space-between;
  border-bottom: 1px solid ${BORDER_SECONDARY_LIGHT};

  > div span:nth-child(1) {
    margin-right: 10px;
    font-weight: 600;
    font-size: 18px;
  }
`;

const Header = ({ notificationsNumber, onClose }) => (
  <Container>
    <div>
      <FormattedMessage {...messages.notifications} />
      <Span color={TEXT_SECONDARY}>{notificationsNumber}</Span>
    </div>
    <button onClick={onClose}>
      <CloseIcon fill={TEXT_SECONDARY} size={[17, 17]} />
    </button>
  </Container>
);

Header.propTypes = {
  onClose: PropTypes.func,
  notificationsNumber: PropTypes.number.isRequired,
};

export default Header;
