/**
 *
 * Header
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import UserAuthNavLinks from 'containers/UserAuthNavLinks';

import messages from './messages';
import Wrapper from './Wrapper';
import Logo from './Logo';

/* eslint-disable react/prefer-stateless-function */
const Header = () => (
  <Wrapper>
    <nav className="container navbar navbar-expand-lg navbar-light">
      <Link to="/" href="/">
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
            <Link to="/" className="nav-link" href="/">
              <FormattedMessage {...messages.home} />
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

        <UserAuthNavLinks />
      </div>
    </nav>
  </Wrapper>
);

export default Header;
