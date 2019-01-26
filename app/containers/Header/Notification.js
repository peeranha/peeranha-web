import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Dropdown from 'components/Dropdown';
import Li from 'components/Li';
import H4 from 'components/H4';
import AddText from 'components/AddText';

const ButtonStyled = styled.span`
  border-radius: 50%;
  border: 1px solid #bdbdbd;
  font-size: 18px;
  width: 43px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;

  * {
    color: #bdbdbd;
  }
`;

const MenuStyled = styled.div`
  header,
  footer,
  li {
    padding: 15px;
    border-bottom: 1px solid #c2c6d8;
  }
`;

const Button = () => (
  <ButtonStyled>
    <FontAwesomeIcon className="chevron bell" icon="bell" />
  </ButtonStyled>
);

// TODO: change hardcoded text when Notification comp. will be finished

const Menu = () => (
  <MenuStyled>
    <header>
      <H4>
        Notifications: <AddText>0</AddText>
      </H4>
    </header>
    <main>
      <ul>
        <Li>Notification 1</Li>
        <Li>Notification 12</Li>
      </ul>
    </main>
    <footer>
      <AddText color="blue">
        <FontAwesomeIcon className="chevron bell" icon="bell" />
        <span>See all</span>
      </AddText>
    </footer>
  </MenuStyled>
);

const Notification = () => (
  <Dropdown
    id={`notification_id_${Math.random()}`}
    button={<Button />}
    menu={<Menu />}
  />
);

export default Notification;
