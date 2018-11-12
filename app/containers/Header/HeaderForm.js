/**
 *
 * HeaderForm
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import UserProfileNav from 'containers/UserProfileNav';
import * as routes from 'routes-config';

import messages from './messages';
import Wrapper from './Wrapper';
import Logo from './Logo';

import UserAuthNavLinks from './UserAuthNavLinks';

export const isProfileOrLogin = props => {
  if (props.account && props.userIsInSystem) {
    return <UserProfileNav />;
  }

  return (
    <UserAuthNavLinks
      showSignUpModal={props.showSignUpModalDispatch}
      showLoginModal={props.showLoginModalDispatch}
    />
  );
};

/* eslint-disable react/prefer-stateless-function */
const HeaderForm = props => (
  <Wrapper>
    <nav className="container navbar navbar-expand-lg navbar-light">
      <Link to={routes.home()} href={routes.home()}>
        <Logo />
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item">
            <Link
              to={routes.questions()}
              className="nav-link"
              href={routes.questions()}
            >
              <FormattedMessage {...messages.questions} />
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/about" className="nav-link" href="/about">
              <FormattedMessage {...messages.about} />
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/help" className="nav-link" href="/help">
              <FormattedMessage {...messages.help} />
            </Link>
          </li>
        </ul>

        <form className="form-inline my-2 my-lg-2">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
          />
          <button
            className="btn btn-outline-success mr-sm-2 my-2 my-sm-0"
            type="submit"
          >
            <FormattedMessage {...messages.search} />
          </button>
        </form>

        {isProfileOrLogin(props)}
      </div>
    </nav>
  </Wrapper>
);

isProfileOrLogin.propTypes = {
  account: PropTypes.string,
  userIsInSystem: PropTypes.bool,
  showSignUpModalDispatch: PropTypes.func,
  showLoginModalDispatch: PropTypes.func,
};

export default HeaderForm;
