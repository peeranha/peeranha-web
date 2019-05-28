import React from 'react';
import styled from 'styled-components';
import IconStyled from 'components/Icon/IconStyled';

import { TEXT_PRIMARY, BORDER_SECONDARY } from 'style-constants';

import notificationIcon from 'images/notification.svg?inline';

import Icon from 'components/Icon';
import Dropdown from 'components/Dropdown';
import Li from 'components/Li';
import Span from 'components/Span';
import A from 'components/A';

const ButtonStyled = styled.span`
  border-radius: 50%;
  border: 1px solid ${BORDER_SECONDARY};
  font-size: 18px;
  width: 43px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    border: 1px solid ${BORDER_SECONDARY};

    ${IconStyled} * {
      stroke: ${TEXT_PRIMARY};
    }
  }
`;

const MenuStyled = styled.div`
  header,
  footer,
  li {
    padding: 15px;
    border-bottom: 1px solid ${BORDER_SECONDARY};
  }
`;

const Button = /* istanbul ignore next */ () => (
  <ButtonStyled>
    <img src={notificationIcon} alt="icon" />
  </ButtonStyled>
);

const Menu = /* istanbul ignore next */ () => (
  <MenuStyled>
    <header>
      Notifications: <Span>0</Span>
    </header>
    <main>
      <ul>
        <Li>Notification 1</Li>
        <Li>Notification 12</Li>
      </ul>
    </main>
    <footer>
      <A to="/notifications" href="/notifications">
        <Icon icon={notificationIcon} />
        <Span>See all</Span>
      </A>
    </footer>
  </MenuStyled>
);

const Notification = /* istanbul ignore next */ () => (
  <Dropdown
    id={`notification_id_${Math.random()}`}
    button={<Button />}
    menu={<Menu />}
  />
);

export default React.memo(Notification);
