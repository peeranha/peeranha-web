import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { APP_FONT } from 'style-constants';
import Container from 'components/Labels/BountyLabel';

import TransparentButton from 'components/Button/Contained/Transparent';
import BountyPopover from './BountyPopover';
import { convertPeerValueToNumberValue } from '../../utils/walletManagement';
import { getFormattedDate } from '../../utils/datetime';
import { MONTH_3LETTERS__DAY_TIME } from '../../utils/constants';

/* eslint no-nested-ternary: 0, indent: 0 */
export const SpanStyled = TransparentButton.extend`
  color: white;
  display: inline-flex;
  align-items: center;
  margin-right: 10px;
  padding: 3px 8px;
  background-color: #576fed;
  border-radius: 20px;
  font-size: 20px;
  font-family: ${APP_FONT};
  font-weight: 600;
  line-height: 20px;

  > *:last-child {
    margin-left: 7px;
  }

  @media only screen and (max-width: 576px) {
    margin-left: 8px;
    > *:last-child {
      display: none;
    }
  }
`;

export const Bounty = ({ user, bounty, status, timestamp, disabled }) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  const amount = bounty ? convertPeerValueToNumberValue(bounty) : null;
  const time = getFormattedDate(timestamp, 'en', MONTH_3LETTERS__DAY_TIME);

  let className = '';
  switch (status) {
    case 1:
      className = 'bountyActive';
      break;
    case 2:
      className = 'bountyPaid';
      break;
    case 3:
      className = 'bountyPending';
      break;
    default:
      className = '';
  }
  return bounty ? (
    <Container
      size="sm"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {visible && <BountyPopover date={time} locale="en" />}
      <SpanStyled className={className} disabled={disabled}>
        +{amount}
      </SpanStyled>
    </Container>
  ) : null;
};

Bounty.propTypes = {
  user: PropTypes.string,
  bounty: PropTypes.string,
  status: PropTypes.number,
  timestamp: PropTypes.number,
  disabled: PropTypes.bool,
};

export default React.memo(Bounty);
