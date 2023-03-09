import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TEXT_SECONDARY } from 'style-constants';

import closeIcon from 'images/closeGray.svg?inline';

import styles from './Notification.styled';

const Header = ({ notificationsNumber, onClose }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.headerContainer}>
      <div>
        <span css={styles.headerTitle}>{t('common.notifications')}</span>
        <span css={{ color: TEXT_SECONDARY }}>{notificationsNumber}</span>
      </div>
      <button onClick={onClose}>
        <img src={closeIcon} width="15" alt="close_icon" />
      </button>
    </div>
  );
};

Header.propTypes = {
  onClose: PropTypes.func,
  notificationsNumber: PropTypes.number.isRequired,
};

export default Header;
