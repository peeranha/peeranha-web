import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import okayIcon from 'svg/okay';
import { blue, transparent } from 'style-constants';

import OutlinedButton from 'components/Button/OutlinedButton';
import Icon from 'components/Icon';

import Button from './index';
import messages from './messages';

const BStyled = OutlinedButton.extend`
  background-color: ${x => (x.isFollowed ? blue : transparent)};
  border: ${x => (x.isFollowed ? 'none' : '')};
`;

const B = ({ isFollowed }) => (
  <BStyled isFollowed={isFollowed}>
    {!isFollowed && <FormattedMessage {...messages.follow} />}

    {isFollowed && <Icon icon={okayIcon} noMargin />}
  </BStyled>
);

const StyledButton = ({ communityIdFilter }) => (
  <Button
    communityIdFilter={communityIdFilter}
    render={isFollowed => <B isFollowed={isFollowed} />}
  />
);

B.propTypes = {
  isFollowed: PropTypes.bool,
};

StyledButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(StyledButton);
