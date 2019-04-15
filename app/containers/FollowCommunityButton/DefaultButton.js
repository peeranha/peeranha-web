import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import OutlinedButton from 'components/Button/OutlinedButton';

import Button from './index';
import messages from './messages';
import { FOLLOW_BUTTON, UNFOLLOW_BUTTON } from './constants';

const B = /* istanbul ignore next */ ({ isFollowed, onClick }) => (
  <OutlinedButton data-isfollowed={isFollowed} onClick={onClick}>
    <FormattedMessage
      {...messages[isFollowed ? UNFOLLOW_BUTTON : FOLLOW_BUTTON]}
    />
  </OutlinedButton>
);

export const DefaultButton = /* istanbul ignore next */ ({
  communityIdFilter,
}) => (
  <Button
    communityIdFilter={communityIdFilter}
    render={({ isFollowed, onClick }) => (
      <B isFollowed={isFollowed} onClick={onClick} />
    )}
  />
);

B.propTypes = {
  isFollowed: PropTypes.bool,
  onClick: PropTypes.func,
};

DefaultButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(DefaultButton);
