import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators, compose } from 'redux';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller/WindowScroller';
import List from 'react-virtualized/dist/commonjs/List';

import _isEqual from 'lodash/isEqual';
import { DAEMON } from 'utils/constants';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { rangeUnionWithIntersection } from 'utils/rangeOperations';

import {
  BG_LIGHT,
  BORDER_SECONDARY_LIGHT,
  BORDER_RADIUS_L,
} from 'style-constants';

import NotFound from 'containers/ErrorPage';
import { ROW_HEIGHT as ROW_HEIGHT_FOR_SMALL } from 'containers/Header/NotificationsDropdown/constants';

import { ROW_HEIGHT, VERTICAL_OFFSET } from './constants';
import {
  allNotificationsCount,
  selectAllNotifications,
  selectAllNotificationsLoading,
  selectReadNotificationsAll,
  unreadNotificationsCount,
} from './selectors';

import saga from './saga';
import {
  loadMoreNotifications,
  markAsReadNotificationsAll,
  filterReadTimestamps,
  markAllNotificationsAsRead,
} from './actions';

import Header from './Header';
import Wrapper from '../Header/Complex';

import Notification from './Notification';
import MarkAllAsReadButton from './MarkAllAsReadButton';
import reducer from './reducer';
import WidthCentered, {
  LoaderContainer,
} from '../LoadingIndicator/WidthCentered';
import classnames from 'classnames';
import useSocketConnection from '../../hooks/useWebsocketConnection/useSocketConnection';

const Container = styled.div`
  ${Wrapper} {
    margin-bottom: 15px;
  }

  @media only screen and (max-width: 576px) {
    ${Wrapper} {
      margin-bottom: 0;
    }
  }
`;

const Content = styled.div`
  background: ${BG_LIGHT};
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${BORDER_RADIUS_L};
  width: 100%;
`;

const SubHeader = styled.div`
  min-height: ${({ height }) => height}px;
  display: flex;
  width: 100%;
  padding: 0 10px;
  border-bottom: 1px solid ${BORDER_SECONDARY_LIGHT};
`;

const SubHeaderSeparator = styled.hr`
  margin: 0;
  border: 0;

  @media only screen and (max-width: 576px) {
    height: 0.5px;
    background-color: ${BORDER_SECONDARY_LIGHT};
  }
`;

