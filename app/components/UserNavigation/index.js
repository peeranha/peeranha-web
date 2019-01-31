import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import * as routes from 'routes-config';
import messages from 'common-messages';

import Ul from 'components/Ul';
import A from 'components/A';
import Button from 'components/Button';
import Base from 'components/Base';

import MyProfileButton from './MyProfileButton';

const BaseStyled = Base.extend`
  margin-bottom: 0;
`.withComponent('header');

const Nav = Ul.extend`
  padding: 0;
  border-bottom: 0;
`.withComponent('nav');

const UserNavigation = ({ userId, account }) => (
  <BaseStyled position="top" className="d-flex justify-content-between">
    <Nav>
      <A to={routes.profile_view(userId)} href={routes.profile_view(userId)}>
        <Button
          isLink={window.location.pathname !== routes.profile_view(userId)}
        >
          <FormattedMessage {...messages.profile} />
        </Button>
      </A>

      <A
        to={routes.user_questions(userId)}
        href={routes.user_questions(userId)}
      >
        <Button
          isLink={window.location.pathname !== routes.user_questions(userId)}
        >
          <FormattedMessage {...messages.questions} />
        </Button>
      </A>

      <A to={routes.user_answers(userId)} href={routes.user_answers(userId)}>
        <Button
          isLink={window.location.pathname !== routes.user_answers(userId)}
        >
          <FormattedMessage {...messages.answers} />
        </Button>
      </A>

      <MyProfileButton
        userId={userId}
        account={account}
        href={routes.user_settings(userId)}
        isLink
      >
        <FormattedMessage {...messages.settings} />
      </MyProfileButton>
    </Nav>

    <Nav>
      <MyProfileButton
        userId={userId}
        account={account}
        href={routes.profile_edit(userId)}
        isLink
      >
        <FormattedMessage {...messages.edit} />
      </MyProfileButton>
    </Nav>
  </BaseStyled>
);

UserNavigation.propTypes = {
  userId: PropTypes.string,
  account: PropTypes.string,
};

export default React.memo(UserNavigation);
