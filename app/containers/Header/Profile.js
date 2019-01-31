import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import { gray } from 'style-constants';
import logoutIcon from 'svg/logout';
import messages from 'common-messages';

import Dropdown from 'components/Dropdown';
import Li from 'components/Li';
import Ul from 'components/Ul';
import Span from 'components/Span';
import A from 'components/A';
import Icon from 'components/Icon';
import RatingStatus from 'components/RatingStatus';

const Img = styled.img`
  border-radius: 50%;
  border: 1px solid ${gray};
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
      <Span bold>{profileInfo.display_name}</Span>
      <RatingStatus rating={profileInfo.rating} size="sm" />
    </Info>
  </span>
);

const Menu = ({ profileInfo }) => (
  <div>
    <Ul>
      <Li>
        <AStyled to={routes.profile_view(profileInfo.user)}>
          <FormattedMessage {...messages.profile} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.user_questions(profileInfo.user)}>
          <FormattedMessage {...messages.questions} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.user_answers(profileInfo.user)}>
          <FormattedMessage {...messages.answers} />
        </AStyled>
      </Li>
      <Li>
        <AStyled to={routes.user_settings(profileInfo.user)}>
          <FormattedMessage {...messages.settings} />
        </AStyled>
      </Li>
    </Ul>
    <Ul>
      <Li>
        <Icon icon={logoutIcon} />
        <Span color="blue">
          <FormattedMessage {...messages.logout} />
        </Span>
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
