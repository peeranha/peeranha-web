/**
 *
 * HeaderForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import createdHistory from 'createdHistory';

import Input from 'components/Input';
import Button from 'components/Button';

import * as routes from 'routes-config';

import img from 'images/LogoBlack.svg';

import messages from './messages';
import Wrapper from './Wrapper';
import Section from './Section';
import Logo from './Logo';

import UserAuthNavLinks from './UserAuthNavLinks';
import UserProfileNav from './UserProfileNav';

export const LoginProfile = ({
  profileInfo,
  translations,
  showSignUpModalDispatch,
  showLoginModalDispatch,
}) => {
  if (profileInfo) {
    return (
      <UserProfileNav profileInfo={profileInfo} translations={translations} />
    );
  }

  return (
    <UserAuthNavLinks
      showSignUpModal={showSignUpModalDispatch}
      showLoginModal={showLoginModalDispatch}
    />
  );
};

const homeRoute = routes.home();
const addQuestionRoute = () => {
  createdHistory.push(routes.question_ask());
};

const HeaderForm = props => (
  <Wrapper>
    <div className="container">
      <div className="d-flex align-items-center">
        <Logo>
          <Link to={homeRoute} href={homeRoute}>
            <img src={img} alt="logo" />
          </Link>
        </Logo>

        <Section>
          <Input
            type="text"
            placeholder={props.translations[messages.search.id]}
            isSearchable
          />
          <Button disabled={!props.profileInfo} onClick={addQuestionRoute}>
            <FontAwesomeIcon className="chevron plus" icon="plus" />
            <FormattedMessage {...messages.addQuestion} />
          </Button>
          <LoginProfile {...props} />
        </Section>
      </div>
    </div>
  </Wrapper>
);

HeaderForm.propTypes = {
  translations: PropTypes.object,
  profileInfo: PropTypes.bool,
};

LoginProfile.propTypes = {
  translations: PropTypes.object,
  profileInfo: PropTypes.bool,
  showSignUpModalDispatch: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
};

export default HeaderForm;
