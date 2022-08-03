import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';

import { singleCommunityStyles } from 'utils/communityManagement';
const styles = singleCommunityStyles();

const ButtonGroupForNotAuthorizedUser = ({ showLoginModal }) => {
  const { t } = useTranslation();

  return (
    <>
      <LargeOutlinedButton
        className="d-none d-sm-flex"
        onClick={showLoginModal}
        customStyles={styles.headerLoginButtonStyles}
      >
        {t('common.login')}
      </LargeOutlinedButton>
    </>
  );
};

ButtonGroupForNotAuthorizedUser.propTypes = {
  showLoginModal: PropTypes.func,
  isMenuVisible: PropTypes.bool,
};

export default React.memo(ButtonGroupForNotAuthorizedUser);