const Notifications = ({
  loading,
  unreadCount,
  allCount,
  className,
  isAvailable,
  notifications,
  readNotifications,
  loadMoreNotificationsDispatch,
  markAsReadNotificationsAllDispatch,
  filterReadNotificationsDispatch,
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [calculatedRanges, setCalculatedRanges] = useState({});
  const [containerWidth, setContainerWidth] = useState(0);
  const [y, setY] = useState(0);
  const ref = useRef(null);
  const containerRef = useRef(null);

  useEffect(
    () => {
      markAsReadNotificationsAllDispatch([
        0,
        (notifications.length > 0 && notifications.length - 1) || 0,
      ]);
    },
    [notifications.length],
  );

  const rowHeight = useMemo(
    () => (containerWidth <= 768 ? ROW_HEIGHT_FOR_SMALL : ROW_HEIGHT),
    [containerWidth],
  );

  const [indexToStart, indexToStop] = useMemo(
    () => {
      const calc = Array.from(new Array(notifications.length).keys()).filter(
        x =>
          x * rowHeight >= scrollPosition &&
          (x + 1) * rowHeight - scrollPosition <= window.innerHeight,
      );
      const { 0: start, [calc.length - 1]: stop } = calc;
      return [start || 0, stop || 0];
    },
    [notifications.length, rowHeight, scrollPosition, y, window.innerHeight],
  );

  const recalculateRanges = useCallback(
    () => {
      const range = `${indexToStart}-${indexToStop}-${rowHeight}`;

      const union = rangeUnionWithIntersection(readNotifications, [
        indexToStart,
        indexToStop,
      ]);

      /*
      * TODO: Fix bug with reading notifications, information in Notification center and Dropdown
      * may vary if notifications are received on the notifications page
      */
      /*if (!_isEqual(union, readNotifications) && !document.hidden) {
        markAsReadNotificationsAllDispatch(union);
      } else if (notifications.length === 1) {
        markAsReadNotificationsAllDispatch([0, 0]);
      }*/

      setCalculatedRanges({
        ...calculatedRanges,
        [range]: union,
      });
    },
    [notifications.length, indexToStart, indexToStop, rowHeight],
  );

  const onScroll = useCallback(
    ({ scrollTop }) => {
      setScrollPosition(scrollTop);
      recalculateRanges();

      /* TODO: Fix loading notifications */
      if (!loading && indexToStop + 1 < notifications.length) {
        loadMoreNotificationsDispatch();
      }
    },
    [notifications.length, indexToStop, loading],
  );

  const onResize = useCallback(
    () => {
      setContainerWidth(containerRef?.current?.getBoundingClientRect().width);
      setY(ref?.current?.getBoundingClientRect().top - rowHeight || 0);
    },
    [containerRef.current, rowHeight],
  );

  useEffect(
    () => {
      loadMoreNotificationsDispatch();
      return () => {
        if (isAvailable) {
          filterReadNotificationsDispatch();
        }
      };
    },
    [isAvailable],
  );

  useEffect(
    () => {
      setContainerWidth(
        containerRef.current?.getBoundingClientRect().width ?? 0,
      );
    },
    [containerRef.current],
  );

  useEffect(
    () => {
      recalculateRanges();
    },
    [notifications.length],
  );

  useEffect(
    () => {
      setY(ref?.current?.getBoundingClientRect().top - rowHeight || 0);
    },
    [ref.current, rowHeight],
  );

  const rowRenderer = ({ index, key, style: { top } }) => (
    <Notification
      key={key}
      top={top}
      index={index}
      height={rowHeight}
      notificationsNumber={notifications.length}
      paddingHorizontal="36"
      {...notifications[index]}
    />
  );

  rowRenderer.propTypes = {
    index: PropTypes.number,
    key: PropTypes.string,
    style: PropTypes.object,
  };

  return isAvailable ? (
    <Container className={`${className} overflow-hidden`}>
      <Wrapper position="bottom">
        <Header notificationsNumber={allCount} />
      </Wrapper>

      {!!allCount && (
        <Content
          innerRef={containerRef}
          height={notifications.length * rowHeight + ROW_HEIGHT}
        >
          {!!unreadCount ? (
            <SubHeader innerRef={ref} height={ROW_HEIGHT} top="0">
              <MarkAllAsReadButton />
            </SubHeader>
          ) : (
            <SubHeaderSeparator />
          )}
          <WindowScroller onResize={onResize} onScroll={onScroll}>
            {({ height, isScrolling, registerChild, scrollTop }) => (
              <div
                ref={registerChild}
                className={classnames('pb-2', {
                  'pt-2': !Boolean(unreadCount),
                })}
              >
                <List
                  autoHeight
                  height={height}
                  isScrolling={isScrolling}
                  rowCount={notifications.length}
                  rowHeight={rowHeight}
                  rowRenderer={rowRenderer}
                  scrollTop={scrollTop}
                  width={containerWidth}
                  style={{ outline: 'none' }}
                />
              </div>
            )}
          </WindowScroller>
        </Content>
      )}
      {loading && (
        <LoaderContainer>
          <WidthCentered inline />
        </LoaderContainer>
      )}
    </Container>
  ) : (
    <div className={className}>
      <NotFound withSeo={false} />
    </div>
  );
};

Notifications.propTypes = {
  loading: PropTypes.bool,
  unreadCount: PropTypes.number,
  allCount: PropTypes.number,
  className: PropTypes.string,
  isAvailable: PropTypes.bool,
  loadMoreNotificationsDispatch: PropTypes.func,
  markAsReadNotificationsAllDispatch: PropTypes.func,
  notifications: PropTypes.arrayOf(PropTypes.object),
  readNotifications: PropTypes.arrayOf(PropTypes.number),
  filterReadNotificationsDispatch: PropTypes.func,
};

export default React.memo(
  compose(
    injectReducer({ key: 'notifications', reducer }),
    injectSaga({ key: 'notifications', saga, mode: DAEMON }),
    connect(
      state => ({
        allCount: allNotificationsCount()(state),
        notifications: selectAllNotifications()(state),
        loading: selectAllNotificationsLoading()(state),
        readNotifications: selectReadNotificationsAll()(state),
        unreadCount: unreadNotificationsCount()(state),
      }),
      dispatch => ({
        loadMoreNotificationsDispatch: bindActionCreators(
          loadMoreNotifications,
          dispatch,
        ),
        markAsReadNotificationsAllDispatch: bindActionCreators(
          markAsReadNotificationsAll,
          dispatch,
        ),
        filterReadNotificationsDispatch: bindActionCreators(
          filterReadTimestamps,
          dispatch,
        ),
      }),
    ),
  )(Notifications),
);
