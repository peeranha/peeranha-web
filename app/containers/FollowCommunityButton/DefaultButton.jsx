import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import OutlinedButton from 'components/Button/Outlined/InfoMedium';

import Button from './index';
import messages from './messages';
import { FOLLOW_BUTTON, UNFOLLOW_BUTTON } from './constants';

const B = ({ isFollowed, onClick, id, disabled }) => (
  <OutlinedButton
    id={id}
    data-isfollowed={isFollowed}
    onClick={onClick}
    disabled={disabled}
  >
    <FormattedMessage
      {...messages[isFollowed ? UNFOLLOW_BUTTON : FOLLOW_BUTTON]}
    />
  </OutlinedButton>
);

export const DefaultButton = ({ communityIdFilter }) => (
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

DefaultButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(DefaultButton);
