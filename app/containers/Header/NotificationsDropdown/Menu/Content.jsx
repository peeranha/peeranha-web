import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators, compose } from 'redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer/AutoSizer';
import List from 'react-virtualized/dist/commonjs/List';
import { useTranslation } from 'react-i18next';

import { TEXT_SECONDARY } from 'style-constants';
import bellIcon from 'images/Notifications_Disabled.svg?external';

import _isEqual from 'lodash/isEqual';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { rangeUnionWithIntersection } from 'utils/rangeOperations';
import { graphCommunityColors } from 'utils/communityManagement';

import { selectCommunities } from 'containers/DataCacheProvider/selectors';
import { IconXl } from 'components/Icon/IconWithSizes';
import saga from 'components/Notifications/saga';
import reducer from 'components/Notifications/reducer';
import {
  selectReadNotificationsUnread,
  selectUnreadNotificationsLoading,
} from 'components/Notifications/selectors';
import {
  loadMoreUnreadNotifications,
  markAsReadNotificationsUnread,
} from 'components/Notifications/actions';
import { NOTIFICATIONS_TYPES } from 'components/Notifications/constants';
import { BellGraph } from 'components/icons';

import Notification from './Notification';

import {
  HEADER_AND_FOOTER_HEIGHT,
  MENU_HEIGHT,
  THRESHOLD,
  ROW_HEIGHT_DROPDOWN_SMALL,
} from '../constants';

const graphCommunity = graphCommunityColors();

const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  communities,
  readNotifications,
  markAsReadNotificationsUnreadDispatch,
  loadMoreUnreadNotificationsDispatch,
}) => {
  const { t } = useTranslation();
  const listRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [calculatedRanges, setCalculatedRanges] = useState({});
  const [contentHeight, setContentHeight] = useState(MENU_HEIGHT - HEADER_AND_FOOTER_HEIGHT);

  const onScroll = ({ clientHeight, scrollHeight, scrollTop }) => {
    setScrollPosition(scrollTop);
    if (clientHeight + scrollTop > scrollHeight - rowHeight * 2 && !loading) {
      loadMoreUnreadNotificationsDispatch();
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
          (x) =>
            x >= scrollPosition - THRESHOLD * rowHeight &&
            x + rowHeight <= scrollPosition + contentHeight + THRESHOLD * rowHeight,
        )
        .map((x) => x / rowHeight)
        .reduce((acc, cur, i, array) => [array[0], array[array.length - 1]], []);

      if (!scrollPosition && !newRange.length) {
        newRange.push(0, 1);
      }

      if (!calculatedRanges[`${startIndex}-${stopIndex}`]) {
        setCalculatedRanges({
          ...calculatedRanges,
          [`${startIndex}-${stopIndex}`]: newRange,
        });

        const union = rangeUnionWithIntersection(readNotifications, newRange);

        if (!_isEqual(union, readNotifications) || _isEqual(union, [0, 0])) {
          markAsReadNotificationsUnreadDispatch(union);
        }
      }
    },
    [scrollPosition],
  );

  useEffect(() => {
    loadMoreUnreadNotificationsDispatch();
  }, []);

  const rowRenderer = ({ index, key, style: { top } }) => (
    <Notification
      small
      key={key}
      top={top}
      height={rowHeight}
      communities={communities}
      notificationsNumber={notifications.length}
      paddingHorizontal="15"
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
          {graphCommunity ? (
            <BellGraph size={[128, 128]} />
          ) : (
            <IconXl icon={bellIcon} color={TEXT_SECONDARY} />
          )}
          <span>{t('notifications.youHaveNoNewNotifications')}</span>
        </>
      ) : (
        <AutoSizer onResize={onResize}>
          {({ height, width }) => {
            const rowHeightSize = ({ index }) => {
              const { type } = notifications[index];
              const isChangedType = [
                NOTIFICATIONS_TYPES.postTypeChanged,
                NOTIFICATIONS_TYPES.communityChanged,
              ].includes(type);

              return isChangedType ? rowHeight : ROW_HEIGHT_DROPDOWN_SMALL;
            };
            return (
              <List
                ref={listRef}
                width={width || 100}
                height={height}
                rowHeight={rowHeightSize}
                onScroll={onScroll}
                overscanRowCount={5}
                rowRenderer={rowRenderer}
                rowCount={notifications.length}
                onRowsRendered={onRowsRendered}
                style={{ outline: 'none' }}
              />
            );
          }}
        </AutoSizer>
      )}
    </Container>
  );
};

Content.propTypes = {
  loading: PropTypes.bool,
  rowHeight: PropTypes.number.isRequired,
  notifications: PropTypes.arrayOf(PropTypes.object),
  readNotifications: PropTypes.arrayOf(PropTypes.number),
  markAsReadNotificationsUnreadDispatch: PropTypes.func,
  loadMoreUnreadNotificationsDispatch: PropTypes.func,
};

export default memo(
  compose(
    injectReducer({ key: 'notifications', reducer }),
    injectSaga({ key: 'notifications', saga, mode: DAEMON }),
    connect(
      (state) => ({
        loading: selectUnreadNotificationsLoading()(state),
        readNotifications: selectReadNotificationsUnread()(state),
        communities: selectCommunities()(state),
      }),
      (dispatch) => ({
        markAsReadNotificationsUnreadDispatch: bindActionCreators(
          markAsReadNotificationsUnread,
          dispatch,
        ),
        loadMoreUnreadNotificationsDispatch: bindActionCreators(
          loadMoreUnreadNotifications,
          dispatch,
        ),
      }),
    ),
  )(Content),
);
