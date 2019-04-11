import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import OutlinedButton from 'components/Button/OutlinedButton';

import Button from './index';
import messages from './messages';
import { FOLLOW_BUTTON, UNFOLLOW_BUTTON } from './constants';

const B = ({ isFollowed }) => (
  <OutlinedButton>
    <FormattedMessage
      {...messages[isFollowed ? UNFOLLOW_BUTTON : FOLLOW_BUTTON]}
    />
  </OutlinedButton>
);

const DefaultButton = ({ communityIdFilter }) => (
  <Button
    communityIdFilter={communityIdFilter}
    render={isFollowed => <B isFollowed={isFollowed} />}
  />
);

B.propTypes = {
  isFollowed: PropTypes.bool,
};

DefaultButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(DefaultButton);
