import { getFormattedDate } from '../../utils/datetime';
import {
  MONTH_3LETTERS__DAY_TIME,
  MONTH_3LETTERS__DAY_YYYY_TIME,
} from '../../utils/constants';

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

export const titleConverter = title => {
  if (title.length < 46) {
    return title;
  }
  let k = 45;
  switch (title.length) {
    case 46:
      k = 42;
      break;
    case 47:
      k = 43;
      break;
    case 48:
      k = 44;
      break;

    default:
      break;
  }
  const newTitle = title
    .split('')
    .splice(0, k)
    .join('')
    .trimRight();

  return `${newTitle}....`;
};

export const titleConverterMapper = ({ data, ...rest }) => ({
  ...rest,
  data: {
    ...data,
    title: titleConverter(data.title),
  },
});
