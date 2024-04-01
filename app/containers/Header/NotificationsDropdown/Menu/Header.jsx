import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { TEXT_SECONDARY } from 'style-constants';
import closeIcon from 'images/closeGray.svg?inline';

import { graphCommunityColors } from 'utils/communityManagement';

import { XGraph } from 'components/icons';

import styles from './Notification.styled';

const graphCommunity = graphCommunityColors();

const Header = ({ notificationsNumber, onClose }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.headerContainer}>
      <div>
        <span
          css={{
            ...styles.headerTitle,
            ...(graphCommunity && { color: '#E1E1E4', marginRight: '4px' }),
          }}
        >
          {t('common.notifications')}
        </span>
        <span css={{ color: graphCommunity ? '#A7A7AD' : TEXT_SECONDARY }}>
          {notificationsNumber}
        </span>
      </div>
      <button onClick={onClose}>
        {graphCommunity ? (
          <XGraph size={[24, 24]} />
        ) : (
          <img src={closeIcon} width="15" alt="close_icon" />
        )}
      </button>
    </div>
  );
};

Header.propTypes = {
  onClose: PropTypes.func,
  notificationsNumber: PropTypes.number.isRequired,
};

export default Header;
