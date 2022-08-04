import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';

import arrowDownIcon from 'images/arrowDown.svg?external';

import A from 'components/A';
import Icon from 'components/Icon';
import { Button as ProfileButton } from 'containers/Header/ProfileDropdown';

import Logout from 'containers/Logout';
import PropTypes from 'prop-types';
import { getPermissions } from '../../utils/properties';

const MobileLinksInProfile = ({ profile, isMenuVisible }) => {
  const { t } = useTranslation();
  const [visibleProfileLinks, setVisibilityProfileLinks] = useState(false);

  if (!profile || !isMenuVisible) {
    return null;
  }

  const onClick = () => setVisibilityProfileLinks(!visibleProfileLinks);

  const isModerator = Boolean(getPermissions(profile)?.length);

  return (
    <div className="lightbg use-default-links">
      <button
        className="d-flex align-items-center justify-content-between w-100"
        onClick={onClick}
        type="button"
      >
        <ProfileButton profileInfo={profile} isMobileVersion />
        <Icon
          className="mr-3"
          icon={arrowDownIcon}
          width="16"
          rotate={visibleProfileLinks}
        />
      </button>

      {visibleProfileLinks && (
        <div className="pb-2">
          <A to={routes.profileView(profile.user)}>{t('common.profile')}</A>

          <A to={routes.userCommunities(profile.user)}>
            {t('common.myCommunities')}
          </A>

          <A
            disabled={profile.postCount === 0}
            to={routes.userQuestions(profile.user)}
          >
            {t('common.posts')}
          </A>

          <A
            to={routes.userAnswers(profile.user)}
            disabled={profile.answersGiven === 0}
          >
            {t('common.answers')}
          </A>

          <A to={routes.userNotifications(profile.user)}>
            {t('common.notifications')}
          </A>

          <A to={routes.userNFTs(profile.user)}>{t('common.NFTs')}</A>

          {isModerator && (
            <A to={routes.userModeration(profile.user)}>
              {t('common.moderation')}
            </A>
          )}

          <Logout>{t('common.logout')}</Logout>
        </div>
      )}
    </div>
  );
};

MobileLinksInProfile.propTypes = {
  profile: PropTypes.object,
  isMenuVisible: PropTypes.bool,
};

export default MobileLinksInProfile;
