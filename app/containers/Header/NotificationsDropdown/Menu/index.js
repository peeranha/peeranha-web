import React, { memo, useEffect, useMemo, useRef } from 'react';
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

  @media only screen and (max-width: 992px) {
    left: -20px;
  }

  @media only screen and (max-width: 767px) {
    left: -280px;
  }
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

const Menu = ({ notifications, onClose, parentRef, unreadCount }) => {
  const ref = useDetectOutsideClick(onClose, parentRef);
  const empty = useMemo(() => !notifications.length, [notifications.length]);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <div
      onClick={e => {
        e.stopPropagation();
      }}
    >
      <MenuContainer innerRef={ref}>
        <Header notificationsNumber={unreadCount} onClose={onClose}/>
        <Content
          notifications={notifications}
          empty={empty}
          height={MENU_HEIGHT - HEADER_AND_FOOTER_HEIGHT}
          width={MENU_WIDTH}
          rowHeight={ROW_HEIGHT}
        />
        <Footer empty={empty} onClose={onClose}/>
      </MenuContainer>
    </div>
  );
};

Menu.propTypes = {
  onClose: PropTypes.func,
  parentRef: PropTypes.object,
  unreadCount: PropTypes.number,
  notifications: PropTypes.arrayOf(PropTypes.object),
};

export default memo(Menu);
