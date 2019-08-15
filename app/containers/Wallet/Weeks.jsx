import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  TEXT_WARNING_LIGHT,
  TEXT_SECONDARY,
  TEXT_SUCCESS,
} from 'style-constants';

import { getFormattedNum3 } from 'utils/numbers';
import { getFormattedDate } from 'utils/datetime';
import { FULL_MONTH_NAME_DAY_YEAR } from 'utils/constants';

import calendarImage from 'images/calendar.svg?inline';
import currencyPeerImage from 'images/currencyPeer.svg?inline';
import rewardIcon from 'images/add.svg?external';

import P from 'components/P';
import Icon from 'components/Icon';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';
import Span from 'components/Span';
import Base from 'components/Base';
import BaseRounded from 'components/Base/BaseRounded';
import SmallImage from 'components/Img/SmallImage';

import messages from './messages';

const data = [
  {
    id: 5,
  },
  {
    id: 4,
  },
  {
    id: 3,
  },
  {
    id: 2,
  },
  {
    id: 1,
  },
];

const BaseRoundedLi = BaseRounded.extend`
  position: relative;
  display: flex;
  align-items-cemter;
  justify-content: space-between;

  ${IconStyled} {
    ${IconHover({ color: TEXT_SUCCESS })};
  }
`.withComponent('li');

const WeekNumber = ({ number, locale }) => (
  <P>
    <Span className="mr-3" fontSize="24" bold>
      Week {number}
    </Span>

    <Span>
      {getFormattedDate(
        1565692922 + 604800 * number,
        locale,
        FULL_MONTH_NAME_DAY_YEAR,
      )}
      {' — '}
      {getFormattedDate(
        1565692922 + 604800 * number + 604800,
        locale,
        FULL_MONTH_NAME_DAY_YEAR,
      )}
    </Span>
  </P>
);

const CurrentWeek = ({ id, locale }) => (
  <li className="flex-grow-1 mb-3">
    <Base position="top">
      <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
        <FormattedMessage {...messages.currentPeriod} />
      </P>
      <WeekNumber locale={locale} number={id} />
    </Base>
    <Base className="d-flex align-items-center" position="bottom">
      <img className="mr-3" src={calendarImage} alt="calendar" />
      <Span>
        <FormattedMessage {...messages.periodStillInProgress} />
      </Span>
    </Base>
  </li>
);

const PendingWeek = ({ id, locale }) => (
  <li className="flex-grow-1 mb-3">
    <Base position="top">
      <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
        <FormattedMessage {...messages.payoutPending} />
      </P>
      <WeekNumber locale={locale} number={id} />
    </Base>
    <Base position="bottom">
      <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.estimatedPayout} />
      </P>
      <P className="d-flex align-items-center">
        <SmallImage className="mr-2" src={currencyPeerImage} alt="icon" />
        <Span fontSize="16" bold>
          {getFormattedNum3(99999.95)}
        </Span>
      </P>
    </Base>
  </li>
);

const PaidOutWeek = ({ id, locale }) => (
  <BaseRoundedLi className="mb-3">
    <div>
      <P fontSize="13" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.paidOut} />
      </P>
      <WeekNumber locale={locale} number={id} />
    </div>

    <div>
      <P className="mb-1" fontSize="13" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.rewarded} />
      </P>
      <P fontSize="16" bold>
        <Icon
          color={TEXT_SUCCESS}
          className="mr-1"
          width="14"
          icon={rewardIcon}
          noMargin
        />

        <span>{getFormattedNum3(99999.95)}</span>
      </P>
    </div>
  </BaseRoundedLi>
);

const CurrentPendingWeeks = styled.div`
  display: ${x => (x.inRow ? 'flex' : 'block')};

  > :nth-child(1) {
    flex: 1;
    margin-right: ${x => (x.inRow ? '10px' : '0px')};
  }

  > :nth-child(2) {
    flex: 1;
    margin-left: ${x => (x.inRow ? '10px' : '0px')};
  }
`;

const Weeks = ({ locale }) => (
  <ul className="mt-3">
    <CurrentPendingWeeks inRow={data.length >= 2}>
      {data[0] && <CurrentWeek locale={locale} {...data[0]} />}
      {data[1] && <PendingWeek locale={locale} {...data[1]} />}
    </CurrentPendingWeeks>

    {data.slice(2).map(x => <PaidOutWeek locale={locale} {...x} />)}
  </ul>
);

export default React.memo(Weeks);
