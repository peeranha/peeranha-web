import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import * as routes from 'routes-config';

import {
  BG_SECONDARY_SPECIAL_4,
  BORDER_SECONDARY_LIGHT,
  TEXT_SECONDARY,
  BORDER_WARNING_LIGHT,
  PEER_PRIMARY_COLOR,
  BORDER_PRIMARY,
  BORDER_PRIMARY_LIGHT,
} from 'style-constants';

import { trimRightZeros } from 'utils/numbers';
import {
  isSingleCommunityWebsite,
  singleCommunityStyles,
  singleCommunityColors,
} from 'utils/communityManagement';

import {
  NOTIFICATIONS_DATA,
  NOTIFICATIONS_TYPES,
  ROW_HEIGHT,
} from './constants';

import Span from '../Span';
import { IconMd } from 'components/Icon/IconWithSizes';

const single = isSingleCommunityWebsite();
const styles = singleCommunityStyles();
const colors = singleCommunityColors();

const Container = styled.div`
  border-left: 3px solid transparent;
  ${({ read, small }) =>
    !read &&
    !small &&
    css`
      border-left: 3px solid ${BORDER_PRIMARY_LIGHT};
    `};

  position: absolute;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  left: 0;
  top: ${({ top }) => top}px;
  min-height: ${({ height }) => height}px;
  padding: 0 ${({ paddingHorizontal }) => paddingHorizontal || 0}px;
  ${({ read, small }) =>
    !read && !small && `background: ${BG_SECONDARY_SPECIAL_4};`};
  border-bottom: ${({ last, withoutBorder }) =>
    last || withoutBorder ? 'none' : `1px solid ${BORDER_SECONDARY_LIGHT}`};
  border-bottom-left-radius: ${({ lastBR }) => (lastBR ? 5 : 0)}px;
  border-bottom-right-radius: ${({ lastBR }) => (lastBR ? 5 : 0)}px;

  ${({ small }) =>
    !small
      ? `
    @media only screen and (min-width: 834px) and (max-width: 991px), only screen and (min-width: 1051px) {
      display: grid;
      grid-template-columns: 1.35fr 1.45fr 0.55fr;
      grid-template-rows: ${({ height }) => height}px;
    }
  `
      : `
    display: grid;
  `} > span {
    display: inline-block;
  }

  > div,
  > span {
    margin-bottom: 4px;
  }

  > div:nth-child(2) a > span:first-child {
    height: 20px;
    margin-right: 8px;
    flex-shrink: 0;

    svg {
    }
  }

  > div:nth-child(3) {
    justify-self: end;
  }

  ${({ height }) =>
    height !== ROW_HEIGHT
      ? ''
      : '  @media only screen and (max-width: 768px) {'};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 10px ${({ paddingHorizontal }) => paddingHorizontal / 2 || 0}px;
  padding-bottom: 5px;

  > span:nth-child(1) {
    ${({ small }) =>
      small
        ? `
    margin-bottom: 0;
    `
        : null};
  }

  > div:nth-child(2) {
    ${({ small }) =>
      !small
        ? `
      grid-row-start: 3;
      grid-row-end: 3;
    `
        : `
      grid-row: 3 / 3;
      margin-bottom: 0;
    `} > a {
      font-size: 13px;

      > img {
        height: 13px;
        margin-right: 4px;
      }
    }
  }

  > div:nth-child(3) {
    ${({ small }) =>
      small
        ? `
      margin-bottom: 0;
    `
        : null} justify-self: start;

    > span {
      font-size: 12px;
    }
  }
  ${({ height }) => (height !== ROW_HEIGHT ? '' : '}')};
`;

const Time = ({ time: { rightNow, minutes, hours, yesterday, fullDate } }) => (
  <Span color={TEXT_SECONDARY} className="float-right" whiteSpace="nowrap">
    {!!rightNow && <FormattedMessage {...messages.rightNow} />}
    {!!minutes && (
      <FormattedMessage {...messages.minutesAgo} values={{ minutes }} />
    )}
    {!!hours && <FormattedMessage {...messages.hoursAgo} values={{ hours }} />}
    {!!yesterday && <FormattedMessage {...messages.yesterday} />}
    {!!fullDate && fullDate}
  </Span>
);

const NotificationLink = ({ isAnotherCommItem, href, children }) =>
  isAnotherCommItem ? (
    <a
      href={`${process.env.APP_LOCATION}${href}`}
      className="d-flex align-items-center"
    >
      {children}
    </a>
  ) : (
    <Link to={href} className="d-flex align-items-center">
      {children}
    </Link>
  );

const Notification = ({
  top,
  data,
  time,
  type,
  read,
  small,
  index,
  height,
  paddingHorizontal,
  notificationsNumber,
}) => {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(
    () => (ref && ref.current ? setWidth(ref.current.offsetWidth) : null),
    [ref, ref.current],
  );

  const href = useMemo(() => {
    if (data.post_type === 0) {
      return routes.expertPostView(
        data.question_id,
        data.title,
        data.answer_id,
      );
    }
    if (data.post_type === 1) {
      return routes.questionView(data.question_id, data.title, data.answer_id);
    }
    return routes.tutorialView(data.question_id, data.title, data.answer_id);
  }, [data]);

  const values = useMemo(() => {
    if (
      ![
        NOTIFICATIONS_TYPES.answerTipped,
        NOTIFICATIONS_TYPES.questionTipped,
      ].includes(type)
    ) {
      return {};
    }

    return {
      quantity: data.quantity
        .split(' ')
        .map((x, i) => (i === 0 ? trimRightZeros(x) : x))
        .join(' '),
    };
  }, [data]);

  const isCommunityMod = Boolean(single) && Object.keys(styles).length > 0;

  const isAnotherCommItem = Boolean(single) && data.community_id !== single;

  const tipNotification =
    type === NOTIFICATIONS_TYPES.questionTipped ||
    type === NOTIFICATIONS_TYPES.answerTipped;

  return (
    <Container
      top={top}
      read={read}
      width={width}
      small={small}
      innerRef={ref}
      height={height}
      style={{ top }}
      last={index === notificationsNumber - 1}
      lastBR={index === notificationsNumber - 1}
      paddingHorizontal={paddingHorizontal || 0}
    >
      <Span fontSize="16">
        <FormattedMessage id={NOTIFICATIONS_DATA[type].id} values={values} />
      </Span>
      <div className="d-flex align-items-center justify-content-between">
        <NotificationLink isAnotherCommItem={isAnotherCommItem} href={href}>
          <IconMd
            icon={NOTIFICATIONS_DATA[type].src}
            color={
              !isCommunityMod && tipNotification ? BORDER_WARNING_LIGHT : null
            }
            specialStyles={
              isCommunityMod && tipNotification && styles.coinsIconStyles
            }
          />
          <Span color={colors.btnColor || BORDER_PRIMARY}>{data.title}</Span>
        </NotificationLink>
      </div>
      <div className="d-flex align-items-center">
        <Time time={time} />
      </div>
    </Container>
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
