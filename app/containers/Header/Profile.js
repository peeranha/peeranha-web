import React from 'react';
import PropTypes from 'prop-types';
import * as routes from 'routes-config';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Dropdown from 'components/Dropdown';
import Li from 'components/Li';
import Ul from 'components/Ul';
import AddText from 'components/AddText';
import A from 'components/A';

const Img = styled.img`
  border-radius: 50%;
  border: 1px solid #bdbdbd;
  width: 43px;
  height: 43px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Info = styled.span`
  padding: 0 17px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const AStyled = A.extend`
  display: flex;
  flex: 1;
`;

const Button = ({ profileInfo }) => (
  <span className="d-flex">
    <Img src={profileInfo.ipfs_avatar} alt="ipfs_avatar" />
    <Info>
      <AddText bold>{profileInfo.display_name}</AddText>
      <AddText fontSize="14" color="gray">
        {profileInfo.rating}
      </AddText>
    </Info>
  </span>
);

// TODO: change hardcoded textTODO: change hardcoded text when Profile comp. will be finished

const Menu = ({ profileInfo }) => (
  <div>
    <Ul>
      <Li>
        <AStyled to={routes.profile_view(profileInfo.user)}>Profile</AStyled>
      </Li>
      <Li>
        <AStyled to={routes.profile_view(profileInfo.user)}>Favorites</AStyled>
      </Li>
      <Li>
        <AStyled to={routes.profile_view(profileInfo.user)}>Activity</AStyled>
      </Li>
      <Li>
        <AStyled to={routes.profile_view(profileInfo.user)}>Settings</AStyled>
      </Li>
      <Li>
        <AStyled to={routes.profile_view(profileInfo.user)}>
          Achievements
        </AStyled>
      </Li>
    </Ul>
    <Ul>
      <Li>
        <AddText color="blue">
          <FontAwesomeIcon className="chevron door-open" icon="door-open" />
          <span>Log out</span>
        </AddText>
      </Li>
    </Ul>
  </div>
);

const Profile = ({ profileInfo }) => (
  <Dropdown
    isArrowed
    id={`profile_id_${Math.random()}`}
    button={<Button profileInfo={profileInfo} />}
    menu={<Menu profileInfo={profileInfo} />}
  />
);

Profile.propTypes = {
  profileInfo: PropTypes.object,
};

Menu.propTypes = {
  profileInfo: PropTypes.object,
};

Button.propTypes = {
  profileInfo: PropTypes.object,
};

export default Profile;
