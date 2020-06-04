import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { userNotifications } from 'routes-config';
import messages from 'common-messages';

import { BORDER_SECONDARY_LIGHT, TEXT_PRIMARY, BORDER_PRIMARY } from 'style-constants';

import MarkAllAsReadButton from 'components/Notifications/MarkAllAsReadButton';
import Icon from 'components/Icon';

import clockIcon from 'images/clockIcon.svg?external';
import notificationsIcon from 'images/notificationsBlue.svg?external';

import { makeSelectProfileInfo } from '../../../AccountProvider/selectors';

const Container = styled.div`
  border-top: 1px solid ${BORDER_SECONDARY_LIGHT};
  display: flex;
  width: 100%;
  padding: 16px;
  justify-content: space-between;

  > a {
    display: flex;
    color: ${TEXT_PRIMARY};

    span {
      line-height: 20px;
    }
  }
`;

const Footer = ({ onClose, profile, empty }) => (
  <Container>
    <Link onClick={onClose} to={userNotifications(profile)}>
      {empty ? (
        <>
          <Icon className="mr-2" icon={clockIcon} width="15" fill={BORDER_PRIMARY} />
          <FormattedMessage {...messages.archive} />
        </>
      ) : (
        <>
          <Icon className="mr-2" icon={notificationsIcon} width="15" />
          <FormattedMessage {...messages.seeAll} />
        </>
      )}
    </Link>
    {!empty && <MarkAllAsReadButton />}
  </Container>
);

Footer.propTypes = {
  empty: PropTypes.bool,
  onClose: PropTypes.func,
  profile: PropTypes.string,
};

export default memo(
  connect(state => ({
    profile: makeSelectProfileInfo()(state).user,
  }))(Footer),
);
