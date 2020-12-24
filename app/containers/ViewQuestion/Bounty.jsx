import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { APP_FONT, PEER_PRIMARY_COLOR } from 'style-constants';

import Container from 'components/Labels/BountyLabel';
import Span from 'components/Span';

import { convertPeerValueToNumberValue } from 'utils/walletManagement';
import { getFormattedDate } from 'utils/datetime';

import {
  BOUNTY_STATUS_ACTIVE,
  BOUNTY_STATUS_PAID,
  BOUNTY_STATUS_PENDING,
  MONTH_3LETTERS__DAY_TIME,
} from 'utils/constants';
import {
  BOUNTY_ACTIVE_CLASSNAME,
  BOUNTY_PAID_CLASSNAME,
  BOUNTY_PENDING_CLASSNAME,
} from './constants';

import BountyPopover from './BountyPopover';

/* eslint no-nested-ternary: 0, indent: 0 */
export const SpanStyled = Span.extend`
  color: white;
  display: inline-flex;
  align-items: center;
  padding: 5px 8px;
  margin-right: 10px;
  background-color: ${PEER_PRIMARY_COLOR};
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

export const Bounty = ({
  amount,
  status,
  timestamp,
  disabled,
  bountyMessage,
  locale,
}) => {
  const [visible, changeVisibility] = useState(false);

  const onMouseEnter = useCallback(() => changeVisibility(true), []);
  const onMouseLeave = useCallback(() => changeVisibility(false), []);

  const bounty = amount ? convertPeerValueToNumberValue(amount) : null;
  const time = timestamp
    ? getFormattedDate(timestamp, locale, MONTH_3LETTERS__DAY_TIME)
    : null;

  let className = '';
  switch (status) {
    case BOUNTY_STATUS_ACTIVE:
      className = BOUNTY_ACTIVE_CLASSNAME;
      break;
    case BOUNTY_STATUS_PAID:
      className = BOUNTY_PAID_CLASSNAME;
      break;
    case BOUNTY_STATUS_PENDING:
      className = BOUNTY_PENDING_CLASSNAME;
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
      {visible && (
        <BountyPopover
          bountyMessage={bountyMessage}
          date={time}
          locale={locale}
        />
      )}
      <SpanStyled className={className} disabled={disabled}>
        +{bounty}
      </SpanStyled>
    </Container>
  ) : null;
};

Bounty.propTypes = {
  bountyMessage: PropTypes.string,
  locale: PropTypes.string,
  amount: PropTypes.string,
  status: PropTypes.number,
  timestamp: PropTypes.number,
  disabled: PropTypes.bool,
};

export default React.memo(Bounty);
