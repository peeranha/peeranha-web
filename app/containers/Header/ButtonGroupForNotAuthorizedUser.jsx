/**
 *
 * ButtonGroupForNotAuthorizedUser
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import LargeOutlinedButton from 'components/Button/Outlined/InfoLarge';

import { singleCommunityStyles } from 'utils/communityManagement';
const styles = singleCommunityStyles();

const ButtonGroupForNotAuthorizedUser = ({ showLoginModal }) => (
  <>
    <LargeOutlinedButton
      className="d-none d-sm-flex"
      onClick={showLoginModal}
      customStyles={styles.headerLoginButtonStyles}
    >
      <FormattedMessage {...messages.login} />
    </LargeOutlinedButton>
  </>
);

ButtonGroupForNotAuthorizedUser.propTypes = {
  showLoginModal: PropTypes.func,
  isMenuVisible: PropTypes.bool,
};

export default React.memo(ButtonGroupForNotAuthorizedUser);
