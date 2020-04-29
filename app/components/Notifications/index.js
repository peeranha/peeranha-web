import React, {
  useMemo,
  useEffect,
  useCallback,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators, compose } from 'redux';

import _cloneDeep from 'lodash/cloneDeep';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';

import { BG_LIGHT, BORDER_SECONDARY_LIGHT } from 'style-constants';

import { ROW_HEIGHT, VERTICAL_OFFSET } from './constants';
import {
  selectNotifications,
  selectNotificationsLoading,
  selectReadNotifications,
} from './selectors';

import saga from './saga';
import { loadMoreNotifications, setReadNotifications } from './actions';

import Header from './Header';
import Wrapper from '../Header/Complex';

import Notification from './Notification';
import MarkAllAsReadButton from './MarkAllAsReadButton';
import { rangeUnionWithIntersection } from '../../utils/rangeOperations';
import _isEqual from 'lodash/isEqual';
import injectReducer from '../../utils/injectReducer';
import reducer from './reducer';
import LoadingIndicator from '../LoadingIndicator';
import WidthCentered from '../LoadingIndicator/WidthCentered';

const Container = styled.div`
  @media only screen and (max-width: 576px) {
    background: ${BG_LIGHT};
  }
`;

const Content = Wrapper.extend`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 100%;
  height: ${({ height }) => height}px;
`;

const SubHeader = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  min-height: ${({ height }) => height}px;
  display: flex;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid ${BORDER_SECONDARY_LIGHT};
`;

const Notifications = ({
  loading,
  className,
  notifications,
  readNotifications,
  setReadNotificationsDispatch,
  loadMoreNotificationsDispatch,
}) => {
  const empty = useMemo(() => !notifications.length, [notifications.length]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [calculatedRanges, setCalculatedRanges] = useState({});
  const [y, setY] = useState(0);
  const ref = useRef(null);
  const r = useRef(null);

  const onScroll = useCallback(e => {
    setScrollPosition(e.currentTarget.scrollY);
  }, []);

  useEffect(() => {
    loadMoreNotificationsDispatch(true);
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(
    () => {
      setY(
        (ref &&
          ref.current &&
          ref.current.getBoundingClientRect().top - ROW_HEIGHT) ||
          0,
      );
    },
    [ref.current],
  );

  const displayNotifications = useMemo(() => {
    const a = Array.from(new Array(notifications.length).keys()).filter(
      x =>
        (x + 1) * ROW_HEIGHT + y + VERTICAL_OFFSET >= scrollPosition &&
        (x + 1) * ROW_HEIGHT - scrollPosition + VERTICAL_OFFSET <=
          window.innerHeight,
    );

    const { 0: startIndex, [a.length - 1]: stopIndex } = a;
    const range = `${startIndex}-${stopIndex}`;

    if (!loading && stopIndex + 10 >= notifications.length) {
      loadMoreNotificationsDispatch();
    }

    if (calculatedRanges[range]) {
      return calculatedRanges[range];
    }

    const newRange = _cloneDeep(notifications)
      .map((n, i) => ({ ...n, top: (i + 1) * ROW_HEIGHT }))
      .filter((_, index) => index >= startIndex && index <= stopIndex);

    const union = rangeUnionWithIntersection(readNotifications, [
      startIndex,
      stopIndex,
    ]);

    if (!_isEqual(union, readNotifications)) {
      setReadNotificationsDispatch(union);
    }

    setCalculatedRanges({
      ...calculatedRanges,
      [range]: newRange,
    });

    return newRange;
  });

  return (
    <Container className={`${className} overflow-hidden`}>
      <Wrapper className="mb-3" position="bottom">
        <Header notificationsNumber={notifications.length} />
      </Wrapper>

      <Content innerRef={r} height={(notifications.length + 1) * ROW_HEIGHT}>
        <SubHeader innerRef={ref} height={ROW_HEIGHT} top="0">
          <MarkAllAsReadButton />
        </SubHeader>
        {displayNotifications.map(({ top, ...props }, index) => (
          <Notification
            {...props}
            index={index}
            height={ROW_HEIGHT}
            top={top}
            paddingHorizontal="36"
            key={`${(index + 1) * ROW_HEIGHT}`}
            notificationsNumber={notifications.length}
          />
        ))}
      </Content>
      {loading && <WidthCentered />}
    </Container>
  );
};

Notifications.propTypes = {
  loading: PropTypes.bool,
  className: PropTypes.string,
  setReadNotificationsDispatch: PropTypes.func,
  loadMoreNotificationsDispatch: PropTypes.func,
  notifications: PropTypes.arrayOf(PropTypes.object),
  readNotifications: PropTypes.arrayOf(PropTypes.number),
};

export default React.memo(
  compose(
    injectReducer({ key: 'notifications', reducer }),
    injectSaga({ key: 'notifications', saga, mode: DAEMON }),
    connect(
      state => ({
        notifications: selectNotifications()(state),
        loading: selectNotificationsLoading()(state),
        readNotifications: selectReadNotifications()(state),
      }),
      dispatch => ({
        loadMoreNotificationsDispatch: bindActionCreators(
          loadMoreNotifications,
          dispatch,
        ),
        setReadNotificationsDispatch: bindActionCreators(
          setReadNotifications,
          dispatch,
        ),
      }),
    ),
  )(Notifications),
);
