import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import CheckedIcon from 'icons/Checked';

import PrimaryButton from 'components/Button/Contained/PrimaryMedium';
import InfoButton from 'components/Button/Outlined/InfoMedium';

import Button from './index';
import messages from './messages';
import { BG_LIGHT } from '../../style-constants';

const B = ({ isFollowed, onClick, id, disabled }) => {
  if (isFollowed) {
    return (
      <PrimaryButton
        id={id}
        data-isfollowed={isFollowed}
        onClick={onClick}
        disabled={disabled}
      >
        <CheckedIcon stroke={BG_LIGHT} />
      </PrimaryButton>
    );
  }

  return (
    <InfoButton
      id={id}
      data-isfollowed={isFollowed}
      onClick={onClick}
      disabled={disabled}
    >
      <FormattedMessage {...messages.subscribe} />
    </InfoButton>
  );
};

export const StyledButton = ({ communityIdFilter }) => (
  <Button
    communityIdFilter={communityIdFilter}
    render={({ isFollowed, onClick, id, disabled }) => (
      <B
        id={id}
        isFollowed={isFollowed}
        onClick={onClick}
        disabled={disabled}
      />
    )}
  />
);

B.propTypes = {
  isFollowed: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  id: PropTypes.string.isRequired,
};

StyledButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(StyledButton);
