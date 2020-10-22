import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';

import { showPopover } from 'utils/popover';

const Popover = ({ id, children, styles, hiddenContent }) => {
  const onMouseEnter = useCallback(e => showPopover(e.currentTarget.id, hiddenContent), []);

  return (
    <div
      style={styles}
      onMouseEnter={onMouseEnter}
      id={id}
    >
      {children}
    </div>
  );
};

Popover.propTypes = {
  id: PropTypes.string,
  children: PropTypes.any,
  styles: PropTypes.object,
  hiddenContent: PropTypes.string
};

export default memo(Popover);
