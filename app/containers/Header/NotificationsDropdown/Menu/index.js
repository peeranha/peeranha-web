import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { BORDER_RADIUS_L } from 'style-constants';

import { HEADER_AND_FOOTER_HEIGHT, MENU_HEIGHT, MENU_WIDTH, ROW_HEIGHT_DROPDOWN } from '../constants';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const MenuContainer = styled.div`
  width: ${MENU_WIDTH}px;
  height: ${MENU_HEIGHT}px;
  background: var(--color-white);
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 62px;
  left: -290px;
  border-radius: ${BORDER_RADIUS_L};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  cursor: default;

  @media only screen and (max-width: 993px) {
    top: 49px;
  }

  @media only screen and (max-width: 767px) {
    left: -280px;
  }
`;

const useDetectOutsideClick = (onClose, parentRef) => {
  const ref = useRef(null);
  const handleClickOutside = (e) => {
    if (!ref.current?.contains(e.target) && !parentRef.current?.contains(e.target)) {
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

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <MenuContainer innerRef={ref}>
        <Header notificationsNumber={unreadCount} onClose={onClose} />
        <Content
          notifications={notifications}
          height={MENU_HEIGHT - HEADER_AND_FOOTER_HEIGHT}
          width={MENU_WIDTH}
          rowHeight={ROW_HEIGHT_DROPDOWN}
        />
        <Footer isEmpty={!unreadCount} onClose={onClose} />
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
