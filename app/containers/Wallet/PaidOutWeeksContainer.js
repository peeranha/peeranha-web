import React, { memo, useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import CellMeasurer from 'react-virtualized/dist/commonjs/CellMeasurer';
import WindowScroller from 'react-virtualized/dist/commonjs/WindowScroller/WindowScroller';
import List from 'react-virtualized/dist/commonjs/List';
import CellMeasurerCache from 'react-virtualized/dist/commonjs/CellMeasurer/CellMeasurerCache';

import PaidOutWeek from './PaidOutWeek';

const cache = new CellMeasurerCache({
  fixedWidth: false,
});

const PaidOutWeeksContainer = ({
  weekStat,
  pickupRewardDispatch,
  pickupRewardProcessing,
  locale,
  ids,
  containerRef,
}) => {
  const [width, setWidth] = useState(0);

  const rowRenderer = ({ key, parent, index, style }) => (
    <CellMeasurer
      key={key}
      cache={cache}
      columnIndex={0}
      parent={parent}
      rowIndex={index}
    >
      <PaidOutWeek
        pickupRewardDispatch={pickupRewardDispatch}
        pickupRewardProcessing={pickupRewardProcessing}
        locale={locale}
        ids={ids}
        {...weekStat[index]}
        style={style}
        registrationWeek={index === weekStat.length - 1}
      />
    </CellMeasurer>
  );

  const onResize = useCallback(() => {
    setWidth(containerRef.current?.getBoundingClientRect().width ?? 0);
    cache.clearAll();
  }, [containerRef]);

  useEffect(() => {
    setWidth(containerRef.current?.getBoundingClientRect().width ?? 0);
    onResize();
  }, [containerRef.current, weekStat?.length, onResize]);

  return (
    <WindowScroller onResize={onResize}>
      {({ height, isScrolling, registerChild, scrollTop, onChildScroll }) => (
        <div ref={registerChild}>
          <List
            autoHeight
            onScroll={onChildScroll}
            height={height}
            isScrolling={isScrolling}
            rowCount={weekStat.length}
            rowHeight={cache.rowHeight}
            rowRenderer={rowRenderer}
            scrollTop={scrollTop}
            width={width}
            style={{ outline: 'none' }}
          />
        </div>
      )}
    </WindowScroller>
  );
};

PaidOutWeeksContainer.propTypes = {
  weekStat: PropTypes.array,
  ids: PropTypes.array,
  locale: PropTypes.string,
  pickupRewardDispatch: PropTypes.func,
  pickupRewardProcessing: PropTypes.bool,
  containerRef: PropTypes.object,
};

export default memo(PaidOutWeeksContainer);
