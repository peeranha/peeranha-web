import { ethers } from 'ethers';
import { getFormattedDate } from './datetime';
import {
  MONTH_3LETTERS__DAY_TIME,
  MONTH_3LETTERS__DAY_YYYY_TIME,
} from './constants';

// how much time has passed since the timestamp:
// - right now
// - minutes or hours ago
// - yesterday
// - if more but this year - full date without year
// - if more than that - full date
export const timeConverter = (timestamp, locale) => {
  const now = new Date();
  const t = new Date(timestamp * 1000);
  const dMins = (now - t) / 6e4;
  const dHours = Math.round(dMins / 60);

  const time = {};
  if (dMins < 1) {
    time.rightNow = true;
  } else if (dMins < 60) {
    time.minutes = Math.round(dMins);
  } else if (dHours < now.getHours()) {
    time.hours = dHours;
  } else if (dHours > now.getHours() && dHours < 48) {
    time.yesterday = true;
  } else if (t.getFullYear() === now.getFullYear()) {
    time.fullDate = getFormattedDate(
      timestamp,
      locale,
      MONTH_3LETTERS__DAY_TIME,
    );
  } else {
    time.fullDate = getFormattedDate(
      timestamp,
      locale,
      MONTH_3LETTERS__DAY_YYYY_TIME,
    );
  }

  return time;
};

export const bigNumberToNumber = bigNumber => {
  if (bigNumber === undefined) {
    return 0;
  }

  if (typeof bigNumber === 'string') {
    return ethers.BigNumber.from(bigNumber).toNumber();
  }

  return bigNumber.toNumber();
};
