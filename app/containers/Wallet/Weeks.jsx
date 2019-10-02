import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import {
  TEXT_WARNING_LIGHT,
  TEXT_SECONDARY,
  TEXT_SUCCESS,
} from 'style-constants';

import { getFormattedNum3 } from 'utils/numbers';
import { getFormattedDate } from 'utils/datetime';
import { FULL_MONTH_NAME_DAY_YEAR, DD_MM_YY } from 'utils/constants';

import calendarImage from 'images/calendar.svg?inline';
import currencyPeerImage from 'images/currencyPeer.svg?inline';
import rewardIcon from 'images/add.svg?external';

import P from 'components/P';
import Icon from 'components/Icon';
import IconStyled, { IconHover } from 'components/Icon/IconStyled';
import Span from 'components/Span';
import Base from 'components/Base';
import LoadingIndicator from 'components/LoadingIndicator/WidthCentered';
import BaseRounded from 'components/Base/BaseRounded';
import SmallImage from 'components/Img/SmallImage';

import messages from './messages';

import { RELEASE_DATE, WEEK_DURATION } from './constants';

const BaseRoundedLi = BaseRounded.extend`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > * {
    flex: 1;
  }

  ${IconStyled} {
    ${IconHover({ color: TEXT_SUCCESS })};
  }
`.withComponent('li');

const WeekNumber = ({ period, locale }) => (
  <P>
    <Span className="mr-3" fontSize="24" mobileFS={21} bold>
      <FormattedMessage {...messages.week} /> {` ${period}`}
    </Span>

    <Span className="d-none d-md-inline-block">
      {getFormattedDate(
        RELEASE_DATE + WEEK_DURATION * period - WEEK_DURATION,
        locale,
        FULL_MONTH_NAME_DAY_YEAR,
      )}
      {' — '}
      {getFormattedDate(
        RELEASE_DATE + WEEK_DURATION * period,
        locale,
        FULL_MONTH_NAME_DAY_YEAR,
      )}
    </Span>

    <Span className="d-inline-block d-md-none" mobileFS={14}>
      {getFormattedDate(
        RELEASE_DATE + WEEK_DURATION * period - WEEK_DURATION,
        locale,
        DD_MM_YY,
      )}
      {' — '}
      {getFormattedDate(
        RELEASE_DATE + WEEK_DURATION * period,
        locale,
        DD_MM_YY,
      )}
    </Span>
  </P>
);

const CurrentWeek = ({ period, locale }) => (
  <li className="flex-grow-1 mb-3">
    <Base position="top">
      <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
        <FormattedMessage {...messages.currentPeriod} />
      </P>
      <WeekNumber locale={locale} period={period} />
    </Base>
    <Base className="d-flex align-items-center" position="bottom">
      <img className="mr-3" src={calendarImage} alt="calendar" />
      <Span mobileFS={14}>
        <FormattedMessage {...messages.periodStillInProgress} />
      </Span>
    </Base>
  </li>
);

const PendingWeek = ({ period, reward, locale }) => (
  <li className="flex-grow-1 mb-3">
    <Base position="top">
      <P className="mb-1" color={TEXT_WARNING_LIGHT} fontSize="13">
        <FormattedMessage {...messages.payoutPending} />
      </P>
      <WeekNumber locale={locale} period={period} />
    </Base>
    <Base position="bottom">
      <P className="mb-1" fontSize="14" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.estimatedPayout} />
      </P>
      <P className="d-flex align-items-center">
        <SmallImage className="mr-2" src={currencyPeerImage} alt="icon" />
        <Span fontSize="16" mobileFS={14} bold>
          {getFormattedNum3(reward)}
        </Span>
      </P>
    </Base>
  </li>
);

const PaidOutWeek = ({ period, reward, locale }) => (
  <BaseRoundedLi className="align-items-start mb-3">
    <div>
      <P fontSize="13" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.paidOut} />
      </P>
      <WeekNumber locale={locale} period={period} />
    </div>

    <div className="d-flex flex-column align-items-end">
      <P className="mb-1" fontSize="13" color={TEXT_SECONDARY}>
        <FormattedMessage {...messages.rewarded} />
      </P>
      <P className="d-inline-flex" fontSize="16" mobileFS={14} bold>
        <Icon
          color={TEXT_SUCCESS}
          className="mr-1"
          width="14"
          icon={rewardIcon}
          noMargin
        />

        <span>{getFormattedNum3(reward)}</span>
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

  @media only screen and (max-width: 768px) {
    display: block;

    > * {
      margin-right: 0 !important;
      margin-left: 0 !important;
    }
  }
`;

/* eslint indent: 0 */
const Weeks = ({ locale, weekStat, getWeekStatProcessing }) => (
  <React.Fragment>
    {weekStat &&
      !getWeekStatProcessing && (
        <ul className="mt-3">
          <CurrentPendingWeeks inRow={weekStat.length >= 2}>
            {weekStat[0] && <CurrentWeek locale={locale} {...weekStat[0]} />}
            {weekStat[1] && <PendingWeek locale={locale} {...weekStat[1]} />}
          </CurrentPendingWeeks>

          {weekStat.slice(2).map(x => <PaidOutWeek locale={locale} {...x} />)}
        </ul>
      )}

    {getWeekStatProcessing && <LoadingIndicator />}
  </React.Fragment>
);

WeekNumber.propTypes = {
  period: PropTypes.string,
  locale: PropTypes.string,
};

CurrentWeek.propTypes = {
  period: PropTypes.string,
  locale: PropTypes.string,
};

PendingWeek.propTypes = {
  period: PropTypes.string,
  locale: PropTypes.string,
  reward: PropTypes.string,
};

PaidOutWeek.propTypes = {
  period: PropTypes.string,
  locale: PropTypes.string,
  reward: PropTypes.string,
};

Weeks.propTypes = {
  weekStat: PropTypes.array,
  locale: PropTypes.string,
  getWeekStatProcessing: PropTypes.bool,
};

export default React.memo(Weeks);
