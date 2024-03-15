import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { userNotifications } from 'routes-config';

import { BORDER_PRIMARY } from 'style-constants';
import clockIcon from 'images/clockIcon.svg?external';
import notificationsIcon from 'images/notificationsBlue.svg?external';

import { singleCommunityColors, graphCommunityColors } from 'utils/communityManagement';

import { makeSelectProfileInfo } from 'containers/AccountProvider/selectors';
import MarkAllAsReadButton from 'components/Notifications/MarkAllAsReadButton';
import { IconXm } from 'components/Icon/IconWithSizes';
import { BellGraph, XGraph } from 'components/icons';

import styles from './Notification.styled';

const graphCommunity = graphCommunityColors();
const colors = singleCommunityColors();

const SeeAllButton = () => {
  const { t } = useTranslation();
  return (
    <div css={styles.seeAll}>
      {graphCommunity ? (
        <BellGraph className="mr-1" size={[24, 24]} />
      ) : (
        <IconXm
          className="mr-2"
          icon={notificationsIcon}
          color={colors.btnColor || BORDER_PRIMARY}
          fill={colors.btnColor || BORDER_PRIMARY}
        />
      )}
      {t('common.seeAll')}
    </div>
  );
};

const Footer = ({ onClose, profile, empty }) => {
  const { t } = useTranslation();
  return (
    <div css={styles.footerContainer}>
      <Link onClick={onClose} to={userNotifications(profile)}>
        {empty ? (
          <>
            {graphCommunity ? (
              <XGraph size={[24, 24]} />
            ) : (
              <IconXm
                className="mr-2"
                icon={clockIcon}
                color={colors.contentHeader || BORDER_PRIMARY}
                fill={colors.contentHeader || BORDER_PRIMARY}
              />
            )}
            <span css={{ marginRight: '25px' }}>{t('common.archive')}</span>
          </>
        ) : (
          <SeeAllButton />
        )}
      </Link>
      {!empty && <MarkAllAsReadButton />}
    </div>
  );
};

Footer.propTypes = {
  empty: PropTypes.bool,
  onClose: PropTypes.func,
  profile: PropTypes.string,
};

export default memo(
  connect((state) => ({
    profile: makeSelectProfileInfo()(state).user,
  }))(Footer),
);
