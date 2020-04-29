import React, {
  memo,
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators, compose } from 'redux';

import { List, AutoSizer } from 'react-virtualized';
import { FormattedMessage } from 'react-intl';

import messages from 'components/Notifications/messages';

import { TEXT_SECONDARY } from 'style-constants';

import Notification from 'components/Notifications/Notification';
import WidthCentered from 'components/LoadingIndicator/WidthCentered';

import _isEqual from 'lodash/isEqual';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { rangeUnionWithIntersection } from 'utils/rangeOperations';

import bellIcon from 'images/bellGray.jpg';

import saga from 'components/Notifications/saga';

import reducer from 'components/Notifications/reducer';

import {
  selectNotificationsLoading,
  selectReadNotifications,
} from 'components/Notifications/selectors';

import {
  loadMoreNotifications,
  setReadNotifications,
} from 'components/Notifications/actions';

import { THRESHOLD } from '../constants';

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ empty }) => (empty ? 10 : 0)}px 0;
  overflow: hidden;

  > span {
    color: ${TEXT_SECONDARY};
  }

  > div {
    position: absolute;
    left: 0;
    top: 0;
  }
`;

const Content = ({
  rowHeight,
  loading,
  notifications,
  readNotifications,
  loadMoreNotificationsDispatch,
  setReadNotificationsDispatch,
}) => {
  const listRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [calculatedRanges, setCalculatedRanges] = useState({});
  const [contentHeight, setContentHeight] = useState(0);
  const displayMainLoader = useMemo(() => loading && !notifications.length, [
    loading,
    notifications.length,
  ]);

  useEffect(() => {
    if (!notifications.length) {
      loadMoreNotificationsDispatch(true);
    }
  }, []);

  const onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    setScrollPosition(scrollTop);
    if (clientHeight + scrollTop > scrollHeight - rowHeight * 2 && !loading) {
      loadMoreNotificationsDispatch();
    }
  };

  const onResize = ({ height }) => {
    if (!contentHeight) {
      setContentHeight(height);
    }
  };

  // convert rendered rows to first and last index of rows caught into viewport
  const onRowsRendered = useCallback(
    ({ startIndex, stopIndex }) => {
      const newRange = new Array(stopIndex - startIndex + 1)
        .fill()
        .map((_, i) => (i + startIndex) * rowHeight)
        .filter(
          x =>
            x >= scrollPosition - THRESHOLD * rowHeight &&
            x + rowHeight <=
              scrollPosition + contentHeight + THRESHOLD * rowHeight,
        )
        .map(x => x / rowHeight)
        .reduce(
          (acc, cur, i, array) => [array[0], array[array.length - 1]],
          [],
        );

      if (!scrollPosition && !newRange.length) {
        newRange.push(0, 1);
      }

      if (!calculatedRanges[`${startIndex}-${stopIndex}`]) {
        setCalculatedRanges({
          ...calculatedRanges,
          [`${startIndex}-${stopIndex}`]: newRange,
        });

        const union = rangeUnionWithIntersection(readNotifications, newRange);
        if (!_isEqual(union, readNotifications)) {
          setReadNotificationsDispatch(union);
        }
      }
    },
    [scrollPosition],
  );

  const rowRenderer = ({ index, key, style: { top } }) => (
    <Notification
      key={key}
      top={top}
      height={rowHeight}
      notificationsNumber={notifications.length}
      {...notifications[index]}
    />
  );

  rowRenderer.propTypes = {
    index: PropTypes.number,
    key: PropTypes.string,
    style: PropTypes.object,
  };

  return (
    <Container empty={!notifications.length}>
      {!notifications.length ? (
        <>
          <img alt="1" src={bellIcon} />
          <FormattedMessage {...messages.youHaveNoNotifications} />
        </>
      ) : (
        <AutoSizer onResize={onResize}>
          {({ height, width }) =>
            console.log(height, width) || (
              <List
                ref={listRef}
                width={width || 100}
                height={height}
                rowHeight={rowHeight}
                onScroll={onScroll}
                overscanRowCount={5}
                rowRenderer={rowRenderer}
                rowCount={notifications.length}
                onRowsRendered={onRowsRendered}
              />
            )
          }
        </AutoSizer>
      )}
    </Container>
  );
};

Content.propTypes = {
  empty: PropTypes.bool,
  loading: PropTypes.bool,
  rowHeight: PropTypes.number.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object),
  readNotifications: PropTypes.arrayOf(PropTypes.number),
  setReadNotificationsDispatch: PropTypes.func,
  loadMoreNotificationsDispatch: PropTypes.func,
};

export default memo(
  compose(
    injectReducer({ key: 'notifications', reducer }),
    injectSaga({ key: 'notifications', saga, mode: DAEMON }),
    connect(
      state => ({
        loading: selectNotificationsLoading()(state),
        readNotifications: selectReadNotifications()(state),
      }),
      dispatch => ({
        setReadNotificationsDispatch: bindActionCreators(
          setReadNotifications,
          dispatch,
        ),
        loadMoreNotificationsDispatch: bindActionCreators(
          loadMoreNotifications,
          dispatch,
        ),
      }),
    ),
  )(Content),
);
