import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import okayIcon from 'svg/okay';
import { blue, transparent } from 'style-constants';

import OutlinedButton from 'components/Button/OutlinedButton';
import Icon from 'components/Icon';

import Button from './index';
import messages from './messages';

/* istanbul ignore next */
const BStyled = OutlinedButton.extend`
  background-color: ${x => (x['data-isfollowed'] ? blue : transparent)};
  border: ${x => (x['data-isfollowed'] ? 'none' : '')};
`;

const B = /* istanbul ignore next */ ({ isFollowed, onClick }) => (
  <BStyled data-isfollowed={isFollowed} onClick={onClick}>
    {!isFollowed && <FormattedMessage {...messages.follow} />}

    {isFollowed && <Icon icon={okayIcon} noMargin />}
  </BStyled>
);

export const StyledButton = /* istanbul ignore next */ ({
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

StyledButton.propTypes = {
  communityIdFilter: PropTypes.number,
};

export default React.memo(StyledButton);
