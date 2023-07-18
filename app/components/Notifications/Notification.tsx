import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';
import { trimRightZeros } from 'utils/numbers';
import { isSingleCommunityWebsite, singleCommunityStyles } from 'utils/communityManagement';
import { renderNotificationIcon } from 'utils/notifications';

import {
  ROUTES_BY_TYPE,
  NOTIFICATIONS_DATA,
  NOTIFICATIONS_TYPES,
  POST_TYPE_TO_LABEL,
} from './constants';
import styles from './Notifications.styled';
import { NotificationLinkProps, NotificationProps, NotificationTimeProps } from './types';
import { BigNumber } from 'ethers';

const isSingleCommunityMode = isSingleCommunityWebsite();
const communityStyles = singleCommunityStyles();

const Time: React.FC<NotificationTimeProps> = ({
  time: { rightNow, minutes, hours, yesterday, fullDate },
}): JSX.Element => {
  const { t } = useTranslation();

  const dateParts = fullDate?.split(' ');
  const lastDatePart = dateParts?.pop();

  return (
    <span css={styles.time}>
      {Boolean(rightNow) && t('common.rightNow')}
      {Boolean(minutes) && t('common.minutesAgo', { minutes })}
      {Boolean(hours) && t('common.hoursAgo', { hours })}
      {Boolean(yesterday) && t('common.yesterday')}
      {Boolean(fullDate) && (
        <p css={styles.fullDate}>
          {dateParts.join(' ')} <span css={styles.lastDatePart}>{lastDatePart}</span>
        </p>
      )}
    </span>
  );
};

const NotificationLink: React.FC<NotificationLinkProps> = ({
  isAnotherCommItem,
  href,
  children,
}): JSX.Element =>
  isAnotherCommItem ? (
    <a css={styles.link} href={`${process.env.APP_LOCATION}${href}`}>
      {children}
    </a>
  ) : (
    <Link css={styles.link} to={href}>
      {children}
    </Link>
  );

const Notification: React.FC<NotificationProps> = ({
  top,
  data,
  time,
  type,
  read,
  index,
  height,
  communities,
  notificationsNumber,
}): JSX.Element => {
  const { t } = useTranslation();
  const route = ROUTES_BY_TYPE[data.post_type] || routes.tutorialView;
  let href;

  if (data.network) {
    href = route(
      `${data.network}-${BigNumber.from(data.question_id).toNumber()}`,
      data.title,
      data.answer_id,
    );
  } else {
    href = route(`1-${data.question_id}`, data.title, data.answer_id);
  }
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
        .map((x: string, i: number) => (i === 0 ? trimRightZeros(x) : x))
        .join(' '),
    };
  }, [data.quantity, isTippedType]);

  const isCommunityMode = Boolean(isSingleCommunityMode) && Object.keys(communityStyles).length > 0;
  const isAnotherCommItem =
    Boolean(isSingleCommunityMode) && data.community_id !== isSingleCommunityMode;
  const isLast = index === notificationsNumber - 1;

  const previousPostType = data.old_post_type;

  const previousCommunity = communities?.find(({ id }: { id: string }) =>
    data.network ? `${data.network}-${data.old_community_id}` : `1-${data.old_community_id}` === id,
  );
  const postType = data.post_type;
  const currentCommunity = communities?.find(({ id }: { id: string }) =>
    data.network ? `${data.network}-${data.community_id}` : `1-${data.community_id}` === id,
  );
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
        ...styles.container,
        ...(!read && styles.unread),
        ...(isLast && styles.lastNotification),
        height: `${height}px`,
        top: `${top}px`,
      }}
    >
      <div css={styles.titleWrapper}>
        <div css={styles.textAndIconWrapper}>
          {renderNotificationIcon(type, isCommunityMode, communityStyles)}
          <span css={styles.notificationTypeTitle}>{notificationTitle}</span>
        </div>
        {isChangedType && (
          <span css={styles.additionalInfo}>{t(additionalTitle, notificationTextProps)}</span>
        )}
      </div>
      <NotificationLink isAnotherCommItem={isAnotherCommItem} href={href}>
        <span css={styles.notificationTitle}>{data.title}</span>
      </NotificationLink>
      <Time time={time} />
    </div>
  );
};

export default Notification;
