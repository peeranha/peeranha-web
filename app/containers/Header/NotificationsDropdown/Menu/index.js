import React, { memo, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

import {
  HEADER_AND_FOOTER_HEIGHT,
  MENU_HEIGHT,
  MENU_WIDTH,
  ROW_HEIGHT,
} from '../constants';

const MenuContainer = styled.div`
  width: ${MENU_WIDTH}px;
  height: ${MENU_HEIGHT}px;
  background: #fff;
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 60px;
  left: 0;
  border-radius: 5px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  cursor: default;
`;

const useDetectOutsideClick = (onClose, parentRef) => {
  const ref = useRef(null);
  const handleClickOutside = e => {
    if (
      ref.current &&
      !ref.current.contains(e.target) &&
      parentRef.current &&
      !parentRef.current.contains(e.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return ref;
};

const Menu = ({ notifications, onClose, parentRef }) => {
  const ref = useDetectOutsideClick(onClose, parentRef);
  const empty = useMemo(() => !notifications.length, [notifications.length]);

  return (
    <button
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <MenuContainer innerRef={ref}>
        <Header notificationsNumber={notifications.length} onClose={onClose} />
        <Content
          notifications={notifications}
          empty={empty}
          height={MENU_HEIGHT - HEADER_AND_FOOTER_HEIGHT}
          width={MENU_WIDTH}
          rowHeight={ROW_HEIGHT}
        />
        <Footer empty={empty} onClose={onClose} />
      </MenuContainer>
    </button>
  );
};

Menu.propTypes = {
  onClose: PropTypes.func,
  parentRef: PropTypes.object,
  notifications: PropTypes.arrayOf(PropTypes.object),
};

export default memo(Menu);
