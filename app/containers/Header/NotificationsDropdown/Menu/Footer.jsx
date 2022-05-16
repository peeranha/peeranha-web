import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { userNotifications } from 'routes-config';
import messages from 'common-messages';

import {
  BORDER_SECONDARY_LIGHT,
  TEXT_PRIMARY,
  BORDER_PRIMARY,
} from 'style-constants';

import MarkAllAsReadButton from 'components/Notifications/MarkAllAsReadButton';
import { IconXm } from 'components/Icon/IconWithSizes';

import clockIcon from 'images/clockIcon.svg?external';
import notificationsIcon from 'images/notificationsBlue.svg?external';

import { makeSelectProfileInfo } from '../../../AccountProvider/selectors';
import { makeSelectLocale } from '../../../LanguageProvider/selectors';
import { DEFAULT_LOCALE } from '../../../../i18n';

const Container = styled.div`
  border-top: 1px solid ${BORDER_SECONDARY_LIGHT};
  display: flex;
  width: 100%;
  padding: 16px;
  justify-content: space-between;
  ${({ locale }) =>
    locale !== DEFAULT_LOCALE &&
    `
    flex-direction: column;
  `} > a {
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
          <IconXm className="mr-2" icon={clockIcon} fill={BORDER_PRIMARY} />
          <FormattedMessage id={messages.archive.id} />
        </>
      ) : (
        <>
          <IconXm className="mr-2" icon={notificationsIcon} />
          <FormattedMessage id={messages.seeAll.id} />
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
  connect((state) => ({
    profile: makeSelectProfileInfo()(state).user,
    locale: makeSelectLocale()(state),
  }))(Footer),
);
