import React, { useCallback, useMemo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';

import { singleCommunityStyles } from 'utils/communityManagement';

import { BG_LIGHT, BG_WARNING_LIGHT, BORDER_PRIMARY } from 'style-constants';

import Span from 'components/Span';
import { IconEm } from 'components/Icon/IconWithSizes';

import notificationsActiveIcon from 'images/Notifications_Gray.svg?external';
import notificationsDisabledIcon from 'images/Notifications_Disabled.svg?external';
import Menu from './Menu';

import {
  selectUnreadNotifications,
  unreadNotificationsCount,
} from '../../../components/Notifications/selectors';
import { filterReadTimestamps } from '../../../components/Notifications/actions';

const styles = singleCommunityStyles();

const Container = styled.div`
  position: relative;
  border-radius: 50%;
  width: 47px;
  height: 47px;
  min-width: 47px;
  min-height: 47px;
  background: ${styles.fullyTransparent || BG_LIGHT};
  border: ${styles.communityBorderStyle || `1px solid ${BORDER_PRIMARY}`};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media only screen and (max-width: 992px) {
    width: 40px;
    height: 40px;
    min-width: 40px;
    min-height: 40px;
  }
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
  border-radius: 8.5px;
  min-width: 24px;

  @media only screen and (max-width: 992px) {
    min-width: 20px;
  }
`;

const NotificationsDropdown = ({
  unreadCount,
  notifications,
  filterReadTimestampsDispatch,
}) => {
  const ref = useRef(null);
  const [visible, setVisibility] = useState(false);
  const onClick = useCallback(() => {
    if (visible) {
      filterReadTimestampsDispatch();
    }

    setVisibility(!visible);
  }, [visible]);
  const number = useMemo(
    () => (unreadCount < 100 ? unreadCount : '...'),
    [unreadCount],
  );

  return (
    <Container
      className="d-flex flex-column"
      active={!!unreadCount}
      onClick={onClick}
      innerRef={ref}
    >
      {!!unreadCount && (
        <Div>
          <Span fontSize="13" color="white">
            {number}
          </Span>
        </Div>
      )}
      <IconEm
        icon={unreadCount ? notificationsActiveIcon : notificationsDisabledIcon}
        css={styles.dropDownIconStyles}
      />
      {visible && (
        <Menu
          onClose={onClick}
          parentRef={ref}
          unreadCount={unreadCount}
          notifications={notifications}
        />
      )}
    </Container>
  );
};

NotificationsDropdown.propTypes = {
  unreadCount: PropTypes.number,
  notifications: PropTypes.arrayOf(PropTypes.object),
  filterReadTimestampsDispatch: PropTypes.func,
};

export default React.memo(
  connect(
    (state) => ({
      unreadCount: unreadNotificationsCount()(state),
      notifications: selectUnreadNotifications()(state),
    }),
    (dispatch) => ({
      filterReadTimestampsDispatch: bindActionCreators(
        filterReadTimestamps,
        dispatch,
      ),
    }),
  )(NotificationsDropdown),
);
