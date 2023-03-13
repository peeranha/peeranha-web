import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconMd } from 'components/Icon/IconWithSizes';

import * as routes from 'routes-config';

import { BORDER_WARNING_LIGHT, BORDER_PRIMARY } from 'style-constants';

import { trimRightZeros } from 'utils/numbers';
import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
} from 'utils/communityManagement';

import {
  ROUTES_BY_TYPE,
  NOTIFICATIONS_DATA,
  NOTIFICATIONS_TYPES,
} from './constants';
import styles from './Notifications.styled';

const single = isSingleCommunityWebsite();
const singleStyles = singleCommunityStyles();
const colors = singleCommunityColors();

const Time = ({ time: { rightNow, minutes, hours, yesterday, fullDate } }) => {
  const { t } = useTranslation();
  return (
    <span css={styles.timeStyles}>
      {Boolean(rightNow) && t('common.rightNow')}
      {Boolean(minutes) && t('common.minutesAgo', { minutes })}
      {Boolean(hours) && t('common.hoursAgo', { hours })}
      {Boolean(yesterday) && t('common.yesterday')}
      {Boolean(fullDate) && fullDate}
    </span>
  );
};

const NotificationLink = ({ isAnotherCommItem, href, children }) =>
  /* eslint-disable */
  isAnotherCommItem ? (
    <a css={styles.linkStyles} href={`${process.env.APP_LOCATION}${href}`}>
      {children}
    </a>
  ) : (
    <Link css={styles.linkStyles} to={href}>
      {children}
    </Link>
  );

/* eslint-enable */

const Notification = ({
  top,
  data,
  time,
  type,
  read,
  index,
  height,
  notificationsNumber,
}) => {
  const { t } = useTranslation();
  const route = ROUTES_BY_TYPE[data.post_type] || routes.tutorialView;
  const href = route(data.question_id, data.title, data.answer_id);
  const isTippedType = [
    NOTIFICATIONS_TYPES.answerTipped,
    NOTIFICATIONS_TYPES.questionTipped,
  ].includes(type);

  const values = useMemo(() => {
    if (!isTippedType) {
      return {};
    }
    return {
      quantity: data.quantity
        .split(' ')
        .map((x, i) => (i === 0 ? trimRightZeros(x) : x))
        .join(' '),
    };
  }, [data.quantity, isTippedType]);

  const isCommunityMod =
    Boolean(single) && Object.keys(singleStyles).length > 0;
  const isAnotherCommItem = Boolean(single) && data.community_id !== single;
  const isLast = index === notificationsNumber - 1;
  const notificationTitle = t(NOTIFICATIONS_DATA[type]?.keyTranslate, {
    quantity: values,
  });

  return (
    <div
      css={{
        ...styles.containerStyles,
        ...(!read ? styles.unreadStyles : {}),
        ...(isLast && { border: 'none' }),
        height: `${height}px`,
        top: `${top}px`,
      }}
    >
      <span>{notificationTitle}</span>
      <NotificationLink isAnotherCommItem={isAnotherCommItem} href={href}>
        <IconMd
          icon={NOTIFICATIONS_DATA[type]?.src}
          color={!isCommunityMod && isTippedType ? BORDER_WARNING_LIGHT : null}
          specialStyles={
            isCommunityMod && isTippedType && singleStyles.coinsIconStyles
          }
        />
        <span css={{ color: colors.btnColor || BORDER_PRIMARY }}>
          {data.title}
        </span>
      </NotificationLink>
      <Time time={time} />
    </div>
  );
};

Notification.propTypes = {
  read: PropTypes.bool,
  top: PropTypes.number,
  data: PropTypes.object,
  time: PropTypes.object,
  type: PropTypes.number,
  index: PropTypes.number,
  height: PropTypes.number,
  notificationsNumber: PropTypes.number,
};

Time.propTypes = {
  time: PropTypes.object,
};

NotificationLink.propTypes = {
  children: PropTypes.element,
  isAnotherCommItem: PropTypes.bool,
  href: PropTypes.string,
};

export default Notification;
