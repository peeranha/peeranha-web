import React, { useState, useCallback, useMemo, useRef } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  BG_LIGHT,
  BORDER_PRIMARY,
  BG_WARNING_LIGHT,
  BORDER_SECONDARY_LIGHT,
} from 'style-constants';

import Span from 'components/Span';

import notificationsActiveIcon from 'images/Notifications_Gray.svg?inline';
import notificationsDisabledIcon from 'images/Notifications_Disabled.svg?inline';
import Menu from './Menu';
import { selectNotifications } from '../../../components/Notifications/selectors';

const Button = styled.div`
  position: relative;
  border-radius: 50%;
  width: 47px;
  height: 47px;
  min-width: 47px;
  min-height: 47px;
  background: ${BG_LIGHT};
  border: 1px solid
    ${({ active }) => (!active ? BORDER_SECONDARY_LIGHT : BORDER_PRIMARY)};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 17px;
  background: ${BG_WARNING_LIGHT};
  position: absolute;
  top: -6px;
  right: -6px;
  border-top-right-radius: 8.5px 50%;
  border-bottom-right-radius: 8.5px 50%;
  border-top-left-radius: 8.5px 50%;
  border-bottom-left-radius: 8.5px 50%;
  min-width: 24px;
`;

const NotificationsDropdown = ({ notifications }) => {
  const ref = useRef(null);
  const [visible, setVisibility] = useState(false);
  const onClick = useCallback(() => setVisibility(!visible), [visible]);
  const number = useMemo(
    () => (notifications.length < 100 ? notifications.length : '...'),
    [notifications.length],
  );

  return (
    <Button
      className="d-flex flex-column"
      active={!!notifications.length}
      onClick={onClick}
      innerRef={ref}
    >
      {!!notifications.length && (
        <Div>
          <Span fontSize="13" color="white">
            {number}
          </Span>
        </Div>
      )}
      <img
        src={
          notifications.length
            ? notificationsActiveIcon
            : notificationsDisabledIcon
        }
        width="19"
        alt="notifications_icon"
      />
      {visible && (
        <Menu onClose={onClick} parentRef={ref} notifications={notifications} />
      )}
    </Button>
  );
};

NotificationsDropdown.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.object),
};

export default React.memo(
  connect(state => ({
    notifications: selectNotifications()(state),
  }))(NotificationsDropdown),
);
