import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import * as routes from 'routes-config';

import { trimRightZeros } from 'utils/numbers';
import { isSingleCommunityWebsite, singleCommunityStyles } from 'utils/communityManagement';
import { renderNotificationIcon } from 'utils/notifications';

import {
  NOTIFICATIONS_DATA,
  NOTIFICATIONS_TYPES,
  POST_TYPE_TO_LABEL,
  ROUTES_BY_TYPE,
} from 'components/Notifications/constants';

import { ROW_HEIGHT_DROPDOWN_SMALL } from '../constants';

import styles from './Notification.styled';

const single = isSingleCommunityWebsite();
const communityStyles = singleCommunityStyles();

const Time = ({ time: { rightNow, minutes, hours, yesterday, fullDate } }) => {
  const { t } = useTranslation();
  return (
    <span css={styles.timestamp}>
      {Boolean(rightNow) && t('common.rightNow')}
      {Boolean(minutes) && t('common.minutesAgo', { minutes })}
      {Boolean(hours) && t('common.hoursAgo', { hours })}
      {Boolean(yesterday) && t('common.yesterday')}
      {Boolean(fullDate) && fullDate}
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
  const isTippedType = [
    NOTIFICATIONS_TYPES.answerTipped,
    NOTIFICATIONS_TYPES.questionTipped,
  ].includes(type);
  const isChangedType = [
    NOTIFICATIONS_TYPES.postTypeChanged,
    NOTIFICATIONS_TYPES.communityChanged,
  ].includes(type);
  const route = ROUTES_BY_TYPE[data.post_type] || routes.tutorialView;

  let href;
  if (data.network) {
    href = route(`${data.network}-${data.question_id}`, data.title, data.answer_id);
  } else {
    href = route(`1-${data.question_id}`, data.title, data.answer_id);
  }

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

  const previousCommunity = communities?.find(({ id }) =>
    data.network ? `${data.network}-${data.old_community_id}` : `1-${data.old_community_id}` === id,
  );
  const postType = data.post_type;
  const currentCommunity = communities?.find(({ id }) =>
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
        ...styles.root,
        ...(!read ? styles.unreadStyles : {}),
        ...(isLast && { border: 'none' }),
        height: `${isChangedType ? height : ROW_HEIGHT_DROPDOWN_SMALL}px`,
        top: `${top}px`,
      }}
    >
      {renderNotificationIcon(type, isCommunityMode, communityStyles)}
      <div css={styles.textBlock}>
        <div css={styles.titleWrapper}>
          <span>
            {isChangedType
              ? notificationTitle.concat(' ', t(additionalTitle, notificationTextProps))
              : notificationTitle}
          </span>
        </div>
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
