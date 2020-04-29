import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import {
  BG_SECONDARY_SPECIAL_4,
  BORDER_SECONDARY_LIGHT,
} from 'style-constants';

import { NOTIFICATIONS_TYPES, ROW_HEIGHT } from './constants';

import Span from '../Span';
import { getFormattedDate } from '../../utils/datetime';
import {
  MONTH_3LETTERS__DAY_TIME,
  MONTH_3LETTERS__DAY_YYYY_TIME,
} from '../../utils/constants';

const Container = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: 1.75fr 1.5fr .5fr;
  grid-template-rows: ${({ height }) => height}px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  left: 0;
  top: ${({ top }) => top}px;
  min-height: ${({ height }) => height}px;
  padding: 0 ${({ paddingHorizontal }) => paddingHorizontal || 0}px;
  ${({ read }) => !read && `background: ${BG_SECONDARY_SPECIAL_4};`}
  border-bottom: ${({ last, withoutBorder }) =>
    last || withoutBorder ? 'none' : `1px solid ${BORDER_SECONDARY_LIGHT}`};
  border-bottom-left-radius: ${({ lastBR }) => (lastBR ? 5 : 0)}px;
  border-bottom-right-radius: ${({ lastBR }) => (lastBR ? 5 : 0)}px;
`;

const Time = ({ time :{ rightNow, minutes, hours, yesterday, fullDate }}) => (
  <Span fontSize="14" className="float-right" whiteSpace="nowrap">
    {rightNow && 'right now'}
    {minutes && `${minutes} minutes ago`}
    {hours && `${hours} hours ago`}
    {yesterday && `yesterday`}
    {fullDate && fullDate}
  </Span>
);

const Notification = ({
  top,
  data,
  date,
  time,
  type,
  read,
  index,
  height,
  paddingHorizontal,
  notificationsNumber,
}) => (
  <Container
    top={top}
    read={read}
    withoutBorder
    height={height}
    last={index === notificationsNumber}
    lastBR={index === notificationsNumber}
    paddingHorizontal={paddingHorizontal || 0}
  >
    <Span fontSize="16">
      <FormattedMessage id={NOTIFICATIONS_TYPES[type].id} />
    </Span>
    <div className="d-flex align-items-center justify-content-between">
      <Link to="/">
        <div className="d-flex align-items-center">
          <img
            className="mr-2"
            src={NOTIFICATIONS_TYPES[type].src}
            alt="icon"
            width="20"
          />
          <Span fontSize="16">{data.text}</Span>
        </div>
      </Link>
    </div>
    <div style={{ justifySelf: 'end' }} className="d-flex align-items-center">
      <Time time={time} />
    </div>
  </Container>
);

Notification.propTypes = {
  read: PropTypes.bool,
  top: PropTypes.number,
  data: PropTypes.object,
  time: PropTypes.object,
  type: PropTypes.number,
  date: PropTypes.number,
  index: PropTypes.number,
  height: PropTypes.number,
  paddingHorizontal: PropTypes.string,
  notificationsNumber: PropTypes.number,
};

export default Notification;
