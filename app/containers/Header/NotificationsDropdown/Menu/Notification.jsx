import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IconMd } from 'components/Icon/IconWithSizes';

import * as routes from 'routes-config';

import { BORDER_WARNING_LIGHT } from 'style-constants';

import { trimRightZeros } from 'utils/numbers';
import { isSingleCommunityWebsite, singleCommunityStyles } from 'utils/communityManagement';

import { NOTIFICATIONS_DATA, NOTIFICATIONS_TYPES, ROUTES_BY_TYPE } from 'components/Notifications/constants';

import styles from './Notification.styled';

const single = isSingleCommunityWebsite();
const singleStyles = singleCommunityStyles();

const Time = ({ time: { rightNow, minutes, hours, yesterday, fullDate } }) => {
  const { t } = useTranslation();
  return (
    <span css={styles.timestamp}>
      {!!rightNow && t('common.rightNow')}
      {!!minutes && t('common.minutesAgo', { minutes })}
      {!!hours && t('common.hoursAgo', { hours })}
      {!!yesterday && t('common.yesterday')}
      {!!fullDate && fullDate}
    </span>
  );
};

const NotificationLink = ({ isAnotherCommItem, href, text }) =>
  /* eslint-disable */
  isAnotherCommItem ? (
    <a css={styles.link} href={`${process.env.APP_LOCATION}${href}`}>
      {text}
    </a>
  ) : (
    <Link css={styles.link} to={href}>
      {text}
    </Link>
  );

/* eslint-enable */

const Notification = ({ top, data, time, type, read, index, height, notificationsNumber }) => {
  const { t } = useTranslation();
  const isTippedType = [NOTIFICATIONS_TYPES.answerTipped, NOTIFICATIONS_TYPES.questionTipped].includes(type);
  const route = ROUTES_BY_TYPE[data.post_type] || routes.tutorialView;
  const href = route(data.question_id, data.title, data.answer_id);

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

  const isCommunityMod = Boolean(single) && Object.keys(singleStyles).length > 0;
  const isAnotherCommItem = Boolean(single) && data.community_id !== single;
  const isLast = index === notificationsNumber - 1;
  const notificationTitle = t(NOTIFICATIONS_DATA[type]?.keyTranslate, { quantity: values });

  return (
    <div
      css={{
        ...styles.root,
        ...(!read ? styles.unreadStyles : {}),
        ...(isLast && { border: 'none' }),
        height: `${height}px`,
        top: `${top}px`,
      }}
    >
      <IconMd
        icon={NOTIFICATIONS_DATA[type]?.src}
        color={!isCommunityMod && isTippedType ? BORDER_WARNING_LIGHT : null}
        specialStyles={isCommunityMod && isTippedType && singleStyles.coinsIconStyles}
      />
      <div css={styles.textBlock}>
        <span css={styles.title}>{notificationTitle}</span>
        <Time time={time} />
        <NotificationLink isAnotherCommItem={isAnotherCommItem} href={href} text={data.title} />
      </div>
    </div>
  );
};

Notification.propTypes = {
  read: PropTypes.bool,
  top: PropTypes.number,
  data: PropTypes.object,
  time: PropTypes.object,
  type: PropTypes.number,
  small: PropTypes.bool,
  index: PropTypes.number,
  height: PropTypes.number,
  paddingHorizontal: PropTypes.string,
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
