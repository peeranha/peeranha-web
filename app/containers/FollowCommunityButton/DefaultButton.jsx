import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { isSingleCommunityWebsite } from 'utils/communityManagement';
import OutlinedButton from 'components/Button/Outlined/InfoMedium';
import ButtonGroupForNotAuthorizedUser from 'containers/Header/ButtonGroupForNotAuthorizedUser';
import { isSuiBlockchain } from 'utils/sui/sui';

import Button from './index';
import { FOLLOW_BUTTON, UNFOLLOW_BUTTON } from './constants';
import { makeSelectProfileInfo } from '../AccountProvider/selectors';

const single = isSingleCommunityWebsite();

const B = ({ isFollowed, onClick, id, disabled, profile, profileInfo, loginWithSuiDispatch }) => {
  const { t } = useTranslation();

  if (single && !profile) {
    return null;
  }
  return !profileInfo && isSuiBlockchain ? (
    <ButtonGroupForNotAuthorizedUser loginWithWallet={loginWithSuiDispatch} isFollowButton={true} />
  ) : (
    <OutlinedButton id={id} data-isfollowed={isFollowed} onClick={onClick} disabled={disabled}>
      {t(`common.followCommunity.${isFollowed ? UNFOLLOW_BUTTON : FOLLOW_BUTTON}`)}
    </OutlinedButton>
  );
};

B.propTypes = {
  isFollowed: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  profile: PropTypes.object,
  profileInfo: PropTypes.object,
  loginWithSuiDispatch: PropTypes.func,
};

const BWrapper = connect((state) => ({
  profile: makeSelectProfileInfo()(state),
}))(B);

export const DefaultButton = ({ communityIdFilter }) => (
  <Button
    communityIdFilter={communityIdFilter}
    render={({ isFollowed, onClick, id, disabled, profileInfo, loginWithSuiDispatch }) => (
      <BWrapper
        id={id}
        isFollowed={isFollowed}
        onClick={onClick}
        disabled={disabled}
        profileInfo={profileInfo}
        loginWithSuiDispatch={loginWithSuiDispatch}
      />
    )}
  />
);

DefaultButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(DefaultButton);
