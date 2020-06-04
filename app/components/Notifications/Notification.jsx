import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import messages from 'common-messages';

import * as routes from 'routes-config';

import {
  BG_SECONDARY_SPECIAL_4,
  BORDER_SECONDARY_LIGHT,
  TEXT_SECONDARY,
} from 'style-constants';

import { trimRightZeros } from 'utils/numbers';

import { NOTIFICATIONS_TYPES } from './constants';

import Span from '../Span';
import Icon from 'components/Icon';

const Container = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 1.35fr 1.45fr 0.55fr;
  grid-template-rows: ${({ height }) => height}px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  left: 0;
  top: ${({ top }) => top}px;
  min-height: ${({ height }) => height}px;
  padding: 0 ${({ paddingHorizontal }) => paddingHorizontal || 0}px;
  ${({ read }) => !read && `background: ${BG_SECONDARY_SPECIAL_4};`};
  border-bottom: ${({ last, withoutBorder }) =>
    last || withoutBorder ? 'none' : `1px solid ${BORDER_SECONDARY_LIGHT}`};
  border-bottom-left-radius: ${({ lastBR }) => (lastBR ? 5 : 0)}px;
  border-bottom-right-radius: ${({ lastBR }) => (lastBR ? 5 : 0)}px;

  > div:nth-child(2) a > span:first-child {
    width: 20px;
    margin-right: 8px;
    flex-shrink: 0;

    svg {
    }
  }

  > div:nth-child(3) {
    justify-self: end;
  }

  ${({ small }) =>
    small ? '' : '  @media only screen and (max-width: 768px) {'};
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 10px ${({ paddingHorizontal }) => paddingHorizontal || 0}px;

  > div:nth-child(2) {
    grid-row-start: 3;
    grid-row-end: 3;
    > a {
      font-size: 13px;

      > img {
        width: 13px;
        margin-right: 4px;
      }
    }
  }

  > div:nth-child(3) {
    justify-self: start;
    > span {
      font-size: 12px;
    }
  }
  ${({ small }) => (small ? '' : '}')};
`;

const Time = ({ time: { rightNow, minutes, hours, yesterday, fullDate } }) => (
  <Span color={TEXT_SECONDARY} className="float-right" whiteSpace="nowrap">
    {!!rightNow && <FormattedMessage {...messages.rightNow} />}
    {!!minutes && (
      <FormattedMessage {...messages.minutesAgo} values={{ minutes }} />
    )}
    {!!hours && <FormattedMessage {...messages.hoursAgo} values={{ hours }} />}
    {!!yesterday && <FormattedMessage {...messages.yesterday} />}
    {!!fullDate && <Span>{fullDate}</Span>}
  </Span>
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

  const href = useMemo(
    () =>
      data.answer_id
        ? routes.questionView(data.question_id, data.answer_id)
        : routes.questionView(data.question_id),
    [data],
  );

  const values = useMemo(
    () => {
      if (type < 9) {
        return {};
      }

      return {
        quantity: data.quantity
          .split(' ')
          .map((x, i) => (i === 0 ? trimRightZeros(x) : x))
          .join(' '),
      };
    },
    [data],
  );

  return (
    <Container
      top={top}
      read={read}
      width={width}
      small={small}
      innerRef={ref}
      withoutBorder
      height={height}
      style={{ top }}
      last={index === notificationsNumber - 1}
      lastBR={index === notificationsNumber - 1}
      paddingHorizontal={paddingHorizontal || 0}
    >
      <Span fontSize="16">
        <FormattedMessage id={NOTIFICATIONS_TYPES[type].id} values={values} />
      </Span>
      <div className="d-flex align-items-center justify-content-between">
        <Link to={href} href={href} className="d-flex align-items-center">
          <Icon icon={NOTIFICATIONS_TYPES[type].src} width="18" />
          <span>{data.title}</span>
        </Link>
      </div>
      <div className="d-flex aligsn-items-center">
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

export default Notification;
