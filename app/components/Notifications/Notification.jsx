import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';

import { BORDER_PRIMARY } from 'style-constants';

import { trimRightZeros } from 'utils/numbers';
import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
} from 'utils/communityManagement';
import { renderNotificationIcon } from 'utils/notifications';

import {
  ROUTES_BY_TYPE,
  NOTIFICATIONS_DATA,
  NOTIFICATIONS_TYPES,
  POST_TYPE_TO_LABEL,
} from './constants';
import styles from './Notifications.styled';

const single = isSingleCommunityWebsite();
const communityStyles = singleCommunityStyles();
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
  communities,
  notificationsNumber,
}) => {
  const { t } = useTranslation();
  const route = ROUTES_BY_TYPE[data.post_type] || routes.tutorialView;
  const href = route(data.question_id, data.title, data.answer_id);
  const isTippedType = [
    NOTIFICATIONS_TYPES.answerTipped,
    NOTIFICATIONS_TYPES.questionTipped,
  ].includes(type);
  const isChangedType = [
    NOTIFICATIONS_TYPES.postTypeChanged,
    NOTIFICATIONS_TYPES.communityChanged,
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

  const isCommunityMode = Boolean(single) && Object.keys(communityStyles).length > 0;
  const isAnotherCommItem = Boolean(single) && data.community_id !== single;
  const isLast = index === notificationsNumber - 1;

  const previousPostType = data.old_post_type;
  const previousCommunity = communities?.find(({ id }) => data.old_community_id === id);
  const postType = data.post_type;
  const currentCommunity = communities?.find(({ id }) => data.community_id === id);

  const notificationTextProps = {
    quantity: values,
    previousPostType: t(POST_TYPE_TO_LABEL[previousPostType]),
    previousCommunity: previousCommunity?.label,
    postType: t(POST_TYPE_TO_LABEL[postType]),
    currentCommunity: currentCommunity?.label,
  };

  const notificationTitle = t(NOTIFICATIONS_DATA[type]?.keyTranslate);
  const additionalTitle =
    type === NOTIFICATIONS_TYPES.communityChanged
      ? 'notifications.communityChangedFromTo'
      : 'notifications.postTypeChangedFromTo';

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
      <div css={styles.titleWrapper}>
        <span>{notificationTitle}</span>
        {isChangedType && (
          <span css={styles.additionalInfo}>{t(additionalTitle, notificationTextProps)}</span>
        )}
      </div>
      <NotificationLink isAnotherCommItem={isAnotherCommItem} href={href}>
        {renderNotificationIcon(type, isCommunityMode, communityStyles)}
        <span css={{ color: colors.btnColor || BORDER_PRIMARY }}>{data.title}</span>
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
