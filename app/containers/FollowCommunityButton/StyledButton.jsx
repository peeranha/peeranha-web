import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import okayIcon from 'images/okay.svg?inline';

import PrimaryButton from 'components/Button/Contained/PrimaryMedium';
import InfoButton from 'components/Button/Outlined/InfoMedium';
import ButtonGroupForNotAuthorizedUser from 'containers/Header/ButtonGroupForNotAuthorizedUser';
import { isSuiBlockchain } from 'utils/sui/sui';

import Button from './index';

const B = ({ isFollowed, onClick, id, disabled, profileInfo, loginWithSuiDispatch }) => {
  const { t } = useTranslation();

  if (isFollowed) {
    return (
      <PrimaryButton id={id} data-isfollowed={isFollowed} onClick={onClick} disabled={disabled}>
        <img className="py-1" src={okayIcon} alt="icon" />
      </PrimaryButton>
    );
  }

  return !profileInfo && isSuiBlockchain ? (
    <ButtonGroupForNotAuthorizedUser loginWithWallet={loginWithSuiDispatch} isFollowButton={true} />
  ) : (
    <InfoButton id={id} data-isfollowed={isFollowed} onClick={onClick} disabled={disabled}>
      {t('common.followCommunity.subscribe')}
    </InfoButton>
  );
};

export const StyledButton = ({ communityIdFilter }) => (
  <Button
    communityIdFilter={communityIdFilter}
    render={({ isFollowed, onClick, id, disabled, profileInfo, loginWithSuiDispatch }) => (
      <B
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

B.propTypes = {
  isFollowed: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  profileInfo: PropTypes.object,
  loginWithSuiDispatch: PropTypes.func,
};

StyledButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(StyledButton);
